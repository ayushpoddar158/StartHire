import React, { useEffect } from "react";
import "../style/studentprofile.css";
import { useNavigate } from "react-router-dom";
// import Aside from "./Aside";
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
  where
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes
} from "firebase/storage";

const Studentprofile = (props) => {
  const { currentUser } = React.useContext(AuthContext);
  const [data, setData] = useState();
  const [docRef, setDocRef] = useState();
  const [linkImageUrl, setLinkImageUrl] = useState(null);

  // getting data start
  const [StudentData, setStudentData] = useState(
    {
      firstname: "",
      lastname: "",
      mobile: "",
      location: "",
      collname: "",
      degree: "",
      YOG: "",
      githubLink: "",
      linkedInLink: "",
      PImageUrl: null,
      skills: []

    }
  )



  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", currentUser.uid));
        const docs = await getDocs(q);
        const doc = docs.docs[0];
        setDocRef(doc);
        setData(doc.data());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentUser])

  useEffect(() => {
    const loadData = async () => {
      if (currentUser) {
        if (data) {
          if (data.updatedProfile) {
            // console.log(data.details.PImageUrl);
            setStudentData({
              firstname: data.details.firstname,
              lastname: data.details.lastname,
              mobile: data.details.mobile,
              location: data.details.location,
              collname: data.details.collname,
              degree: data.details.degree,
              YOG: data.details.YOG,
              githubLink: data.details.githubLink,
              linkedInLink: data.details.linkedInLink,
              PImageUrl: data.details.PImageUrl,
              skills: data.details.skills,
            });
            setLinkImageUrl(data.details.PImageUrl);
          }
        }
      }
    };
    loadData();
  }, [data]);

  useEffect(() => {
  console.log(StudentData)
  }, [StudentData])
  
  // getting data end

  const navigate = useNavigate();
  const navigateEdit = () => {
    props.changemenufun();
  };
  return (
    <>
      <div>
        <div class="container-fluid" id="StudentUpmain">
          <div class="row row-offcanvas row-offcanvas-left">
            {/* <StudentAside /> */}
            {/* <Dashboard/> */}
            <div class="col main pt-5 mt-3  StudentDivSectionabv">
              <section class="bg-light studentmaindiv2">
                <button
                  id="studentrofileedit"
                  onClick={navigateEdit}
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <div class="container ">
                  <div class="row">
                    <div class="col-lg-12 mb-4 mb-sm-5">
                      <div class="cardStudentprofile card-style1 border-0">
                        <div class="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                          <div class="row align-items-center">
                            <div class="col-lg-6 mb-4 mb-lg-0  studentImgDiv">
                              <img className="studentImg" 
                                src={StudentData.PImageUrl}
                                alt="..."
                              />
                            </div>

                            <div className="col-lg-6 px-xl-10 studentDetails">
                              <div class="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                <h3 class="h2 text-white mb-0">{StudentData.firstname} {StudentData.lastname}</h3>

                              </div>
                              <ul class="list-unstyled mb-1-9">
                                <li class="mb-2 mb-xl-3 display-28">
                                  <span class="display-26 text-secondary me-2 font-weight-600">
                                    Contact no:
                                  </span>
                                 {StudentData.mobile}
                                </li>
                             
                                <li class="mb-2 mb-xl-3 display-28">
                                  <span class="display-26 text-secondary me-2 font-weight-600">
                                    github:
                                  </span>
                                 {StudentData.githubLink}
                                </li>
                                <li class="mb-2 mb-xl-3 display-28">
                                  <span class="display-26 text-secondary me-2 font-weight-600">
                                    linkedin:
                                  </span>
                                 {StudentData.linkedInLink}
                                </li>
                                <li class="mb-2 mb-xl-3 display-28">
                                  <span class="display-26 text-secondary me-2 font-weight-600">
                                    Address:
                                  </span>
                                  {StudentData.location}
                                </li>
                                <li class="mb-2 mb-xl-3 display-28">
                                  <span class="display-26 text-secondary me-2 font-weight-600">
                                    College:
                                  </span>
                                 {StudentData.collname}
                                </li>
                                <li class="mb-2 mb-xl-3 display-28">
                                  <span class="display-26 text-secondary me-2 font-weight-600">
                                    Degree:
                                  </span>
                                  {StudentData.degree}
                                </li>
                                <li class="display-28">
                                  <span class="display-26 text-secondary me-2 font-weight-600">
                                    Year of Passing:
                                  </span>
                                  {StudentData.YOG}
                                  <li class="mb-2 mb-xl-3 display-28">
                            <span class="display-26 text-secondary me-2 font-weight-600">
                              Skills
                            </span>
                            <hr />
                          </li>
                                </li>

                                {StudentData.skills.map((item) => {
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Studentprofile;
