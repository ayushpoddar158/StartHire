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
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const JobDescp = () => {
  let [jobData, setJobData] = useState();
  let [jobDataRef, setJobDataRef] = useState();
  let [selStudent, setSelStudent] = useState([]);
  let [jobSkillList, setJobSkillList] = useState([]);
  let [assignedStudents, setAssignedStudents] = useState([]);
  let [selectedStudents, setSelectedStudents] = useState([]);

  const id = useParams().id;
  // console.log(id)
  useEffect(() => {
    const loadJob = async (id) => {
      let jobRef = doc(db, "jobs", id);
      setJobDataRef(jobRef);
      const jobVal = await getDoc(jobRef);
      // console.log(jobVal.data());
      setJobData(jobVal.data());
      setAssignedStudents(jobVal.data().assign)
    }
    loadJob(id);
  }, [])

  useEffect(() => {
    jobData?.details.skills.map((item) => {
      setJobSkillList(jobSkillList => [...jobSkillList,
      item.label])
    })
  }, [jobData])

  useEffect(() => {
    console.log("jobskills", jobSkillList)
  }, [jobSkillList])

  useEffect(() => {
    console.log(jobData);
  }, [jobData])

  const SuggestFunc = async () => {
    const getPer = (studentSkills, JobSkills) => {
      var count = 0;
      studentSkills?.map((skill => {
        // console.log("indiv skills",skill.label) 
        if (JobSkills.includes(skill.label)) {
          count = count + 1;
        }
      }))
      return (count / JobSkills.length)
    }

    const getAllData = async () => {
      const userq = query(collection(db, "users"));
      const user_docs = await getDocs(userq);
      var stdData = user_docs.docs
      return stdData;
    }
    var stdData = await getAllData();
    console.log("studentdata", stdData)
    console.log(jobData.details.skills)
    stdData.map((student) => {
      console.log(student.data().details?.skills)
      var matchVal = getPer(student.data().details?.skills, jobSkillList)
      var contains = false;
      assignedStudents.map((item) => {
        contains = item.uid === student.data().uid ? true : contains; 
      })
      if (matchVal >= 0.5 && !contains) {
        setSelectedStudents(students => [...students, student.data()])
      }
    })
  }
  const addStudent = async (student) => {
    console.log(student);
    setAssignedStudents(assignedStudents => [...assignedStudents, student])
    const newSelect = selectedStudents.filter((item) => {
      return item !== student;
    })
    setSelectedStudents(newSelect);
    // selectedStudents.splice(selectedStudents.indexOf(student), 1);
  }

  const removeStudent = async (student) => {
    console.log(student);
    setSelectedStudents(selectedStudents => [...selectedStudents, student])
    const newAssign = assignedStudents.filter((item) => {
      return item !== student;
    })
    setAssignedStudents(newAssign);
  }

  useEffect(() => {
    console.log("assignees", assignedStudents);
    console.log("selectedStud", selectedStudents);
    console.log("inside use effect of assignedStudents")
    const updateStd = async (jobUpdateRef) => {
      await updateDoc(jobUpdateRef, {
        assign: assignedStudents
      }).then(() => {
        console.log("modified assigned student list")
      }).catch((err) => {
        console.log(err)
      });
    }
    updateStd(jobDataRef);
  }, [assignedStudents]);

  useEffect(() => {
    console.log("selectedStud", selectedStudents);
    console.log("assignees", assignedStudents);
  }, [selectedStudents])

  return (
    <>
      <div className="container main">
        <div className="title onediv firstDiv">
          <h2 id="heading1">{jobData?.details.jobTitle}</h2>
          <Link to={`/UpdateJobs/${id}`}>
            <Button variant="contained">Update</Button>
          </Link>
          <hr />
        </div>
        <div className="description onediv">
          <h2>Job Description</h2>
          <hr />
          <p>
            {jobData?.details.jobDescription}
          </p>
        </div>
        <div className="skills"></div>
        <h2>Skills Required</h2>
        <hr />
        <div className="tags">
          {jobData?.details.skills.map((item) => {
            return <Button className="Skillreq" variant="contained">
              {item.value}
            </Button>
          })}
        </div>
      </div>
      <h2>Selected Students</h2>
      {assignedStudents.map((item) => {
        return (
          <>
            <div className="studentList">
              <div className="stdlistmian2_1 firstdivig">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "auto" }}
                />
                <div class="ms-2">{item.details.firstname + " " + item.details.lastname}</div>
                <div class="ms-2">{item.details.email}</div>
              </div>
              <div className=" skillmaindiv">
                <div className="conatainer skilltextdiv">
                  <h3>Skills</h3>
                </div>
                <div className="skillbtn">
                  {item.details.skills.map((skill) => {
                    return <Button variant="contained" className=" skillbtns ms-2">
                      {skill.value}
                    </Button>
                  })}
                </div>
              </div>
              <div className="stdlistmian2_1">
                <Button className="viewbtn" variant="contained" onClick={() => { removeStudent(item) }}>
                  Reject
                </Button>
              </div>
            </div>
          </>
        )
      })}
      {/* <hr /> */}
      <div className="suggestStudent">
        <Button variant="contained" onClick={SuggestFunc}>Suggest Interns</Button>
      </div>
      {selectedStudents.map((item) => {
        return (
          <>
            <div className="studentList">
              <div className="stdlistmian2_1 firstdivig">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "auto" }}
                />
                <div class="ms-2">{item.details.firstname + " " + item.details.lastname}</div>
                <div class="ms-2">{item.details.email}</div>
              </div>
              <div className=" skillmaindiv">
                <div className="conatainer skilltextdiv">
                  <h3>Skills</h3>
                </div>
                <div className="skillbtn">
                  {item.details.skills.map((skill) => {
                    return <Button variant="contained" className=" skillbtns ms-2">
                      {skill.value}
                    </Button>
                  })}
                </div>
              </div>
              <div className="stdlistmian2_1">
                <Button className="viewbtn" variant="contained" onClick={() => { addStudent(item) }}>
                  Select
                </Button>
              </div>
            </div>
          </>
        )
      })}
    </>
  );
};

export default JobDescp;
