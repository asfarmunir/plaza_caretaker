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
    date: string;
  }
) => {
  try {
    const careworkerDoc = doc(collectionRef, careworkerId);

    const workHoursEntry = {
      hours: data.workHours,
      date: data.date,
    };

    await updateDoc(careworkerDoc, {
      workHours: arrayUnion(workHoursEntry),
    });

    return true;
  } catch (error) {
    console.error("Error updating document: ", error);
    return false;
  }
};