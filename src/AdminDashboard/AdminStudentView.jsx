import React, { useEffect } from "react";
import "../style/studentprofile.css";
import { Link, useParams } from "react-router-dom";
// import Aside from "./Aside";
import { useState } from "react";
import { AuthContext } from "../Authorizer";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "../Firebase";

const AdminStudentView = () => {
  var StudentId = useParams().id;
  // var stdDataRef = props.userData;
  // var stdData = userDataRef.data();
  // const { currentUser } = React.useContext(AuthContext);
  const [stdData, setStdData] = useState();
  const [startUpData, setStartUpData] = useState([]);
  // const [docRef, setDocRef] = useState();
  // const [linkImageUrl, setLinkImageUrl] = useState(null);

  // // getting data start
  useEffect(() => {
    const loadStdData = async (id) => {
      const q = doc(db, "users", id)
      await getDoc(q)
        .then((data) => {
          setStdData(data);
        }).catch((err) => {
          console.log("error finding the student data", err)
        });
    }
    loadStdData(StudentId);
  }, [])

  useEffect(() => {
    stdData?.data().startups.forEach(startupid=> {
      const loadStartUpData = async (id) => {
        const q = doc(db, "startups", id)
        await getDoc(q)
          .then((data) => {
            setStartUpData(startUpName => [...startUpName, data?.data().name]);
          }).catch((err) => {
            console.log("error finding the student data", err)
          });
      }
      loadStartUpData(startupid);
    });
  }, [stdData])

  // // getting data end

  return (
    <>

      <section class="bg-light studentmaindiv2">
        <Link to="/studentprofileform">
          <button
            id="studentrofileedit"
            className="btn btn-primary"
          >
            Edit
          </button>
        </Link>
        <div class="container ">
          <div class="row">
            <div class="col-lg-12 mb-4 mb-sm-5">
              <div class="cardStudentprofile card-style1 border-0">
                <div class="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7 student1main">
                  <div class="row align-items-center">
                    <div class="col-lg-6 mb-4 mb-lg-0  studentImgDiv">
                      {/* <img className="studentImg"
                        src={stdData?.data().PImageUrl}***
                        alt="..."
                      /> */}
                    </div>

                    <div className="col-lg-6 px-xl-10 studentDetails">
                      <div class="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                        <h3 class="h2 text-white mb-0">{stdData?.data().firstName + " " + stdData?.data().lastName}</h3>
                      </div>
                      <ul class="list-unstyled mb-1-9">
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Contact no:
                          </span>
                          {stdData?.data().Mobile}
                        </li>

                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            github:
                          </span>
                          {stdData?.data().githubLink}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            linkedin:
                          </span>
                          {stdData?.data().linkedInLink}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Address:
                          </span>
                          {stdData?.data().location}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            College:
                          </span>
                          {stdData?.data().College}
                        </li>
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Degree:
                          </span>
                          {stdData?.data().Degree}
                        </li>
                        <li class="display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Year of Passing:
                          </span>
                          {stdData?.data().YOG}
                          <li class="mb-2 mb-xl-3 display-28">
                            <span class="display-26 text-secondary me-2 font-weight-600">
                              Skills
                            </span>
                            <hr />
                          </li>
                        </li>

                        {stdData?.data().skills.map((item) => {
                          console.log("skill", item);
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
                        <li class="mb-2 mb-xl-3 display-28">
                          <span class="display-26 text-secondary me-2 font-weight-600">
                            Start-Ups Selected
                          </span>
                          <hr />
                        </li>
                        {startUpData.length === 0 ? <h3>None</h3> : startUpData?.map((item) => {
                          return (
                            <>
                              <li class="mb-2 mb-xl-3 display-28">
                                <span class="display-26 text-primary me-2 font-weight-600">
                                  {item}
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

export default AdminStudentView;
