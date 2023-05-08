import React from "react";
import { Suspense } from "react";


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

//jobs
import CreateJobs from "./Components/jobs/CreateJobs";

//components
import Dashboard from './DashboardArea/Dashboard';
import StartUpprofileForm from "./DashboardArea/StartUpProfileForm";
import Notification from './DashboardArea/Notification'
import StartUpProfile from './DashboardArea/StartUpProfile'
import StudentAside from './StudentDashboard/StudentAside'
import StudentDashboard from './StudentDashboard/StudentDashboard'
import UpdateJobs from "./Components/jobs/UpdateJobs";
import Loading from "./Components/Loading/Loading";
import JobDescp from "./DashboardArea/JobDescp";
import PageNotFound from "./Components/PagenotFound/PageNotFound";


const AppRoutes = (props) => {
    let userData = props.userData;
    let isStudent = props.isStudent;
    let isStartUp = props.isStartUp;
    let isVerified = props.isVerified;

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
    </>

    const StudentPages = <>
        <Route path="studentprofileform" element={<Studentprofileform />} />
        <Route path="Studentprofile" element={<Studentprofile />} />
        <Route path="StudentDashboard" element={<StudentDashboard />} />
        <Route path="VerifyEmail" element={<VerifyEmail />} />
    </>

    const StartUpPages = <>
        <Route path="Filteredstudentlist" element={<Filteredstudentlist />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="StartUpprofileForm" element={<StartUpprofileForm />} />
        <Route path="StartUpProfile" element={<StartUpProfile />} />
        <Route path="VerifyEmail" element={<VerifyEmail />} />
        {/* //jobs routes */}
        <Route path="CreateJobs" element={<CreateJobs />} />
        <Route path="UpdateJobs/:id" element={<UpdateJobs />} />
        <Route path="JobDescp" element={<JobDescp />} />
    </>



    console.log(isStudent, isStartUp, isVerified)
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
                        <Route path="VerifyEmail" element={<VerifyEmail />} />
                    </Routes>
                </Suspense>
            </>
        );
    }

};

export default AppRoutes;


