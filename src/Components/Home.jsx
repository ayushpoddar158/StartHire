 import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
 
 const Home = ( {loginIsTrue ,SetLoginIsTrue,userName,setUserName}) => {
  console.log(loginIsTrue);
  let navigate=useNavigate();

  const navigateStudentProfileForm=()=>{
navigate('/Studentprofileform')

  }

   return (
  <>
<div className="homemaindiv">
<div id='homed1'>Welcome</div>
<h1 id='homeh1' ClassName='p-5 my-3'>we are StartHire</h1>

  {loginIsTrue ? <h4 >welcome {userName}</h4>:null}
  { loginIsTrue ? <button type="button" onClick={navigateStudentProfileForm} class="btn btn-warning">CReate yOur Profile</button>:null}
</div>


             
  </>
    
   )
 }
 
 export default Home