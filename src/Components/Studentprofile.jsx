import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
// Authentication Setup
import { AuthContext } from '../Authorizer';


// Data setup 
import { db } from "../Firebase";
import {
    query,
    getDocs,
    collection,
    addDoc,
    where
} from "firebase/firestore";



import "../style/studentprofile.css";
import { useNavigate } from "react-router-dom";
import Aside from "../DashboardArea/Aside";




const Studentprofile = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [id, setId] = useState(null);
  const [isVerified, setIsVerified] = useState(null);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const getUserData = async () => {
    let id = await currentUser.uid;
    let isVerified = await currentUser.emailVerified;
    setId(id)
    setIsVerified(isVerified);
    const q = query(collection(db, "users"), where("uid", "==", id));
    const docs = await getDocs(q);
    setUserData(docs.docs[0].data());
  }
  getUserData();

  const navigateEdit = () => {
    navigate("/Studentprofileform");
  };
  while (currentUser) {
    if (!isVerified) {
      navigate("/VerifyEmail");
    }
    else {
      return (
        <>
          <div>
            <div class="container-fluid" id="main">
              <div class="row row-offcanvas row-offcanvas-left">
                <Aside />
                {/* <Dashboard/> */}
                <div class="col main pt-5 mt-3">
                  <section class="bg-light">
                    <button
                      id="stuprofileedit"
                      onClick={navigateEdit}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                    <div class="container">
                      <div class="row">
                        <div class="col-lg-12 mb-4 mb-sm-5">
                          <div class="card card-style1 border-0">
                            <div class="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                              <div class="row align-items-center">
                                <div class="col-lg-6 mb-4 mb-lg-0">
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                    alt="..."
                                  />
                                </div>

                                <div class="col-lg-6 px-xl-10">
                                  <div class="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                    <h3 class="h2 text-white mb-0">Name lastname</h3>

                                    <span class="text-primary">Web Developer</span>
                                  </div>
                                  <ul class="list-unstyled mb-1-9">
                                    <li class="mb-2 mb-xl-3 display-28">
                                      <span class="display-26 text-secondary me-2 font-weight-600">
                                        Contact no:
                                      </span>
                                      123456789
                                    </li>
                                    <li class="mb-2 mb-xl-3 display-28">
                                      <span class="display-26 text-secondary me-2 font-weight-600">
                                        Email:
                                      </span>{" "}
                                      edith@mail.com
                                    </li>
                                    <li class="mb-2 mb-xl-3 display-28">
                                      <span class="display-26 text-secondary me-2 font-weight-600">
                                        github:
                                      </span>
                                      xyx@git
                                    </li>
                                    <li class="mb-2 mb-xl-3 display-28">
                                      <span class="display-26 text-secondary me-2 font-weight-600">
                                        Address:
                                      </span>
                                      Bhabaneshwar
                                    </li>
                                    <li class="mb-2 mb-xl-3 display-28">
                                      <span class="display-26 text-secondary me-2 font-weight-600">
                                        College:
                                      </span>
                                      Nalanda Institute of technology
                                    </li>
                                    <li class="mb-2 mb-xl-3 display-28">
                                      <span class="display-26 text-secondary me-2 font-weight-600">
                                        Degree:
                                      </span>
                                      B-Tech
                                    </li>
                                    <li class="display-28">
                                      <span class="display-26 text-secondary me-2 font-weight-600">
                                        Year of Passing:
                                      </span>
                                      2023
                                    </li>
                                  </ul>
                                  <ul class="social-icon-style1 list-unstyled mb-0 ps-0">
                                    <li>
                                      <a href="#!">
                                        <i class="ti-twitter-alt"></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#!">
                                        <i class="ti-facebook"></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#!">
                                        <i class="ti-pinterest"></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#!">
                                        <i class="ti-instagram"></i>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="col-lg-12">
                          <div class="row">
                            <div class="col-lg-12 mb-4 mb-sm-5">
                              <div class="mb-4 mb-sm-5">
                                <span class="section-title text-primary mb-3 mb-sm-4">
                                  Skill
                                </span>
                                <div class="progress-text">
                                  <div class="row">
                                    <div class="col-6">C</div>
                                    {/* <div class="col-6 text-end">80%</div> */}
                                  </div>
                                </div>
                                <hr />
                                {/* <div class="custom-progress progress progress-medium mb-3" style={{height: "4px"}}>
                                <div class="animated custom-bar progress-bar slideInLeft bg-secondary" style={{width:"80%"}} aria-valuemax="100" aria-valuemin="0" aria-valuenow="10" role="progressbar"></div>
                            </div> */}
                                <div class="progress-text">
                                  <div class="row">
                                    <div class="col-6">JAVA</div>
                                    {/* <div class="col-6 text-end">90%</div> */}
                                  </div>
                                </div>
                                <hr />
                                {/* <div class="custom-progress progress progress-medium mb-3" style={{height: "4px"}}>
                                <div class="animated custom-bar progress-bar slideInLeft bg-secondary" style={{width:"90%"}} aria-valuemax="100" aria-valuemin="0" aria-valuenow="70" role="progressbar"></div>
                            </div> */}
                                <div class="progress-text">
                                  <div class="row">
                                    <div class="col-6">PYTHON</div>
                                    {/* <div class="col-6 text-end">50%</div> */}
                                  </div>
                                </div>
                                <hr />
                                {/* <div class="custom-progress progress progress-medium mb-3"style={{height: "4px"}}>
                                <div class="animated custom-bar progress-bar slideInLeft bg-secondary" style={{width:"50%"}} aria-valuemax="100" aria-valuemin="0" aria-valuenow="70" role="progressbar"></div>
                            </div> */}
                                <div class="progress-text">
                                  <div class="row">
                                    <div class="col-6">React</div>
                                    {/* <div class="col-6 text-end">60%</div> */}
                                  </div>
                                </div>
                                <hr />
                                {/* <div class="custom-progress progress progress-medium" style={{height: "4px"}}>
                                <div class="animated custom-bar progress-bar slideInLeft bg-secondary" style={{width:"60%"}} aria-valuemax="100" aria-valuemin="0" aria-valuenow="70" role="progressbar"></div>
                            </div> */}
                              </div>
                              <div>
                                <span class="section-title text-primary mb-3 mb-sm-4">
                                  Education
                                </span>
                                <p>
                                  Many desktop publishing packages and web page
                                  editors now use Lorem Ipsum as their default model
                                  text, and a search for 'lorem ipsum' will uncover
                                  many web sites still in their infancy.
                                </p>
                                <p class="mb-1-9">
                                  There are many variations of passages of Lorem Ipsum
                                  available, but the majority have suffered alteration
                                  in some form, by injected humour.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

};

export default Studentprofile;
