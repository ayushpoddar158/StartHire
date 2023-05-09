import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../style/Forgetpassword.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Authentication setup
import { sendPasswordResetEmail } from "firebase/auth";
import { Auth } from "../Firebase";
import { AuthContext } from '../Authorizer'


const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const getData = (e) => {
        setEmail(e.target.value);
    }

    const sendResetEmail = async () => {
        await sendPasswordResetEmail(Auth, email)
            .then(() => {
                alert("Password Reset link sent to your email");
                navigate("/login");
            }).catch((error) => {
                if (error.code === "auth/user-not-found") {
                    alert("User not found with this email");
                }
            }
            );
    }

    return (
        <>
            <div className="card text-center mx-auto my-5 fino " style={{ width: "450px", height: "300px" }}>
                <div className="card-header h5 text-white bg-danger fino">Password Reset</div>
                <div className="card-body px-5">
                    <p className="card-text py-2">
                        A E-mail with password reset link will be sent to your registered email-ID.
                    </p>
                    <div className="form-outline ">
                        <input type="email" onChange={getData} id="typeEmail" className="form-control my-3 fino" placeholder='demo@123' />
                        {/* <label class="form-label" for="typeEmail">Email input</label> */}
                    </div>
                    <button to="" className="btn btn-danger w-100 p-2" onClick={sendResetEmail}>Send Reset Email</button>
                </div>
            </div>
        </>
    )


}

export default ForgetPassword