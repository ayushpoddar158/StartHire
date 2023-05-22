import React, { useEffect } from "react";
import "../style/studentprofile.css";
import { Link } from "react-router-dom";
import Aside from "./Aside";
import { useState } from "react";
import { AuthContext } from "../Authorizer";

// Data import @Firebase
import { db } from "../Firebase";
import { storage } from "../Firebase";
import {
  query,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const StartUpProfile = (props) => {
  const userData = props.userData.data();

  return (
    <>
      {/* <Dashboard/> */}

      <section class="bg-dark StartUpSection">
        <Link to="/StartUpProfileform">
          <button
            id="stuprofileedit"
            className="btn btn-primary"
          >
            Edit
          </button>
        </Link>
        <div class="">
          <div class="row">
            <div class="col-lg-12 mb-4 mb-sm-5">
              <div class="cardStartUpprofile card-style1 border-0">
                <div class="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7 startup1main">
                  <div class="row align-items-center startup1 ">
                    <div class="col-lg-6 mb-4 mb-lg-0 startUpImgDiv">
                      <img
                        className="StartUpimg"
                        src={userData.PImageUrl}
                        alt="..."
                      />
                    </div>

                    <div className="col-lg-6 px-xl-10 startUpDetails">
                      <div class="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                        <h3 class="h2 text-white mb-0">
                          StartUp Name : {userData.StartUpName}
                        </h3>

                        <span class="text-primary">
                          Founder:{userData.FounderName}
                        </span>
                      </div>
                      <ul class="list-unstyled mb-1-9 StartUpUl">
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Contact no:
                          </span>
                          {userData.ContactNumber}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Email:
                          </span>{" "}
                          {userData.StartUpEmail}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            WebsiteLink:
                          </span>
                          {userData.websiteLink}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Address:
                          </span>
                          {userData.location}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Domain
                          </span>
                          <hr />
                        </li>
                        {userData.domains.map((item) => {
                          return (
                            <>
                              <li class="mb-2 mb-xl-3 display-28">
                                <span class="display-26 text-primary me-2 font-weight-600">
                                  {item.value}
                                </span>
                                <hr />

                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default StartUpProfile;
