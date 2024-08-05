import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAc3j-EpytQW1j5UXNkc20aD3zzqYIZ_7k",
  authDomain: "plaza-services.firebaseapp.com",
  projectId: "plaza-services",
  storageBucket: "plaza-services.appspot.com",
  messagingSenderId: "420969876737",
  appId: "1:420969876737:web:2664359a7613e415ffdf00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);  
export default getFirestore(app); 