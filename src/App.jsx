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
  doc,
  getDoc,
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
  const [studentSignUpOpen, setStudentSignUpOpen] = useState(true);
  const [startupSignUpOpen, setStartupSignUpOpen] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // // setting up notification
  var [notifObj, setNotifObj] = useState([]);
  var [unReadCount, setUnreadCount] = useState(0);

  // conditional routing for navbar and sidebar
  const [isFullPageLayout, setIsFullPageLayout] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allData, setAllData] = useState({
    user: null,
    startup: null,
    job: null
  });

  useEffect(() => {
    onRouteChanged();
  }, [location]);

  function onRouteChanged() {
    console.log("ROUTE CHANGED");
    // // window.scrollTo(0, 0);
    // const halfPageLayoutRoutes = ["/studentprofileform","/Studentprofile","/StudentDashboard","/StudentNotification",
    //                               "/Filteredstudentlist","/Dashboard","/StartUpprofileForm","/StartUpProfile","/StartUpBlog","/Notification","/Model",
    //                               "/Jobs","/CreateJobs","/UpdateJobs/]
    const fullPageLayoutRoutes = ['/', '/Home', '/About', '/Contact', "/LoginStartUp", "/Login", "/Signup", "/Signupstartup", "/VerifyEmail","/ForgetPassword","/VerifyEmail"];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (location.pathname.toLocaleLowerCase() === fullPageLayoutRoutes[i].toLocaleLowerCase()) {
        setIsFullPageLayout(true);
        break;
      } else {
        setIsFullPageLayout(false);
      }
    }
  }

  useEffect(() => {
    setLoading(true);
    const getUserData = async (currentUser) => {
      console.log("inside get user data")
      let id = await currentUser?.uid;
      let isVerified = await currentUser?.emailVerified;
      setId(id)
      setIsVerified(isVerified);
      try {
        console.log("inside try")
        const q = query(collection(db, "startups"), where("uid", "==", id));
        const docs = await getDocs(q)
          .then(async (docs) => {
            if (docs.docs.length > 0) {
              setIsStartUp(true);
              setUserData(docs.docs[0]);
            }
            else {
              console.log("inside catch")
              const q = query(collection(db, "users"), where("uid", "==", id));
              await getDocs(q)
                .then((docs) => {
                  if (docs.docs.length > 0) {
                    console.log(docs.docs[0].data())
                    if (docs.docs[0].data().desgn == "admin") {
                      setIsAdmin(true);
                    }
                    else {
                      setIsStudent(true);
                      setUserData(docs.docs[0]);
                    }
                  }
                })

            }
          })
      }
      catch (err) {
        console.log(err);
      }
      // finally {
      //   setLoading(false)
      // }
    }
    if (currentUser) {
      getUserData(currentUser);
    }
  }, [currentUser])

  useEffect(() => {
    const getAdminParams = async () => {
      const q = collection(db, "adminParams");
      await getDocs(q)
        .then((adminDoc) => {
          var resData = adminDoc.docs[0].data();
          setStartupSignUpOpen(resData.StartUpRegOpen);
          setStudentSignUpOpen(resData.StdRegOpen);
          setUserCount(resData.allTimeUserCount);
        }).catch((err) => {
          console.log(err);
        })
    }
    getAdminParams();
  }, [])




  useEffect(() => {
    // setLoading(true);
    var fetchNotif = async (notifIds) => {
      console.log("user: ", userData)
      let UnReadCount = 0;
      for (let i = notifIds.length - 1; i >= 0; i--){
        let notifRef = doc(db, "notification", notifIds[i]);
        let note = await getDoc(notifRef);
        if (note.data().isRead === false) {
          UnReadCount = UnReadCount + 1;
        }
        setNotifObj(notif => [
          ...notif,
          note
        ]);
      }
      setUnreadCount(UnReadCount);
    }
    const fetchNote = async (notifIds) => {
      console.log("fetchnote is called")
      await fetchNotif(notifIds).finally(() => {
        setLoading(false);
      })
    }
    fetchNote(userData?.data().notification);
  }, [userData]);


  useEffect(() => {
    console.log("student open", studentSignUpOpen);
    console.log("startup open", startupSignUpOpen);
  }, [studentSignUpOpen])


  useEffect(() => {
    setLoading(true);
    const getAllData = async () => {
      try {
        if (isAdmin) {
          const userQuery = query(collection(db, "users"));
          const userDocs = await getDocs(userQuery);
          const startupQuery = query(collection(db, "startups"));
          const startupDocs = await getDocs(startupQuery);
          const jobQuery = query(collection(db, "jobs"));
          const jobDocs = await getDocs(jobQuery);
          setAllData({
            user: userDocs.docs,
            startup: startupDocs.docs,
            job: jobDocs.docs,
          });
        }
      } catch (err) {
        console.log("error while fetching all data", err);
      } finally {
        setLoading(false);
      }
    };
    getAllData();
  }, [isAdmin])


  let navbarComponent = isFullPageLayout ? <Navbar /> : '';
  let sidebarComponent = !isFullPageLayout ? <AsideMain
    userData={userData}
    isStartUp={isStartUp}
    isStudent={isStudent}
    isVerified={isVerified}
    isAdmin={isAdmin}
    unReadCount={unReadCount} /> : '';
  let footerComponent = isFullPageLayout ? <Footer /> : "";
  // let footerComponent = !this.state.isFullPageLayout ? <Footer /> : '';

  return (
    <>
      {loading ? <Loading /> :
        <>
          <Suspense >
            <Navbar userData={userData}
              isStartUp={isStartUp}
              isStudent={isStudent}
              isVerified={isVerified}
              isAdmin={isAdmin} />
            {sidebarComponent}
            <AppRoutes
              userData={userData}
              isStartUp={isStartUp}
              isStudent={isStudent}
              isVerified={isVerified}
              isAdmin={isAdmin}
              allData={allData}
              notifObj={notifObj}
              startupSignUpOpen={startupSignUpOpen}
              studentSignUpOpen={studentSignUpOpen} 
              userCount={userCount}/>
            {footerComponent}
          </Suspense>
        </>
      }
    </>
  );
};

export default App;


