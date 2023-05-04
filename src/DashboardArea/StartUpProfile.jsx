import React from "react";
import "../style/studentprofile.css";
import { useNavigate } from "react-router-dom";
import Aside from "./Aside";
const StartUpProfile = () => {
  const navigate = useNavigate();
  const navigateEdit = () => {
    navigate("/StartUpProfileform");
  };
  return (
    <>
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
                          <h3 class="h2 text-white mb-0">Company Nameee</h3>

                          <span class="text-primary">Founder:xyx</span>
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
                        JD
                      </span>

                      <div class="progress-text">
                        <div class="row">
                          <div class="col-6">
                            <div class="card">
                              <div class="card-header">
                                Add Job Description
                              </div>
                              <div class="card-body">
                                {/* <blockquote class="blockquote mb-0"> */}
                                {/* <p>Job Profile</p> */}
                                <label htmlFor="">Job Profile</label>
                                <input type="text" />
                                <br />
                                <label htmlFor="">Job Description</label>
                                <input type="text" />
                                <br />
                                <button>Add</button>

                                {/* </blockquote> */}
                              </div>
                            </div>
                          </div>
                          {/* <div class="col-6 text-end">80%</div> */}
                        </div>
                      </div>



                    </div>
                    <div>
                      <span class="section-title text-primary mb-3 mb-sm-4">
                        WHAT WE DO
                      </span>
                      <p>
                        Many desktop publishing packages and web page
                        editors now use Lorem Ipsum as their default model
                        text, and a search for 'lorem ipsum' will uncover
                        many web sites still in their infancy.
                      </p>
                      <p class="mb-1-9">
                        There are many variations of passages of Lorem
                        Ipsum available, but the majority have suffered
                        alteration in some form, by injected humour.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default StartUpProfile;
