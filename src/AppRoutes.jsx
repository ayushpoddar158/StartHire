import React,{ useState, useEffect } from "react";
import { Suspense } from "react";

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


const AppRoutes = (props) => {
    let userData = props.userData;
    let isStudent = props.isStudent;
    let isStartUp = props.isStartUp;
    let isVerified = props.isVerified;
    let isAdmin = props.isAdmin;
    let allData = props.allData;
    let notifObj = props.notifObj;
    

    const Basic = <>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="About" element={<About />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
    </>

    const AuthPages = <>
        <Route path="Login" element={<Login />} />
        <Route path="LoginStartUp" element={<LoginStartUp />} />
        <Route path="Signup" element={<Signup />} />
        <Route path="Signupstartup" element={<Signupstartup />} />
        <Route path="ForgetPassword" element={<ForgetPassword />} />
    </>

    const StudentPages = <>
        <Route path="/studentprofileform" element={<Studentprofileform userData={userData}/>} />
        <Route path="/Studentprofile" element={<Studentprofile userData={userData}/>} />
        <Route path="/StudentDashboard" element={<StudentDashboard userData={userData}/>} />
        <Route path="/VerifyEmail" element={<VerifyEmail />} />
        <Route path="/StudentNotification" element={<StudentNotification notifObj ={notifObj } />} />
    </>

    const StartUpPages = <>
        <Route path="Filteredstudentlist" element={<Filteredstudentlist userData={userData}/>} />
        <Route path="Dashboard" element={<Dashboard userData={userData}/>} />
        <Route path="StartUpprofileForm" element={<StartUpprofileForm userData={userData}/>} />
        <Route path="StartUpProfile" element={<StartUpProfile userData={userData}/>} />
        <Route path="VerifyEmail" element={<VerifyEmail/>} />
        <Route path="StartUpBlog" element={<StartupBlog userData={userData}/>} />
        <Route path="Notification" element={<Notification 
        notifObj ={notifObj } />} />
        {/* //jobs routes */}
        <Route path="Jobs" element={<Jobs userData={userData}/>} />
        <Route path="CreateJobs" element={<CreateJobs userData={userData}/>} />
        <Route path="UpdateJobs/:id" element={<UpdateJobs />} />
        <Route path="JobDescp/:id" element={<JobDescp />} />
    </>

    const AdminPages = <>
        <Route path="/AdminDashboard" element={<AdminDashboard allData={allData} />} />
        <Route path="/AdminJobs" element={<AdminJobs allData={allData}/>} />
        <Route path="/SearchInterns" element={<SearchInterns allData={allData}/>} />
        <Route path="/AdminStudentLists" element={<AdminStudentLists allData={allData}/>} />
        <Route path="/StartUpLists" element={<StartUpLists allData={allData}/>} />
        <Route path="/AdminNotification" element={<AdminNotification allData={allData}/>} />
        <Route path="/AdminStartupData/:id" element={<AdminStartupData />} />
        <Route path="JobDescp/:id" element={<JobDescp />} />
        <Route path="AdminUpdateJobs/:id" element={<AdminUpdateJobs/>} />
        <Route path="AdminStudentView/:id" element={<AdminStudentView />} />
    </>

    if (isAdmin) {
        return (
            <>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        {Basic}
                        {AuthPages}
                        {AdminPages}
                    </Routes>
                </Suspense>
            </>
        )
    }

    if (!isStartUp && !isStudent) {
        return (
            <>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        {Basic}
                        {AuthPages}
                    </Routes>
                </Suspense>
            </>
        );
    }
    else if (isStartUp && !isStudent && isVerified) {
        return (
            <>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        {Basic}
                        {StartUpPages}
                    </Routes>
                </Suspense>
            </>
        );
    }

    else if (isStartUp && !isStudent && !isVerified) {
        return (
            <>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        {Basic}
                        {AuthPages}
                        <Route path="StartUpprofileForm" element={<StartUpprofileForm userData={userData}/>} />
                        <Route path="VerifyEmail" element={<VerifyEmail />} />
                    </Routes>
                </Suspense>
            </>
        );
    }
    else if (isStudent && isVerified) {
        return (
            <>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        {Basic}
                        {StudentPages}
                    </Routes>
                </Suspense>
            </>
        );
    }


    else if (isStudent && !isVerified) {
        return (
            <>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        {Basic}
                        {AuthPages}
                        <Route path="/studentprofileform" element={<Studentprofileform userData={userData}/>} />
                        <Route path="VerifyEmail" element={<VerifyEmail />} />
                    </Routes>
                </Suspense>
            </>
        );
    }

};

export default AppRoutes;


