import React from 'react'
import '../style/VerifyEmail.css'
const VerifyEmail = () => {
  return (
   <>
    <div class="row VerifyBox">
    <div class="col-md-12">
        
        <h1 className='Verifyh2'>You will recieve a verification link on your mail after you registered.
        <br /> Click that link to verify.</h1>
       <div class="main-verification-input-wrap">
         <ul>
        <li>If somehow, you did not recieve the verification email then</li>
      </ul>
        <div class="main-verification-input fl-wrap">
           <button class="main-verification-button">Resend The Verification Email</button>
           </div>
       </div>
    </div>
  </div>

   </>
  )
}

export default VerifyEmail