import React, { useEffect } from "react";
import "../style/studentprofile.css";
import { useNavigate } from "react-router-dom";
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
  const [data, setData] = useState();
  const [docRef, setDocRef] = useState();
  const { currentUser } = React.useContext(AuthContext);

  // getting data start
  const [StartUpData, setStartUpData] = useState({
    StartUpName: "",
    StartUpEmail: "",
    location: "",
    FounderName: "",
    ContactNumber: "",
    websiteLink: "",
    linkedInLink: "",
    PImageUrl: null,
    domains: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "startups"),
          where("uid", "==", currentUser.uid)
        );
        const docs = await getDocs(q);
        const doc = docs.docs[0];
        setDocRef(doc);
        setData(doc.data());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentUser]);

  useEffect(() => {
    const loadData = async () => {
      if (currentUser) {
        if (data) {
          if (data.updatedProfile) {
            // console.log(data.details.PImageUrl);
            setStartUpData({
              StartUpName: data.details.StartUpName,
              StartUpEmail: data.details.StartUpEmail,
              location: data.details.location,
              FounderName: data.details.FounderName,
              ContactNumber: data.details.ContactNumber,
              websiteLink: data.details.websiteLink,
              linkedInLink: data.details.linkedInLink,
              PImageUrl: data.details.PImageUrl,
              domains: data.details.domains,
            });
          }
        }
      }
    };
    loadData();
  }, [data]);

  useEffect(() => {
    console.log(StartUpData);
  }, [StartUpData]);

  // getting data end

  const navigate = useNavigate();
  const navigateEdit = () => {
    props.changemenuStartUp();
  };
  return (
    <>
      {/* <Dashboard/> */}
      <div class="col main pt-5 mt-3 StartUpmain">
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
                      <div class="col-lg-6 mb-4 mb-lg-0 startUpImgDiv">
                        <img
                          className="StartUpimg"
                          src={StartUpData.PImageUrl}
                          alt="..."
                        />
                      </div>

                      <div className="col-lg-6 px-xl-10 startUpDetails">
                        <div class="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                          <h3 class="h2 text-white mb-0">
                            StartUp Name : {StartUpData.StartUpName}
                          </h3>

                          <span class="text-primary">
                            Founder:{StartUpData.FounderName}
                          </span>
                        </div>
                        <ul class="list-unstyled mb-1-9">
                          <li class="mb-2 mb-xl-3 display-28">
                            <span class="display-26 text-secondary me-2 font-weight-600">
                              Contact no:
                            </span>
                            {StartUpData.ContactNumber}
                          </li>
                          <li class="mb-2 mb-xl-3 display-28">
                            <span class="display-26 text-secondary me-2 font-weight-600">
                              Email:
                            </span>{" "}
                            {StartUpData.StartUpEmail}
                          </li>
                          <li class="mb-2 mb-xl-3 display-28">
                            <span class="display-26 text-secondary me-2 font-weight-600">
                              WebsiteLink:
                            </span>
                            {StartUpData.websiteLink}
                          </li>
                          <li class="mb-2 mb-xl-3 display-28">
                            <span class="display-26 text-secondary me-2 font-weight-600">
                              Address:
                            </span>
                            {StartUpData.location}
                          </li>
                          <li class="mb-2 mb-xl-3 display-28">
                            <span class="display-26 text-secondary me-2 font-weight-600">
                              Domain
                            </span>
                            <hr />
                          </li>
                          {StartUpData.domains.map((item) => {
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
      </div>
    </>
  );
};

export default StartUpProfile;
