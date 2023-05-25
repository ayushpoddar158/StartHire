import React, { useEffect } from "react";
import "../style/studentprofile.css";
import { Link} from "react-router-dom";
// @import 'const.css'
// import Aside from "./Aside";
import { useState } from "react";
import { AuthContext } from "../Authorizer";
import { Button } from "@mui/material";

const Studentprofile = (props) => {
  var userDataRef = props.userData;
  var userData = userDataRef.data();
  const { currentUser } = React.useContext(AuthContext);
  const [data, setData] = useState();
  const [docRef, setDocRef] = useState();
  const [linkImageUrl, setLinkImageUrl] = useState(null);

  // getting data start
    useEffect(() =>{
      setLinkImageUrl(userData.PImageUrl)
    },[])

  useEffect(() => {
  console.log(userData)
  }, [userData])
  
  // getting data end
  
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
                <div class=" ">
                  <div class="row">
                    <div class="col-lg-12 mb-4 mb-sm-5">
                      <div class="cardStudentprofile card-style1 border-0">
                        <div class="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7 student1main">
                          <div class="row  studentinfo">
                            {/* <div class="col-lg-6 mb-4 mb-lg-0  studentImgDiv">
                              <img className="studentImg" 
                                src={userData.PImageUrl}
                                alt="..."
                              />
                            </div> */}

                            <div className="col-lg-6 px-xl-10 studentDetails">
                              <div class="bg-secondary studentiddiv d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                <h3 class="h2 studentidh3 text-white mb-0">Student Id : {userData.sid}</h3>
                              </div>
                              <br/> 
                              <div class="bg-secondary studentprofnamediv d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                <h3 class="h2 studentprofilenameh3 text-white mb-0">{userData.ProfileName}</h3>
                              </div>
                              <ul class="list-unstyled mb-1-9">
                                <li class="mb-2 mb-xl-3 display-28">
                                  <span class="display-26 text-secondary me-2 font-weight-600">
                                    Contact no:
                                  </span>
                                 {userData.Mobile}
                                </li>
                             
                                <li class="mb-2 mb-xl-3 display-28">
                                  <span class="display-26 text-secondary me-2 font-weight-600">
                                    github:
                                  </span>
                                 {userData.githubLink}
                                </li>
                                <li class="mb-2 mb-xl-3 display-28">
                                  <span class="display-26 text-secondary me-2 font-weight-600">
                                    linkedin:
                                  </span>
                                 {userData.linkedInLink}
                                </li>
                                <li class="mb-2 mb-xl-3 display-28">
                                  <span class="display-26 text-secondary me-2 font-weight-600">
                                    Address:
                                  </span>
                                  {userData.location}
                                </li>
                                <li class="mb-2 mb-xl-3 display-28">
                                  <span class="display-26 text-secondary me-2 font-weight-600">
                                    College:
                                  </span>
                                 {userData.College}
                                </li>
                                <li class="mb-2 mb-xl-3 display-28">
                                  <span class="display-26 text-secondary me-2 font-weight-600">
                                    Degree:
                                  </span>
                                  {userData.Degree}
                                </li>
                                <li class="display-28">
                                  <span class="display-26 text-secondary me-2 font-weight-600">
                                    Year of Passing:
                                  </span>
                                  {userData.YOG}
                                  <li class="mb-2 mb-xl-3 display-28">
                           
                          </li>
                                </li>

                        
                              </ul>
                            
                            </div>
                             <div class="col-lg-6 mb-4 mb-lg-0  studentImgDiviiii">
                            <div className="skillsdivv">
                              <h2>skills</h2>
                            <hr />
                              <div className="skillsbttuns">
                              {userData.skills.map((item) => {
                                  console.log("skill",item);
                            return (
                              <>
                              
                                  <Button  variant="contained" className="btnskill">
                                    {item.value}
                                  </Button>
                                  
                                 
                               
                              </>
                            );
                          })}
                              </div>

                            </div>
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

export default Studentprofile;
