import React from "react";
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
import { useState } from "react";
import Studentprofileform from "./Components/Studentprofileform";
import Studentprofile from "./Components/Studentprofile"



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






  return (
    <>
     
        <Navbar />
        {/* <Home/> */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="About" element={<About/>}/>
          <Route path="Contact" element={<Contact/>}/>
          <Route path="Login" element={<Login/>}/>
          <Route path="LoginStartUp" element={<LoginStartUp/>}/>
          <Route path="Signup"  element={<Signup/>}/>
          <Route path="Signupstartup" element={<Signupstartup/>}/>
          <Route path="Studentprofileform" element={<Studentprofileform/>}/>
          <Route path="Studentprofile" element={<Studentprofile/>}/>
          
        </Routes>
        <Footer/>

    </>
  );
};

export default App;
