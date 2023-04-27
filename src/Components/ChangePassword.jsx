import React, { useState } from 'react'
import '../style/ChangePassword.css'
import  { useNavigate}    from 'react-router-dom'






const ChangePassword = ({uniqueId,setUniqueId}) => {

const navigate=useNavigate()


  
const [inpPassword,setInpPassword]=useState({
    password:"",
    ConfirmPassword:""
})

const getData=(e)=>{
    const {value,name}=e.target;
    // console.log(value)
  
  
  
    setInpPassword(()=>{
      return {
         ...inpPassword,
         [name]:value
    
  
      }
    })

}

const ChangePasswordfun=(e)=>{
e.preventDefault()

    if(inpPassword.password.length<5){
        alert("password length must be greater than 5")
        
    }
    else if(inpPassword.password!=inpPassword.ConfirmPassword){
        alert("password and confirm password must be same")
    }
    else{
        alert("password change successfully")
        navigate('/Login')
    }
    
     

  
}
  return (
    <>
         <div className="changepassmain mx-auto my-5">
                    <span class="anchor" id="formChangePassword"></span>
                    {/* <hr class="mb-5"/> */}

                    {/* <!-- form card change password --> */}
                    <div class="card card-outline-secondary">
                        <div class="card-header">
                            <h3 class="mb-0">Change Password </h3>
                        </div>
                        <div class="card-body">
                            <form class="form" role="form" autocomplete="off">
                                
                                <div class="form-group">
                                    <label for="inputPasswordNew">New Password</label>
                                    <input type="password" name='password' onChange={getData} class="form-control" id="inputPasswordNew" required=""/>
                                    <span class="form-text small text-muted">
                                            The password must be 8-20 characters, and must <em>not</em> contain spaces.
                                        </span>
                                </div>
                                <div class="form-group">
                                    <label for="inputPasswordNewVerify">confirm</label>
                                    <input type="password" name='ConfirmPassword' onChange={getData} class="form-control" id="inputPasswordNewVerify" required=""/>
                                    <span class="form-text small text-muted">
                                            To confirm, type the new password again.
                                        </span>
                                </div>
                                <div class="form-group">
                                    <button type="submit" onClick={ChangePasswordfun} className="btn btn-success btn-lg float-right w-100">Change Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* <!-- /form card change password --> */}

                </div>
    </>
  )
}

export default ChangePassword