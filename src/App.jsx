import React from "react";
import { useState } from "react";


//component
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AppRoutes from "./AppRoutes";


// Authorizer 
import { AuthContext, AuthProvider } from "./Authorizer";
import { useContext } from "react";
import { useEffect } from "react";

// Data setup 
import { db } from "./Firebase";
import {
  query,
  getDocs,
  collection,
  addDoc,
  where
} from "firebase/firestore";
import { TryRounded } from "@mui/icons-material";

const App = () => {
  const { currentUser } = useContext(AuthContext)
  const [id, setId] = useState(null);
  const [isVerified, setIsVerified] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isStartUp, setIsStartUp] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const getUserData = async (currentUser) => {
      console.log("inside get user data")
      let id = await currentUser?.uid;
      let isVerified = await currentUser?.emailVerified;
      setId(id)
      setIsVerified(isVerified);
      try {
        const q = query(collection(db, "startups"), where("uid", "==", id));
        const docs = await getDocs(q);
        if (docs.docs.length > 0) {
          setIsStartUp(true);
          setUserData(docs.docs[0].data());
        }
      }
      catch (err) {
        const q = query(collection(db, "users"), where("uid", "==", id));
        const docs = await getDocs(q);
        if (docs.docs.length > 0) {
          setIsStudent(true);
          setUserData(docs.docs[0].data());
        }
      }
    }
    if (currentUser) {
      getUserData(currentUser);
    }
  }, [currentUser])

  return (
    <>
      <Navbar />
      <AppRoutes userData={userData} isStartUp={isStartUp} isStudent={isStudent} isVerified={isVerified} />
      <Footer />
    </>
  );
};

export default App;


