import { db } from "../Firebase";
import {
  query,
  getDocs,
  collection,
  addDoc,
  getDoc,
  updateDoc,
  where,
  doc
} from "firebase/firestore";

import React from "react";
import { Button } from "@material-ui/core";
import { TextField } from "@mui/material";
import "./css/JobDescp.css";
import { useState } from "react";
import { useEffect } from "react";

const JobDescp = (id) => {
  let [jobData, setJobData] = useState();
  console.log(id)
  useEffect(() => {
    const loadJob = async (id) => {
      console.log(id)
      let jobRef = doc(db, "jobs", id);
      const jobVal = await getDoc(jobRef);
      console.log(jobVal);
      setJobData(jobVal);
    }
    loadJob(id);
  }, [])

  useEffect(() => {
    console.log(jobData);
  }, [jobData])


  return (
    <>
      <div className="container main">
        <div className="title onediv firstDiv">
          <h2 id="heading1">{jobData?.data.details.jobTitle}</h2>
          <Button variant="contained">Update</Button>
          <hr />
        </div>
        <div className="description onediv">
          <h2>Job Description</h2>
          <hr />
          <p>
            {jobData?.data.details.jobDescription}
          </p>
        </div>
        <div className="skills"></div>
        <h2>Skills Required</h2>
        <hr />
        <div className="tags">
          {jobData?.data.skills.map((item) => {
            return <Button className="Skillreq" variant="contained">
              {item.value}
            </Button>
          })}
        </div>
        {/* <hr /> */}
        <div className="suggestStudent">
          <Button variant="contained">Suggest Interns</Button>
        </div>
        <div className="studentList">
          <div className="stdlistmian2_1 firstdivig">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
              alt="avatar 1"
              style={{ width: "45px", height: "auto" }}
            />
            <div class="ms-2">Alexa Chung</div>
            <div class="ms-2">Alex@gmail.com</div>
          </div>
          <div className=" skillmaindiv">
            <div className="conatainer skilltextdiv">
              <h3>Skills</h3>
            </div>
            <div className="skillbtn">
              <Button variant="contained" className=" skillbtns ms-2">
                C
              </Button>
              <Button variant="contained" className=" skillbtns ms-2">
                Java
              </Button>
              <Button variant="contained" className=" skillbtns ms-2">
                Python
              </Button>
            </div>
          </div>
          <div className="stdlistmian2_1">
            <Button className="viewbtn" variant="contained">
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDescp;
