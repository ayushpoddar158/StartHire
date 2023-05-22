// Authentication @Firebase 
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Auth } from "../Firebase";

// fontawesome icon imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndustry } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";


// Data import @Firebase
import { db } from "../Firebase";
import {
  query,
  getDocs,
  collection,
  addDoc,
  where,
  serverTimestamp
} from "firebase/firestore";


import React, { useState, useEffect, useContext } from 'react'
import Signup1 from "../assets/signup1.jpg"
import { Link, useNavigate } from 'react-router-dom'
import '../style/SignUp.css'

const Signupstartup = (props) => {
  const navigate = useNavigate();
  const startupSignUpOpen = props.startupSignUpOpen;

  useEffect(() => {
    console.log("openBool", startupSignUpOpen)
  }, [startupSignUpOpen])

  const [inpVal, setInpVal] = useState({
    sName: "",
    sEmail: "",
    password: "",
    repeatpassword: ""
  })
  const getdata = (e) => {
    // console.log(e.target.value)

    const { value, name } = e.target;
    // console.log(value,name)

    setInpVal(() => {
      return {
        ...inpVal,
        [name]: value


      }
    });
  }
  const formSubmitHandler = async (e) => {
    console.log("submit working")
    e.preventDefault();
    // console.log(inpVal)
    const { sName, sEmail, password, repeatpassword } = inpVal;

    if (sName === "") {
      alert("name field is required")
    } else if (sEmail === "") {
      alert("email field is required")
    } else if (!sEmail.includes("@")) {
      alert("please eneter valid email")
    } else if (password === "") {
      alert("password field is required")
    } else if (password.length < 5) {
      alert("password length should be greater than five")
    }
    else if (password != repeatpassword) {
      alert("password and repeatpaswod should be same")
    }
    else {
      await createUserWithEmailAndPassword(Auth, sEmail, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          // console.log(Auth.currentUser);
          await sendEmailVerification(Auth.currentUser)
            .then(async () => {
              console.log("Verification Email Sent");
              var noteRef = await addDoc(collection(db, "notification"), {
                senderId: "admin",
                senderName: "admin",
                recieiverId: Auth.currentUser.uid,
                message: "Welcome to Start Hire",
                sentTime: serverTimestamp(),
                isRead: false
              })
              var addNotif = async () => {
                await addDoc(collection(db, "startups"), {
                  uid: user.uid,
                  name: sName,
                  authProvider: "email",
                  email: sEmail,
                  desgn: "startup",
                  updatedProfile: false,
                  StartUpName: "",
                  StartUpEmail: "",
                  location: "",
                  FounderName: "",
                  ContactNumber: "",
                  websiteLink: "",
                  linkedInLink: "",
                  PImageUrl: null,
                  domains: [],
                  jobs: [],
                  notification: [noteRef.id],
                  verification: {
                    isVerified: false,
                  }
                })
                  .then(() => {
                    console.log("insdie the add notif setup")
                  })
                  .catch((err) => {
                    console.log('inside error function');
                    console.log(err);
                  });
              }
              await addNotif()
                .then(async () => {
                  alert("Verify Your Email");
                  await Auth.signOut()
                    .then(() => {
                      window.location.replace("/loginstartup");
                    })
                })
            })

            .catch((error) => {
              console.log("There is an error !!")
              console.log(error)
              // An error happened.
            });
        });
    }
  }


  return (
    <>
      <div className="signupmaindiv">


        <section className="sign1maini " id='' >
          <div className="" id='Signupchangediv'>
            {/* <!-- Pills navs --> */}
            <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
              <li class="nav-item" role="presentation">
                <Link class="nav-link  Signupchangebtn1" id="tab-login" data-mdb-toggle="pill" to="/Signup" role="tab"
                  aria-controls="pills-login" aria-selected="true">Student Signup</Link>
              </li>
              <li class="nav-item Signupchangebtn2" role="presentation">
                <Link class="nav-link active signupbtncolor" id="tab-register" data-mdb-toggle="pill" to="/signupstartup" role="tab"
                  aria-controls="pills-register" aria-selected="false">Startup Signup</Link>
              </li>
            </ul>
            {/* <!-- Pills navs --> */}
          </div>
          {startupSignUpOpen ?
            <section className="  signupcardinfo" id='sign1main' >
              <div className="">
                <div className="d-flex justify-content-center align-items-center ">
                  <div className="col-lg-12 col-xl-11">
                    <div id='signup1card' className="signupcardinfo text-black" >
                      <div className="card-body p-md-5">
                        <div className="row justify-content-center">
                          <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up as StartUp</p>

                            <form className="mx-1 mx-md-4" >


                              <div className="d-flex flex-row align-items-center mb-4">
                                <div className="StartUpsignupicondiv">
                                  <FontAwesomeIcon icon={faIndustry} size="lg" />
                                </div>
                                <div className="form-outline flex-fill mb-0">
                                  <input type="text" name="sName" id="form3Example1c" onChange={getdata} className="form-control" />
                                  <label className="form-label" HtmlFor="form3Example1c">StartUp Name</label>
                                </div>
                              </div>

                              <div className="d-flex flex-row align-items-center mb-4">
                                <div className="StartUpsignupicondiv">
                                  <FontAwesomeIcon
                                    icon={faEnvelope}
                                    size="lg"
                                  />
                                </div>
                                <div className="form-outline flex-fill mb-0">
                                  <input type="email" id="form3Example3c" name="sEmail" onChange={getdata} className="form-control" />
                                  <label className="form-label" HtmlFor="form3Example3c">StartUp Official Email</label>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <div className="StartUpsignupicondiv">
                                  <FontAwesomeIcon icon={faLock} size="lg" />
                                </div>
                                <div className="form-outline flex-fill mb-0">
                                  <input type="password" id="form3Example4c" name="password" onChange={getdata} className="form-control" />
                                  <label className="form-label" HtmlFor="form3Example4c">Password</label>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <div className="StartUpsignupicondiv">
                                  <FontAwesomeIcon icon={faLock} size="lg" />
                                </div>
                                <div className="form-outline flex-fill mb-0">
                                  <input type="password" id="form3Example4cd" name="repeatpassword" onChange={getdata} className="form-control" />
                                  <label className="form-label" HtmlFor="form3Example4cd">Repeat your password</label>
                                </div>
                              </div>
                              {/* <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label className="form-check-label" HtmlFor="form2Example3">
                      I agree all statements in <Link to="#!">Terms of service</Link>
                    </label>
                  </div> */}

                              <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button type="button" className="btn btn-primary btn-lg" onClick={formSubmitHandler}>Register</button>
                              </div>

                            </form>

                          </div>
                          <div className=" float-area col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                              className="floating-img img-fluid" alt="Sample image" />

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            : <h1>StartUp Registration is closed !</h1>
          }
        </section>
      </div>
    </>
  )
}

export default Signupstartup