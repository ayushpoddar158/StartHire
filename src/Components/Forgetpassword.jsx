import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../style/Forgetpassword.css'
import { useState } from 'react'
import  { useNavigate}    from 'react-router-dom'


const Forgetpassword = ( {generateotp,setGenerateotp,uniqueId,setUniqueId}) => {
   const userexists=()=>{
if(inputemail===""){
    return <div className=" text-warning container mx-auto">Please enter email</div>
}
else{
    if(ismatch){
        return <div  className=" text-success container mx-auto">Email matched</div>
    }
    else{
        return <div   className=" text-danger container mx-auto">Email dosent  matched</div>
    }
}
   }




   const [ismatch,setIsMatch]=useState(false)


   const [inputemail,setInputemail]=useState("")






const getData=(e)=>{
setInputemail(e.target.value)
setUniqueId(e.target.value)
setIsMatch(false)






}  

// getotp
let navigate=useNavigate()
const getopt=()=>{
    var val = Math.floor(1000 + Math.random() * 9000);
    // console.log(val)
    setGenerateotp(val)
    
  
    alert(val)
//    alert(uniqueId)
    navigate('/VerifyemailOtp')

}
  return (
    <>
        <div className="card text-center mx-auto my-5 fino " style={{width: "450px" ,height:"300px"}}>
    <div className="card-header h5 text-white bg-danger fino">Password Reset</div>
    <div className="card-body px-5">
        <p className="card-text py-2">
            Enter your email address and we'll send you four digit OTP for verification.
        </p>
        <div className="form-outline ">
            <input type="email" onChange={getData}  id="typeEmail" className="form-control my-3 fino" placeholder='demo@123' />
            {/* <label class="form-label" for="typeEmail">Email input</label> */}
        </div>
        {
            userexists()
        }
       {
        ismatch ? <button onClick={getopt} className="btn btn-danger w-100 p-2 ">Send OTP</button>:
       <button to="" className="btn btn-danger w-100 p-2 ">Send OTP</button>
       }
        {/* <div class="d-flex justify-content-between mt-4">
            <Link className="" to="#">Login</Link>
            <Link className="" to="#">Register</Link>
        </div> */}
    </div>
</div>
    </>
  )
}

export default Forgetpassword