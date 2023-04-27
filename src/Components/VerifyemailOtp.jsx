import React from 'react'
import '../style/VerifyemailOtp.css'
import { useState } from 'react'
import  { useNavigate}    from 'react-router-dom'




const VerifyemailOtp = ({generateotp,setGenerateotp,uniqueId,setUniqueId}) => {
 

// otp usetatte 
const [otpnum,setotpnum]=useState({
  otp1:"",
  otp2:"",
  otp3:"",
  otp4:""

})

const getdata=(e)=>{
  // setotpnum
  const {value,name}=e.target;


  
  setotpnum(()=>{
    return {
       ...otpnum,
       [name]:value
  

    }
  })
}

let navigate=useNavigate()
const navigatetochanpassword=(e)=>{
  e.preventDefault()

  // console.log(otpnum)
  // console.log(otpnum.otp1)
  let otpstring=""
 otpstring=otpnum.otp1+otpnum.otp2+otpnum.otp3+otpnum.otp4
if(otpstring===generateotp.toString()){
  // console.log("good")
  navigate('/ChangePassword')
}
else{
  alert("otp dosent matched")
}
  // console.log(otpstring)

}  
  return (
    <>
        <div class="d-flex justify-content-center align-items-center container">
        <div class="cardotp py-5 px-3">
            <h5 class="m-0">Email  verification</h5><span class="mobile-text">Enter the code we just send to your email <b class="text-danger">{uniqueId}</b></span>
            <div class="d-flex flex-row mt-5"><input onChange={getdata} type="text" name='otp1' class="form-control otpbox" autoFocus=""/><input 
             name='otp2'  onChange={getdata}    type="text" class="form-control otpbox"/><input name='otp3' onChange={getdata}  type="text" class="form-control otpbox"/><input name='otp4' onChange={getdata}  type="text" class="form-control otpbox"/></div>
            <div className="container mx-auto">
            <button onClick={navigatetochanpassword} className='btn bg-danger   w-100 text-light'>Verify Email</button>
            </div>
            <div class="text-center mt-5"><span class="d-block mobile-text">Don't receive the code?</span><span class="font-weight-bold text-danger cursor">Resend</span></div>
        </div>
    </div>
    </>
  )
}

export default VerifyemailOtp