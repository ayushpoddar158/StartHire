import React from 'react'
import '../style/VerifyEmail.css'
const VerifyEmail = () => {
  return (
   <>
    <div className="row VerifyBox">
    <div className="col-md-12">
        
        <h1 className='Verifyh2'>You will recieve a verification link on your mail after you registered.
        <br /> Click that link to verify.</h1>
       <div className="main-verification-input-wrap">
         <ul>
        <li>If somehow, you did not recieve the verification email then</li>
      </ul>
        <div className="main-verification-input fl-wrap">
           <button className="main-verification-button">Resend The Verification Email</button>
           </div>
       </div>
    </div>
  </div>

   </>
  )
}

export default VerifyEmail