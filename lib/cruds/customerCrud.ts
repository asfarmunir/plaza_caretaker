"use client"

import {
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import db from '@/lib/firebaseConfig';
import { v4} from 'uuid';
import { ICustomer } from '../types';
// import { IEmployee } from '../types';

const collectionRef = collection(db, 'customers');
const employeeCollectionRef = collection(db, 'employees');


// export const fetchUserDetails = async (userId: string) => {
//   const userDoc = doc(collectionRef, userId);
//   const userSnapshot = await getDoc(userDoc);

//   if (userSnapshot.exists()) {
//     return userSnapshot.data() 
//   } else {
//     console.error("No such user!");
//     return null;
//   }
// };
export const createNewCustomers = async (data: any) => {
  const newCustomer = {
    ...data,
    createdAt: serverTimestamp(),
  };
  const newCustomerRef = doc(collectionRef, newCustomer.uid);

  await setDoc(newCustomerRef, newCustomer);
  return newCustomer;
}

export const fetchAllCustomers = async () => {
  const querySnapshot = await getDocs(collectionRef);
  const customer = querySnapshot.docs.map((doc) => doc.data());
  return customer as ICustomer[];
}

export const assignCareworker = async (customerId: string, careworkerId: string) => {
  // Get the careworker document reference
  const careworkerDoc = doc(employeeCollectionRef, careworkerId);
  const careworkerSnapshot = await getDoc(careworkerDoc);

  // Get the customer document reference
  const customerDoc = doc(collectionRef, customerId);
  const customerSnapshot = await getDoc(customerDoc);

  // Check if both careworker and customer exist
  if (careworkerSnapshot.exists() && customerSnapshot.exists()) {
    const careworkerData = careworkerSnapshot.data();
    
    // Get the assignedCustomers array or initialize it if it doesn't exist
    const assignedCustomers = careworkerData.assignedCustomers || [];

    // Add the customerId to the assignedCustomers array
    assignedCustomers.push(customerId);

    // Perform both updates in parallel
    await Promise.all([
      updateDoc(careworkerDoc, {
        assignedCustomers: assignedCustomers,
      }),
      updateDoc(customerDoc, {
        careworkerId: careworkerId,
      }),
    ]);

    return true;
  } else {
    if (!careworkerSnapshot.exists()) {
      console.error("No such careworker!");
    }
    if (!customerSnapshot.exists()) {
      console.error("No such customer!");
    }
    return false;
  }
};

export const getCustomersWithPendingPayments = async () => {
  const q = query(collectionRef, where("paymentCleared", "==", false));
  const querySnapshot = await getDocs(q);
  const customers = querySnapshot.docs.map((doc) => doc.data());
  return customers as ICustomer[];
}
export const getCustomersWithCompletedPayments = async () => {
  const q = query(collectionRef, where("paymentCleared", "==", true));
  const querySnapshot = await getDocs(q);
  const customers = querySnapshot.docs.map((doc) => doc.data());
  return customers as ICustomer[];
}

export const updatePaymentStatus = async (customerId: string, status: boolean) => {
  try {
     const customerDoc = doc(collectionRef, customerId);
     if(!customerDoc) throw new Error("No such customer!");
  await updateDoc(customerDoc, {
    paymentCleared: status,
  });
  return true;
    
  } catch (error) {
    
    console.error("Error updating payment status:", error);
    return false;

  }
 
}


export const getCustomersAssignedToCareworker = async (careworkerId: string) => {
  const q = query(collectionRef, where("careworkerId", "==", careworkerId));
  const querySnapshot = await getDocs(q);
  const customers = querySnapshot.docs.map((doc) => doc.data());
  return customers as ICustomer[];
}