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
  arrayUnion,
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

export const addWorkHoursForCareworker = async (
  careworkerId: string,
  data: {
    workHours: number;
    customerId: string;
    date: string;
  }
) => {
  try {
    const careworkerDoc = doc(collectionRef, careworkerId);

    const workHoursEntry = {
      minutes: data.workHours,
      date: data.date,
      customerId: data.customerId,
    };

    await updateDoc(careworkerDoc, {
      workTime: arrayUnion(workHoursEntry),
    });

    return true;
  } catch (error) {
    console.error("Error updating document: ", error);
    return false;
  }
};


export const payCareworker = async (careworkerId: string, data: { month: string; salary: number; }) => {
  try {
    const careworkerDocRef = doc(collectionRef, careworkerId);
    const careworkerDoc = await getDoc(careworkerDocRef);

    if (careworkerDoc.exists()) {
      const careworkerData = careworkerDoc.data();
      
      if (careworkerData.salariesPaid?.some((entry: { month: string; }) => entry.month === data.month)) {
        throw new Error(`Salary for ${data.month} has already been paid.`);
      }

      const salary = {
        month: data.month,
        salary: data.salary,
      };

      await updateDoc(careworkerDocRef, {
        salariesPaid: arrayUnion(salary),
      });

      return true;
    } else {
      throw new Error("Careworker not found.");
    }
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error; // Re-throw the error to be caught in the submitHandler
  }
};


export const getAllPaidCareworkers = async () => {
  const q = query(collectionRef, where("salariesPaid", "!=", []));
  const querySnapshot = await getDocs(q);
  const employees = querySnapshot.docs.map((doc) => doc.data());
  return employees as IEmployee[];
}