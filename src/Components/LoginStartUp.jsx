
import React, { useState } from 'react'
import  { useNavigate}    from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../style/Login.css'
const LoginStartUp = () => {

  let navigate=useNavigate()
  const navigateHome=()=>{
    navigate('/')
  }
  
    // login
  
  
  
  const [inpval,setInpVal]=useState({
    
    email:"",
    password:""
  })  
  
  
  const getData=(e)=>{
  console.log(e.target.value)
  
  const {value,name}=e.target
  
  
  setInpVal(()=>{
    return{
      ...inpval,
      [name]:value
    }
  })
  
  }
  
  
  const checkLogin=()=>{

  // console.log(studentData)
  // console.log(inpval)
  

  alert("checklogin function")
  }


  return (
    <>
     {/* <!-- Pills navs --> */}
     <div className="container" id='Loginchangediv'>
     <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
  <li class="nav-item" role="presentation">
    <Link class="nav-link active Loginchangebtn1" id="tab-login" data-mdb-toggle="pill" to="/Login" role="tab"
      aria-controls="pills-login" aria-selected="true">Student Login</Link>
  </li>
  <li class="nav-item" role="presentation">
    <Link class="nav-link Loginchangebtn2" id="tab-register" data-mdb-toggle="pill" to="/LoginStartUp" role="tab"
      aria-controls="pills-register" aria-selected="false">StartUp Login</Link>
  </li>
</ul>
     </div>

  <section class="vh-100 my-5"  id='loginId'>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10" id='loginmain'>
        <div class="card" style={{borderRadius:" 1rem",padding:"30px"}}>
          <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img2.webp"
                alt="login form" class="img-fluid" style={{borderRadius:" 1rem 0 0 1rem"}} />
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">

                <form>

                  {/* <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                    <span class="h1 fw-bold mb-0">Logo</span>
                  </div> */}

                  <h3 class="fw-normal mb-3 pb-3" style={{letterspacing: "1px"}}>Sign Up as Startup into your account</h3>

                  <div class="form-outline mb-4">
                    <input type="email" id="form2Example17" name='email'   onChange={getData} class="form-control form-control-lg" />
                    <label class="form-label" for="form2Example17">Email address</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="form2Example27" name='password' onChange={getData} class="form-control form-control-lg" />
                    <label class="form-label" for="form2Example27">Password</label>
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-dark btn-lg btn-block" onClick={checkLogin} type="button">Login</button>
                  </div>

                  <a class="small text-muted" href="#!">Forgot password?</a>
                  <p class="mb-5 pb-lg-2" style={{color: "#393f81"}}>Don't have an account? <a href="#!"
                      style={{color: "#393f81"}}>Register here</a></p>
                 
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
   </>
  )
}

export default LoginStartUp