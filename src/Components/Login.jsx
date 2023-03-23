import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Login = () => {


  // login



const [inpval,setInpVal]=useState({
  email:"",
  password:""
})  

const getData=(e)=>{
// console.log(e.target.value)

const {value,name}=e.target


setInpVal(()=>{
  return{
    ...inpval,
    [name]:value
  }
})

}


const checkLogin=()=>{
const studentData=JSON.parse(localStorage.getItem("lists"))
console.log(studentData)
studentData.map((elem)=>{
  if(elem.email===inpval.email){
    if(elem.password===inpval.password){
      alert(`welcome ${elem.name}`)
    }
    else{
      alert(`please write correcct password`)
    }
   
    
  }


})

}


  return (
   <>
   <section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100" id='loginid'>
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p className="lead fw-normal mb-0 me-3"> Student Sign in with</p>
            <button type="button" className="btn btn-primary btn-floating mx-1">
              {/* <i className="fab fa-facebook-f"></i> */}
              <i className="zmdi zmdi-facebook"></i>
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1">
              {/* <i className="fab fa-twitter"></i> */}
              <i className="zmdi zmdi-twitter"></i>

            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1">
              {/* <i className="fab fa-linkedin-in"></i> */}
              <i className="zmdi zmdi-linkedin"></i>
            </button>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <input type="email" id="form3Example3" name="email" onChange={getData} className="form-control form-control-lg"
              placeholder="Enter a valid email address" />
            <label className="form-label" for="form3Example3">Email address</label>
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-3">
            <input type="password" id="form3Example4" onChange={getData} name="password" className="form-control form-control-lg"
              placeholder="Enter password" />
            <label className="form-label" for="form3Example4">Password</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            {/* <!-- Checkbox --> */}
            <div className="form-check mb-0">
              <input className="form-check-input me-2" onChange={getData}  type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div>
            <Link to="#!" className="text-body">Forgot password?</Link>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button  id='loginregisterbtn' onClick={checkLogin} type="button"  className="btn btn-primary btn-lg"
              >Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/signup"
                className="link-danger">Register</Link></p>
          </div>

        </form>
      </div>
    </div>
  </div>

</section>
   </>
  )
}

export default Login