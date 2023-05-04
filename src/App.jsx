import React from "react";
import { useState } from "react";


//component
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import {Route,Routes} from "react-router-dom"
import Footer from "./Components/Footer";
import Signupstartup from "./Components/signupstartup"
import LoginStartUp from "./Components/LoginStartUp";
import Studentprofileform from "./Components/Studentprofileform";
import Studentprofile from "./Components/Studentprofile"
import Filteredstudentlist from "./Components/Filteredstudentlist";
import Forgetpassword from "./Components/Forgetpassword";
import ChangePassword from "./Components/ChangePassword";
import VerifyEmail  from './Components/VerifyEmail'

//jobs
import CreateJobs from "./Components/jobs/CreateJobs";

//dashboard
import  Dashboard  from './DashboardArea/Dashboard';
import Aside from './DashboardArea/Aside'
import StudentLists from "./DashboardArea/StudentLists";
import SearchInterns from "./DashboardArea/SearchInterns";
import StartUpprofileForm from "./DashboardArea/StartUpProfileForm";
import Notification from './DashboardArea/Notification'
import StartUpProfile from './DashboardArea/StartUpProfile'
import StudentAside  from './StudentDashboard/StudentAside'
import StudentDashboard  from './StudentDashboard/StudentDashboard'


// Authorizer 
import { AuthProvider } from "./Authorizer";
import Jobs from "./DashboardArea/Jobs";
import StartupBlog from "./DashboardArea/StartupBlog";

const App = () => {

  // const getLocalItems=()=>{
  //   const list=localStorage.getItem("lists")
  //   if(list){
  //     return JSON.parse(localStorage.getItem('lists'))
  //   }
  //   else{
  //     return []
  //   }
  // }

  // const [items,SetItems]=useState(getLocalItems())



const [loginIsTrue,setLoginIsTrue]=useState(false)
const [userName,setUserName]=useState("")
const [generateotp,setGenerateotp]=useState("")
const [uniqueId,setUniqueId]=useState("")

  return (
    <>
    <AuthProvider>
        <Navbar />
        {/* <Home/> */}
        <Routes>
          <Route path="/"  element={<Home  userName={userName}  loginIsTrue={loginIsTrue}/>}/>
          <Route path="/Home"  element={<Home  userName={userName}  loginIsTrue={loginIsTrue}/>}/>
          <Route path="About" element={<About/>}/>
          <Route path="Contact" element={<Contact/>}/>
          <Route path="Login" element={<Login   setUserName={setUserName} loginIsTrue={loginIsTrue}  userName={userName}  setLoginIsTrue={setLoginIsTrue}/>}/>
          <Route path="LoginStartUp" element={<LoginStartUp/>}/>
          <Route path="Signup"  element={<Signup/>}/>
          <Route path="Signupstartup" element={<Signupstartup/>}/>
          <Route path="studentprofileform" element={<Studentprofileform/>}/>
          <Route path="Studentprofile" element={<Studentprofile/>}/>
          <Route path="Filteredstudentlist" element={<Filteredstudentlist/>}/>
          <Route path="Forgetpassword" element={<Forgetpassword  uniqueId={uniqueId} setUniqueId ={setUniqueId}  generateotp={generateotp} setGenerateotp={setGenerateotp}/>}/>
      
          <Route path="ChangePassword" element={<ChangePassword  uniqueId={uniqueId} setUniqueId ={setUniqueId} />}/>
          <Route path="Dashboard" element={<Dashboard />}/>
          <Route path="StartUpprofileForm" element={<StartUpprofileForm />}/>
          <Route path="StartUpProfile" element={<StartUpProfile />}/>
          <Route path="VerifyEmail" element={<VerifyEmail/>}/>
          <Route path="StudentAside" element={<StudentAside/>}/>
          <Route path="StudentDashboard" element={<StudentDashboard/>}/>
      


          {/* //jobs routes */}
          <Route path="CreateJobs" element={<CreateJobs/>}/>

          
        </Routes>
        <Footer/>
      </AuthProvider>
    </>
  );
};

export default App;


