// Authentication @Firebase
import { Auth } from "../../Firebase";
import { AuthContext } from "../../Authorizer";
import { useEffect } from "react";
import { Box } from "@mui/material";
import Select from "react-select";
import './createJobs.css';
// Data import @Firebase
import { db } from "../../Firebase";
import { storage } from "../../Firebase";
import {
  query,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  where,
  arrayUnion,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { render } from "react-dom";
import { Codinglanginfo } from "../Codinglanginfo";
import { WithContext as ReactTags } from "react-tag-input";
import "../../style/Studentprofileform.css";
import StudentLists from "../../DashboardArea/StudentLists";
import Aside from "../../DashboardArea/Aside";
import { TextField } from "@material-ui/core";
import { useContext } from "react";

const suggestions = Codinglanginfo.map((country) => {
  return {
    id: country,
    text: country,
  };
});

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const CreateJobs = (props) => {
  var userDataRef = props.userData;
  const { currentUser } = useContext(AuthContext);
  const [jobData, setJobData] = useState();

  useEffect(() => {
    const loadData = async () => {
      setJobData({
        jobTitle: "",
        jobDescription: "",
        jobLocation: "",
        skills: [],
      });
    };
    loadData();
  }, [currentUser]);

  const getData = (e) => {
    const { value, name } = e.target;
    setJobData(() => {
      return {
        ...jobData,
        [name]: value,
      };
    });
  };

  // tag functions

  const handleAddition = (tag) => {
    console.log(tag);
    console.log("changes");
    setJobData(() => {
      return {
        ...jobData,
        ["skills"]: tag,
      };
    });
    console.log(jobData);
  };
  // tag functions end

  const userDataUpdate = async (docRef, jobRef) => {
    await updateDoc(docRef.ref, {
      jobs: arrayUnion(jobRef.id),
    })
      .then(() => {
        console.log("updatedUserData");
      })
      .catch((error) => {
        console.log("Error updating document: ", error);
      });
  };

  const updateDocument = async () => {
    if (jobData.jobTitle === "") {
      alert("Please enter job title");
    } else if (jobData.jobDescription === "") {
      alert("Please enter job Description");
    } else if (jobData.jobLocation === "") {
      alert("Please enter job location");
    } else if (jobData.skills.length === 0) {
      alert("Please enter atlease one skill required for the job");
    } else {
      try {
        const jobRef = await addDoc(collection(db, "jobs"), {
          creator: userDataRef.id,
          details: jobData,
          assign: [],
        });
        console.log(jobRef.id); // log the document id
        alert("Information successfully updated!");
        await userDataUpdate(userDataRef, jobRef);
      } catch (error) {
        console.log("Error updating document: ", error);
      }
    }
  };

  const submitHandler = async () => {
    console.log("inside submit handler");
    try {
      await updateDocument().then(() => {
        window.location.replace("/jobs");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div class="container bootstrap snippet" id="studentformmain">
        <div class="row mt-2 CreateJobInnercard">
          <div class="col-sm-9">
            <div class="tab-content">
              <div class="tab-pane active" id="home">
                <hr />
                <form
                  class="form"
                  onSubmit={submitHandler}
                  id="registrationForm"
                >
                  <div className="container maindivstudent">
                    <div class="form-group ">
                      <div class="col-xs-12">
                        <label className="firstnamecls" for="first_name">
                          <h3>Job Title</h3>
                        </label>
                        <TextField
                          type="text"
                          onChange={getData}
                          class="form-control"
                          required
                          name="jobTitle"
                          id="first_name"
                          placeholder="Job Title"
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-xs-12">
                        <label for="last_name">
                          <h3>Job Description</h3>
                        </label>
                        <TextField
                          type="text"
                          onChange={getData}
                          class="form-control"
                          name="jobDescription"
                          id="last_name"
                          placeholder="Job Description"
                          title="enter your last name if any."
                          required
                        />
                      </div>
                    </div>

                    <div class="form-group">
                      <div class="col-xs-12">
                        <label for="location">
                          <h3>Location</h3>
                        </label>
                        <TextField
                          type="text"
                          onChange={getData}
                          name="jobLocation"
                          class="form-control"
                          required
                          id="location"
                          placeholder="Job Location"
                          title="enter a location"
                        />
                      </div>
                    </div>
                    <div class="form-group"></div>

                    <div class="form-group selectDiv">
                      <div class="col-xs-12 YearOf">
                        <label for="YOG">
                          <h3>Required Skills</h3>
                        </label>
                        <Select
                          onChange={handleAddition}
                          isMulti
                          name="colors"
                          options={Codinglanginfo}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          placeholder="Enter Your Skills"
                          value={jobData?.skills}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-xs-12">
                        <br />
                        <button
                          class="btn btn-lg createjobssavebtn"
                          onClick={submitHandler}
                          type="button"
                        >
                         
                          Create Job
                        </button>
                        {/* <button class="btn btn-lg" type="reset"><i class="glyphicon glyphicon-repeat"></i> Reset</button> */}
                      </div>
                    </div>
                  </div>
                </form>

                <hr />
              </div>
            </div>
            {/* <!--/tab-pane--> */}
          </div>
          {/* <!--/tab-content--> */}
        </div>
        {/* <!--/col-9--> */}
      </div>
      {/* <!--/row--> */}
    </>
  );
};

export default CreateJobs;
