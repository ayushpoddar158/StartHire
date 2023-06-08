import React, { useState, useEffect } from "react";
import { Suspense } from "react";
import { Navigate } from "react-router-dom";

// Data setup 
import { db } from "./Firebase";
import {
    query,
    getDocs,
    collection,
    addDoc,
    getDoc,
    updateDoc,
    where,
    doc
} from "firebase/firestore";

//component
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { Route, Routes } from "react-router-dom"
import Signupstartup from "./Components/signupstartup"
import LoginStartUp from "./Components/LoginStartUp";
import Studentprofileform from "./Components/Studentprofileform";
import Studentprofile from "./StudentDashboard/Studentprofile"
import Filteredstudentlist from "./Components/Filteredstudentlist";
import VerifyEmail from './Components/VerifyEmail'
import Jobs from './DashboardArea/Jobs';

//Admin setup
import AdminDashboard from "./AdminDashboard/AdminDash";
import AdminJobs from "./AdminDashboard/Jobs";
import SearchInterns from "./AdminDashboard/SearchInterns";
//jobs
import CreateJobs from "./Components/jobs/CreateJobs";
import JobDescp from "./DashboardArea/JobDescp";

//components
import Dashboard from './DashboardArea/Dashboard';
import StartUpprofileForm from "./DashboardArea/StartUpProfileForm";
import Notification from './DashboardArea/Notification'
import StartUpProfile from './DashboardArea/StartUpProfile'
import StudentAside from './StudentDashboard/StudentAside'
import StudentDashboard from './StudentDashboard/StudentDashboard'
import UpdateJobs from "./Components/jobs/UpdateJobs";
import Loading from "./Components/Loading/Loading";
import PageNotFound from "./Components/PagenotFound/PageNotFound";
import StartupBlog from "./DashboardArea/StartupBlog";
import StudentNotification from "./StudentDashboard/StudentNotification";
import StudentLists from "./DashboardArea/StudentLists";
import AdminStudentLists from "./AdminDashboard/AdminStudentList";
import ForgetPassword from "./Components/Forgetpassword";
import StartUpLists from "./AdminDashboard/StartUpLists";
import AdminNotification from "./AdminDashboard/AdminNotification";
import AdminStartupData from "./AdminDashboard/AdminStartupData";
import AdminUpdateJobs from "./AdminDashboard/AdminUpdateJobs";
import AdminStudentView from "./AdminDashboard/AdminStudentView";
import Model from "./Components/Model/Model";
import { Mode } from "@mui/icons-material";

