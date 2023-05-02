// Authentication @Firebase 
import { sendEmailVerification } from "firebase/auth";
import { Auth } from "../Firebase";
import { AuthContext } from "../Authorizer";

// Data import @Firebase
import { db } from "../Firebase";
import {
  query,
  getDocs,
  collection,
  addDoc,
  where
} from "firebase/firestore";

import React, { useContext, useEffect } from 'react'
import '../style/VerifyEmail.css'
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const currentUser = useContext(AuthContext);
  const [id, setId] = React.useState(true);
  const [isVerified, setIsVerified] = React.useState(true);
  const navigate = useNavigate();


  const getUserData = async () => {
    let id = await currentUser.uid;
    let isVerified = await currentUser.emailVerified;
    setId(id)
    setIsVerified(isVerified);
    const qUser = query(collection(db, "users"), where("uid", "==", id));
    const docsUser = await getDocs(qUser)
      .then(() => {
        if (docsUser.docs.length > 0) {
          setIsUser(true);
        }
        else {
          setIsStartup(false);
        }
      })
  }


  useEffect(() => {
    getUserData();
  }, [currentUser]);

  const handleVerify = async () => {
    await sendEmailVerification(Auth.currentUser)
      .then(() => {
        alert("Verification Email Sent");
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  if (currentUser) {
    if (isVerified) {
      return (
        <>
          <div className="row VerifyBox">
            <div className="col-md-12">
              <h1 className='Verifyh2'>You have already verified your email.</h1>
            </div>
            <div className="main-verification-input fl-wrap">
              <button className="main-verification-button" onClick={()=>{
                navigate("/dashboard");
              }}>Redirect To Dashboard</button>
            </div>
          </div>
        </>
      );
    }
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
                <button className="main-verification-button" onClick={handleVerify}>Resend The Verification Email</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );

  }


}

export default VerifyEmail