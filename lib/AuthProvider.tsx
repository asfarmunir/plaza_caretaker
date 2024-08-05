"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import db from "@/lib/firebaseConfig";

const AuthContext = createContext(
  {} as {
    user: any;
    loading: boolean;
  }
);
// interface ExtendedUser extends User {
//   isAdmin: boolean;
// }

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("🚀 ~ unsubscribe ~ user:", user);
      setUser(user);
      // setLoading(true);
      // if (user) {
      //   // console.log("AuthProvider -> user", user);
      //   const userDoc = await getDoc(doc(db, "businesses", "admin@gmail.com"));
      //   // console.log("AuthProvider -> userDoc", userDoc);
      //   if (userDoc.exists()) {
      //     const userData = userDoc.data();
      //     const isAdmin = userData.isAdmin || false;
      //     const extendedUser = { ...user, isAdmin };
      //     setUser(extendedUser);
      //   } else {
      //     const extendedUser = { ...user, isAdmin: false };
      //     setUser(extendedUser);
      //   }
      // } else {
      //   setUser(null);
      // }
      // setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  console.log("AuthProvider ->logged in user", user);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
