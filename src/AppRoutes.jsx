import React from "react";
import { useState, Suspense } from "react";


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
import Forgetpassword from "./Components/Forgetpassword";
import ChangePassword from "./Components/ChangePassword";
import VerifyEmail from './Components/VerifyEmail'

//jobs
import CreateJobs from "./Components/jobs/CreateJobs";

//components
import Dashboard from './DashboardArea/Dashboard';
import Aside from './DashboardArea/Aside'
import StudentLists from "./DashboardArea/StudentLists";
import SearchInterns from "./DashboardArea/SearchInterns";
import StartUpprofileForm from "./DashboardArea/StartUpProfileForm";
import Notification from './DashboardArea/Notification'
import StartUpProfile from './DashboardArea/StartUpProfile'
import StudentAside from './StudentDashboard/StudentAside'
import StudentDashboard from './StudentDashboard/StudentDashboard'
import UpdateJobs from "./Components/jobs/UpdateJobs";
import Loading from "./Components/Loading/Loading";
import JobDescp from "./DashboardArea/JobDescp";
import PageNotFound from "./Components/PagenotFound/PageNotFound";

// Authorizer 
import { AuthProvider } from "./Authorizer";
import Jobs from "./DashboardArea/Jobs";
import StartupBlog from "./DashboardArea/StartupBlog";


const AppRoutes = (props) => {
    let userData = props.userData;
    let isStudent = props.isStudent;
    let isStartUp = props.isStartUp;
    let isVerified = props.isVerified;
    // print above variables in console
    console.log(userData);
    console.log(isStudent);
    console.log(isStartUp);
    console.log(isVerified); 
    return (
        <>
            <Suspense >
                <Routes>
                    <Route path="/" element={<Home  />} />
                    <Route path="/Home" element={<Home  />} />
                    <Route path="About" element={<About />} />
                    <Route path="Contact" element={<Contact />} />
                    <Route path="Login" element={<Login  />} />
                    <Route path="LoginStartUp" element={<LoginStartUp />} />
                    <Route path="Signup" element={<Signup />} />
                    <Route path="Signupstartup" element={<Signupstartup />} />
                    <Route path="studentprofileform" element={<Studentprofileform />} />
                    <Route path="Studentprofile" element={<Studentprofile />} />
                    <Route path="Filteredstudentlist" element={<Filteredstudentlist />} />
                    <Route path="Forgetpassword" element={<Forgetpassword  />} />
                    <Route path="ChangePassword" element={<ChangePassword /> } />
                    <Route path="Dashboard" element={<Dashboard />} />
                    <Route path="StartUpprofileForm" element={<StartUpprofileForm />} />
                    <Route path="StartUpProfile" element={<StartUpProfile />} />
                    <Route path="VerifyEmail" element={<VerifyEmail />} />
                    <Route path="StudentAside" element={<StudentAside />} />
                    <Route path="StudentDashboard" element={<StudentDashboard />} />



                    {/* //jobs routes */}
                    <Route path="CreateJobs" element={<CreateJobs />} />
                    <Route path="UpdateJobs/:id" element={<UpdateJobs />} />
                    <Route path="JobDescp" element ={<JobDescp/>}/>

                    <Route path="Loading" element={<Loading/> } />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default AppRoutes;


