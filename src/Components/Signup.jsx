import React, { useEffect, useState } from 'react'
import Signup1 from "../assets/signup1.jpg"
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from "uuid";
import Login from './Login';
import '../style/SignUp.css'

const Signup = () => {



console.log("signup")









const [inpVal,setInpVal]=useState({
  name:"",
  email:"",
  password:"",
  repeatpassword:""
  


})




const getdata=(e)=>{
  // console.log(e.target.value)

  const {value,name}=e.target;
  // console.log(value,name)



  setInpVal(()=>{
    return {
       ...inpVal,
       [name]:value
  

    }
  })

// console.log(inpVal)
  

}

const addData=(e)=>{
  e.preventDefault();
  console.log(inpVal)
 


const {name,email,password,repeatpassword}=inpVal;

if(name===""){
  alert("name field is required")
}else if(email===""){
  alert("email field is required")
}else if(!email.includes("@")){
  alert("please eneter valid email")
}else if(password===""){
  alert("password field is required")
}else if(password.length<5){
  alert("password length should be greater than five")

}
else if(password!=repeatpassword){
  alert("password and repeatpaswod should be same")
 

}
else{
  // const checkStudent=()=>{
    let istrue=false;
    items.map((elem)=>{
      if(elem.email===inpVal.email){
        istrue=true
        alert("This Email Already exists use another email id")
      }
    })
    if(istrue==false){
      SetItems([...items,inpVal])
      alert("successfully registered");
      
    }
  // }
  

  


}



}

  return (
    <>
     <div className="container" id='Signupchangediv'>
     {/* <!-- Pills navs --> */}
<ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
  <li class="nav-item" role="presentation">
    <Link class="nav-link active Signupchangebtn1" id="tab-login" data-mdb-toggle="pill" to="/Signup" role="tab"
      aria-controls="pills-login" aria-selected="true">Student Signup</Link>
  </li>
  <li class="nav-item" role="presentation">
    <Link class="nav-link Signupchangebtn2" id="tab-register" data-mdb-toggle="pill" to="/signupstartup" role="tab"
      aria-controls="pills-register" aria-selected="false">Startup Signup</Link>
  </li>
</ul>
{/* <!-- Pills navs --> */}
     </div>
<section className="vh-90" id='sign1main' >
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div id='signup1card' className="card text-black" >
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up as Student</p>

                <form className="mx-1 mx-md-4" >

                  <div  className="d-flex flex-row align-items-center mb-4">
                  <i  id='signupicons' className="zmdi zmdi-account"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" name="name" onChange={getdata} id="form3Example1c" className="form-control" />
                      <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                  <i id='signupicons' className="zmdi zmdi-email"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="email" name="email" id="form3Example3c" onChange={getdata} className="form-control" />
                      <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                    </div>
                  </div>
                 

                  <div className="d-flex flex-row align-items-center mb-4">
                  <i id='signupicons' className="zmdi zmdi-lock"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" name="password" id="form3Example4c" onChange={getdata} className="form-control" />
                      <label className="form-label" htmlFor="form3Example4c">Password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                  <i id='signupicons' className="zmdi zmdi-key"></i>
                    <div className="form-outline flex-fill mb-0">
                      <input type="password" name="repeatpassword" id="form3Example4cd" onChange={getdata} className="form-control" />
                      <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                    </div>
                  </div>

                  {/* <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      I agree all statements in <Link to="#!">Terms of service</Link>
                    </label>
                  </div> */}

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" onClick={addData} className="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div className="float-area col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid floating-img" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
        

  {/* <Login items={items}/>       */}
    </>
  )
}

export default Signup