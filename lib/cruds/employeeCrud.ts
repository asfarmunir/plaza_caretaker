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
import { IEmployee } from '../types';

const collectionRef = collection(db, 'employees');


export const fetchEmployeeDetails = async (empId: string) => {
  const userDoc = doc(collectionRef, empId);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    return userSnapshot.data() as IEmployee;
  } else {
    console.error("No such user!");
    return null;
  }
};

export const createNewEmployee = async (data: any) => {
  const newEmployee = {
    ...data,
    createdAt: serverTimestamp(),
  };
  const newEmployeeRef = doc(collectionRef, newEmployee.uid);

  await setDoc(newEmployeeRef, newEmployee);
  return newEmployee;
}

export const fetchAllEmployees = async () => {
  const querySnapshot = await getDocs(collectionRef);
  const employees = querySnapshot.docs.map((doc) => doc.data());
  return employees as IEmployee[];
}

export const getAllCareworkers = async () => {
  const q = query(collectionRef, where("employeeType", "==", "careworker"));
  const querySnapshot = await getDocs(q);
  const employees = querySnapshot.docs.map((doc) => doc.data());
  return employees as IEmployee[];
}
// export const assignCustomer = async (customerId: string, careworkerId: string) => {
//   const employeeDoc = doc(collectionRef, careworkerId);
//   const employeeSnapshot = await getDoc(employeeDoc);

//   if (employeeSnapshot.exists()) {
//     const employeeData = employeeSnapshot.data();
    
//     const assignedCustomers = employeeData.assignedCustomers || [];

//     assignedCustomers.push(customerId);

//     await updateDoc(employeeDoc, {
//       assignedCustomers: assignedCustomers,
//     });

//     return true;
//   } else {
//     console.error("No such employee!");
//     return false;
//   }
// };



