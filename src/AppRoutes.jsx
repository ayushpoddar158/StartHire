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
    const [loginIsTrue, setLoginIsTrue] = useState(false)
    const [userName, setUserName] = useState("")
    const [generateotp, setGenerateotp] = useState("")
    const [uniqueId, setUniqueId] = useState("")

    return (
        <>
            <Suspense fallback={<Loading/>}>
                <Routes>
                    <Route path="/" element={<Home userName={userName} loginIsTrue={loginIsTrue} />} />
                    <Route path="/Home" element={<Home userName={userName} loginIsTrue={loginIsTrue} />} />
                    <Route path="About" element={<About />} />
                    <Route path="Contact" element={<Contact />} />
                    <Route path="Login" element={<Login setUserName={setUserName} loginIsTrue={loginIsTrue} userName={userName} setLoginIsTrue={setLoginIsTrue} />} />
                    <Route path="LoginStartUp" element={<LoginStartUp />} />
                    <Route path="Signup" element={<Signup />} />
                    <Route path="Signupstartup" element={<Signupstartup />} />
                    <Route path="studentprofileform" element={<Studentprofileform />} />
                    <Route path="Studentprofile" element={<Studentprofile />} />
                    <Route path="Filteredstudentlist" element={<Filteredstudentlist />} />
                    <Route path="Forgetpassword" element={<Forgetpassword uniqueId={uniqueId} setUniqueId={setUniqueId} generateotp={generateotp} setGenerateotp={setGenerateotp} />} />

                    <Route path="ChangePassword" element={<ChangePassword uniqueId={uniqueId} setUniqueId={setUniqueId} />} />
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

                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default AppRoutes;


