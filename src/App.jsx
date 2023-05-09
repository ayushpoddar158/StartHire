import React, { Suspense } from "react";
import { useState } from "react";
import { useLocation } from "react-router";

//component
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AppRoutes from "./AppRoutes";
import Loading from "./Components/Loading/Loading";
import AsideMain from "./DashboardArea/AsideMain";


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


const App = (props) => {
  const location = useLocation();
  const { currentUser } = useContext(AuthContext)
  const [id, setId] = useState(null);
  const [isVerified, setIsVerified] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isStartUp, setIsStartUp] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  // conditional routing for navbar and sidebar
  const [isFullPageLayout, setIsFullPageLayout] = useState(false);
  const [haveSideBar, setHaveSideBar] = useState(false);
  const [isAdmin , setIsAdmin ] = useState(true);

  useEffect(() => {
    onRouteChanged();
  }, []);

  useEffect(() => {
    onRouteChanged();
  }, [location]);

  function onRouteChanged() {
    console.log("ROUTE CHANGED");
    // window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/Home', '/About', '/Contact', "/LoginStartUp", "/Login", "/Signup", "/Signupstartup","VerifyEmail"];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (location.pathname === fullPageLayoutRoutes[i]) {
        setIsFullPageLayout(true);
        break;
      } else {
        setIsFullPageLayout(false);
      }
    }
  }

  useEffect(() => {
    const getUserData = async (currentUser) => {
      console.log("inside get user data")
      let id = await currentUser?.uid;
      let isVerified = await currentUser?.emailVerified;
      setId(id)
      setIsVerified(isVerified);
      try {
        console.log("inside try")
        const q = query(collection(db, "startups"), where("uid", "==", id));
        const docs = await getDocs(q);
        if (docs.docs.length > 0) {
          setIsStartUp(true);
          setUserData(docs.docs[0].data());
        }
        else {
          console.log("inside catch")
          const q = query(collection(db, "users"), where("uid", "==", id));
          const docs = await getDocs(q);
          if (docs.docs.length > 0) {
            setIsStudent(true);
            setUserData(docs.docs[0].data());
          }

        }
      }
      catch (err) {
        console.log(err);
      }
    }
    if (currentUser) {
      getUserData(currentUser);
    }
  }, [currentUser])

  useEffect(() => {
    console.log(userData)
  }, [currentUser])

  let navbarComponent = isFullPageLayout ? <Navbar /> : '';
  let sidebarComponent = !isFullPageLayout ? <AsideMain userData={userData} isStartUp={isStartUp} isStudent={isStudent} isVerified={isVerified} isAdmin={isAdmin}/> : '';
  // let footerComponent = !this.state.isFullPageLayout ? <Footer /> : '';

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navbar userData={userData} isStartUp={isStartUp} isStudent={isStudent} isVerified={isVerified} isAdmin={isAdmin} />
        { sidebarComponent }
        <AppRoutes 
        userData={userData}
         isStartUp={isStartUp} 
         isStudent={isStudent} 
         isVerified={isVerified}
         isAdmin={isAdmin} />
        {/* <Footer /> */}
      </Suspense>
    </>
  );
};

export default App;