const AppRoutes = (props) => {
    // console.log("inside app routes") 
    // console.log(props)
    let userData = props.userData;
    let isStudent = props.isStudent;
    let isStartUp = props.isStartUp;
    let isVerified = props.isVerified;
    let isAdmin = props.isAdmin;
    let allData = props.allData;
    let notifObj = props.notifObj;
    let studentSignUpOpen = props.studentSignUpOpen;
    let startupSignUpOpen = props.startupSignUpOpen;
    let userCount = props.userCount;

    var [loading, setLoading] = useState(true)

    useState(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 3000)
        return () => clearTimeout(timer)
    }, [])




    const Basic = <>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
    </>

    const AuthPages = <>
        <Route path="/Login" element={<Login />} />
        <Route path="/LoginStartUp" element={<LoginStartUp />} />
        <Route path="/Signup" element={<Signup studentSignUpOpen={studentSignUpOpen} userCount={userCount} />} />
        <Route path="/Signupstartup" element={<Signupstartup startupSignUpOpen={startupSignUpOpen} />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
    </>

    const StudentPages = <>
        <Route path="/Studentprofile" element={<Studentprofile userData={userData} />} />
        <Route path="/StudentDashboard" element={<StudentDashboard userData={userData} />} />
        <Route path="/VerifyEmail" element={<VerifyEmail />} />
        <Route path="/StudentNotification" element={<StudentNotification notifObj={notifObj} />} />
        <Route path="*" element={<Navigate to="/StudentDashboard" replace />} />
    </>

    const StartUpPages = <>
        <Route path="/Filteredstudentlist" element={<Filteredstudentlist userData={userData} />} />
        <Route path="/Dashboard" element={<Dashboard userData={userData} />} />
        <Route path="/StartUpprofileForm" element={<StartUpprofileForm userData={userData} />} />
        <Route path="/StartUpProfile" element={<StartUpProfile userData={userData} />} />
        <Route path="/VerifyEmail" element={<VerifyEmail />} />
        <Route path="/StartUpBlog" element={<StartupBlog userData={userData} />} />
        <Route path="/Notification" element={<Notification
            notifObj={notifObj} />} />
        {/* //jobs routes */}
        <Route path="/Model" element={<Model />} />
        <Route path="/Jobs" element={<Jobs userData={userData} />} />
        <Route path="/CreateJobs" element={<CreateJobs userData={userData} />} />
        <Route path="/UpdateJobs/:id" element={<UpdateJobs isAdmin={isAdmin} />} />
        <Route path="/JobDescp/:id" element={<JobDescp isAdmin={isAdmin} />} />
        <Route path="*" element={<Navigate to="/Dashboard" replace />} />
    </>

    const AdminPages = <>
        <Route path="/AdminDashboard" element={<AdminDashboard allData={allData}
            studentSignUpOpen={studentSignUpOpen}
            startupSignUpOpen={startupSignUpOpen} />} />
        <Route path="/AdminJobs" element={<AdminJobs allData={allData} />} />
        <Route path="/SearchInterns" element={<SearchInterns allData={allData} />} />
        <Route path="/AdminStudentLists" element={<AdminStudentLists allData={allData} />} />
        <Route path="/StartUpLists" element={<StartUpLists allData={allData} />} />
        <Route path="/AdminNotification" element={<AdminNotification allData={allData} />} />
        <Route path="/AdminStartupData/:id" element={<AdminStartupData />} />
        <Route path="UpdateJobs/:id" element={<UpdateJobs isAdmin={isAdmin} />} />
        <Route path="JobDescp/:id" element={<JobDescp isAdmin={isAdmin} />} />
        <Route path="AdminUpdateJobs/:id" element={<AdminUpdateJobs />} />
        <Route path="AdminStudentView/:id" element={<AdminStudentView />} />
        <Route path="*" element={<Navigate to="/AdminDashboard" replace />} />
    </>

    if (isAdmin) {
        return (
            <>
                {loading ? <Loading /> :
                    <>
                        <Suspense >
                            <Routes>
                                {AuthPages}
                                {AdminPages}
                                {Basic}
                            </Routes>
                        </Suspense>
                    </>
                }
            </>
        )
    }

    if (!isStartUp && !isStudent) {
        return (
            <>
                {loading ? <Loading /> :
                    <>
                        <Suspense >
                            <Routes>
                                {AuthPages}
                                {Basic}
                                <>
                                    <Route path="*" element={<PageNotFound />} />
                                </>
                            </Routes>
                        </Suspense>
                    </>
                }
            </>
        );
    }
    else if (isStartUp && !isStudent && isVerified) {
        return (
            <>
                {loading ? <Loading /> :
                    <>
                        <Suspense >
                            <Routes>
                                {StartUpPages}
                                {Basic}
                                <>
                                    <Route path="*" element={<PageNotFound />} />
                                </>
                            </Routes>
                        </Suspense>
                    </>
                }</>
        );
    }

    else if (isStartUp && !isStudent && !isVerified) {
        return (
            <>
                {loading ? <Loading /> :
                    <>
                        <Routes>
                            {AuthPages}
                            <Route path="StartUpprofileForm" element={<StartUpprofileForm userData={userData} />} />
                            <Route path="VerifyEmail" element={<VerifyEmail />} />
                            {Basic}
                        </Routes>
                    </>
                }</>
        );
    }
    else if (isStudent && isVerified) {
        return (
            <>
                {loading ? <Loading /> :
                    <>
                        <Suspense >
                            <Routes>
                                {StudentPages}
                                {Basic}
                                {userData.data().VerifIsConfirmed ? null : 
                                <Route path="/studentprofileform" element={<Studentprofileform userData={userData} />} /> 
                                }
                                {/* <Route path="/*" element={<PageNotFound />} /> */}
                            </Routes>
                        </Suspense>
                    </>
                }</>
        );
    }


    else if (isStudent && !isVerified) {
        return (
            <>
                {loading ? <Loading /> :
                    <>
                        <Suspense >
                            <Routes>
                                {AuthPages}
                                <Route path="/studentprofileform" element={<Studentprofileform userData={userData} />} /> 
                                <Route path="/VerifyEmail" element={<VerifyEmail />} />
                                 {Basic}
                                <Route path="*" element={<PageNotFound />} />
                            </Routes>
                        </Suspense>
                    </>
                }</>
        );
    }

};

export default AppRoutes;


