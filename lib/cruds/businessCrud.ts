
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
  getCountFromServer
} from 'firebase/firestore';
import db from '@/lib/firebaseConfig';
import { v4} from 'uuid';
const collectionRef = collection(db, 'businesses');
const alertsCollectionRef = collection(db, 'alerts');



  
 export async function addBusiness(data: any) {

    const businessData = {
      ...data,
      timestamp: serverTimestamp(),
      requestAccepted: false,
      isAdmin : false,
    }
    console.log("businessData",businessData);
    try {
      const businessRef = doc(collectionRef, data.email);
      await setDoc(businessRef, businessData);
    } catch (error) {
      console.error(error);
    }
  }

export async function isBusinessApproved(email: string) {
  const businessRef = doc(collectionRef, email);
  const business = await getDoc(businessRef);

  if (business.exists()) {
    console.log("business", business.data());
    return business.data().requestAccepted;
  } else {
    return {
      message: "Invalid Credentials"
    };
  }
}


export function getAllApprovalRequests(callback: (requests: any[]) => void) {
  try {
    const q = query(collectionRef, where("requestAccepted", "==", false));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const approvalRequests = querySnapshot.docs.map(doc => doc.data());
      callback(approvalRequests);
    });
    return unsubscribe;
  } catch (error) {
    console.error(error);
    return () => {};
  }
}

export async function approveRequest (email: string) {
  const businessRef = doc(collectionRef, email);
  try {
    await updateDoc(businessRef, {
      requestAccepted: true,
    });
  } catch (error) {
    console.error(error);
  }
}

export const getBusinessFollowers = async (businessEmail: string) => {
  const businessDoc = doc(collectionRef, businessEmail);
  const businessSnapshot = await getDoc(businessDoc);

  if (businessSnapshot.exists()) {
    
    const businessData = businessSnapshot.data() 
    
    return businessData.followers;
  } else {
    console.error("No such business!");
    return [];
  }
};


export const getAllBusinesses = async () => {
  try {
    const q = query(collectionRef, where("requestAccepted", "==", true));
    const querySnapshot = await getDocs( q);
    const businesses = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const businessData = doc.data();
        const businessId = businessData.businessId;

        const alertsQuery = query(alertsCollectionRef, where("creatorId", "==", businessId));
        const alertsSnapshot = await getDocs(alertsQuery);
        const totalAlerts = alertsSnapshot.size; // Count of alerts

        // Return business data along with the total alerts count
        return {
          ...businessData,
          totalAlerts,
        };
      })
    );
    
    console.log("🚀 ~ getAllBusinesses ~ businesses:", businesses);
    return businesses;
  } catch (error) {
    console.error("Error fetching businesses or alerts:", error);
    return [];
  }
}