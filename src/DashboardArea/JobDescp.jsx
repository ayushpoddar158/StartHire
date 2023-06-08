import { db } from "../Firebase";
import { useRef } from "react";
import Model from "../Components/Model/Model";
import {
  query,
  getDocs,
  collection,
  addDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  where,
  doc
} from "firebase/firestore";


import React from "react";
import { Button } from "@material-ui/core";
import { Modal, TextField } from "@mui/material";
import "./css/JobDescp.css";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Mode } from "@mui/icons-material";

const JobDescp = (props) => {
  let [jobData, setJobData] = useState();
  let [jobDataRef, setJobDataRef] = useState();
  let [selStudent, setSelStudent] = useState([]);
  let [jobSkillList, setJobSkillList] = useState([]);
  let [assignedStudents, setAssignedStudents] = useState([]);
  let [assignIds, setAssignIds] = useState([]);
  let [selectedStudents, setSelectedStudents] = useState([]);

  const pageSize = 5; // Number of students to display per page
  const totalPages = Math.ceil(selectedStudents.length / pageSize);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Get the students to display for the current page
  const currentStudents = selectedStudents.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const isAdmin = props.isAdmin;
  const id = useParams().id;
  // console.log(id)
  useEffect(() => {
    const loadJob = async (id) => {
      let jobRef = doc(db, "jobs", id);
      setJobDataRef(jobRef);
      await getDoc(jobRef)
        .then((jobVal) => {
          console.log("job", jobVal.data())
          setJobData(jobVal.data());
          setAssignIds(jobVal.data().assign)
        })
        .catch((err) => {
          console.log(err)
        });
    }
    loadJob(id);
  }, [])


  useEffect(() => {
    console.log("assign useEffect is called", assignIds);
    const updateStd = async (jobUpdateRef) => {
      await updateDoc(jobUpdateRef, {
        assign: assignIds
      }).then(() => {
        console.log("modified assigned student list")
      }).catch((err) => {
        console.log(err)
      });
    }
    updateStd(jobDataRef);
    const loadAssignStudents = async (id) => {
      console.log("id", id)
      const assignRef = doc(db, "users", id);
      const assignVal = await getDoc(assignRef);
      if (!assignedStudents.includes(assignVal)) {
        updateDoc(assignVal.ref, {
          startups: arrayUnion(jobData.creator)
        })
        setAssignedStudents(values => [...values, assignVal])
      }
    }
    setAssignedStudents([]);
    assignIds.map((id) => {
      loadAssignStudents(id)
    })
  }, [assignIds])

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
      const userq = query(collection(db, "users"),
        where("VerifIsConfirmed", "==", true));
      const user_docs = await getDocs(userq);
      var stdData = user_docs.docs
      return stdData;
    }
    var stdData = await getAllData();
    console.log("studentdata", stdData)
    console.log(jobData.details.skills)
    // setSelectedStudents([]);
    // var tempStd = 0;
    // stdData.map((student) => {
    //   var matchVal = getPer(student.data().skills, jobSkillList)
    //   var contains = false;
    //   assignedStudents.map((item) => {
    //     // console.log("assign",item.data())
    //     // console.log("student",student.data())
    //     contains = item.data().uid === student.data().uid ? true : contains;
    //   })
    //   if (matchVal >= 0.5 && !contains) {
    //     setSelectedStudents(students => [...students, student])
    //     tempStd++;
    //   }
    // })
    setSelectedStudents([]);
    var tempStd = 0;
    stdData.forEach((student) => {
      var matchVal = getPer(student.data().skills, jobSkillList);
      var contains = false;
      assignedStudents.forEach((item) => {
        contains = item.data().uid === student.data().uid ? true : contains;
      });
      if (matchVal >= 0.5 && !contains) {
        setSelectedStudents(students => [...students, student]);
        tempStd++;
      }
    });

    // Sort selectedStudents based on matchVal
    setSelectedStudents(students => students.sort((a, b) => {
      const matchValA = getPer(a.data().skills, jobSkillList);
      const matchValB = getPer(b.data().skills, jobSkillList);
      return matchValB - matchValA;
    }));

    if (tempStd === 0) {
      alert("there is no student matching these skills")
    }
  }

  const addStudent = async (student) => {
    console.log(student);
    setAssignIds(assignedIds => [...assignedIds, student.id])
    const newSelect = selectedStudents.filter((item) => {
      return item !== student;
    })
    setSelectedStudents(newSelect);
  }

  const removeStudent = async (student) => {
    console.log(student);
    setSelectedStudents(selectedStudents => [...selectedStudents, student])
    const newAssign = assignIds.filter((item) => {
      return item !== student.id;
    })
    updateDoc(student.ref, {
      startups: arrayRemove(jobData.creator)
    })
    console.log("newAssign", newAssign)
    setAssignIds(newAssign);
  }

  useEffect(() => {
    console.log("selectedStud", selectedStudents);
    console.log("assignees", assignedStudents);
  }, [selectedStudents])

  const uname = useState("ayush")
  return (
    <>


      {/* <Model ref={ref}/> */}
      <div className="mainJobDesc">

        <div className="JobDescmain">
          <div className="title onediv firstDiv">
            <h2 id="heading1">{jobData?.details.jobTitle}</h2>
            {isAdmin ? "" :
              <Link to={`/UpdateJobs/${id}`}>
                <Button className="jObDecUpdateBtn" variant="contained ">Update</Button>
              </Link>
            }

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
            {jobData?.details.skills?.map((item) => {
              return <Button className="Skillreq" variant="contained">
                {item.value}
              </Button>
            })}
          </div>
        </div>
        <h2 className="JobDescSelStudenth2">Selected Students</h2>
        {assignedStudents.map((item) => {
          return (
            <>
              <div className="studentList">

                <div className="stdlistmian2_1 firstdivig">
                  {item.data().gender === "Male" ?
                    <img
                      src="../../public/sample_male.jpg"
                      alt="avatar 1"
                      style={{ width: "45px", height: "auto" }}
                    />
                    :
                    <img
                      src="../../public/sample_female.jpg"
                      alt="avatar 1"
                      style={{ width: "45px", height: "auto" }}
                    />
                  }
                  <div class="ms-2">{item.data().sid}</div>
                </div>
                <div className=" skillmaindiv">
                  <div className="conatainer skilltextdiv">
                    <h3>Skills</h3>
                  </div>
                  <div className="skillbtn">
                    {item.data().skills.map((skill) => {
                      return <Button variant="contained" className=" skillbtns ms-2">
                        {skill.value}
                      </Button>
                    })}
                  </div>
                </div>
                <div className="stdlistmian2_1 selectedstudeivindi">
                  <Button className="viewbtn JObDescRejbtn" variant="contained" onClick={() => { removeStudent(item) }}>
                    Reject
                  </Button>
                  <Model data={item.data()} />
                </div>
              </div>
            </>
          )
        })}
        {/* <hr /> */}
        <div className="suggestStudentbtndiv">
          <Button className="suggestStudentbtn" variant="contained" onClick={SuggestFunc}>Suggest Interns</Button>
        </div>
        {currentStudents.map((item) => {
          return (
            <>
              {/* <div className="JobDecStudListMainDiv"> */}
              <div className="studentList">
                <div className="stdlistmian2_1 firstdivig">
                  {item.data().gender === "Male" ?
                    <img
                      src="../../public/sample_male.jpg"
                      alt="avatar 1"
                      style={{ width: "45px", height: "auto" }}
                    />
                    :
                    <img
                      src="../../public/sample_female.jpg"
                      alt="avatar 1"
                      style={{ width: "45px", height: "auto" }}
                    />
                  }

                  <div class="ms-2">{item.data().sid}</div>
                </div>
                <div className=" skillmaindiv">
                  <div className="conatainer skilltextdiv">
                    <h3>Skills</h3>
                  </div>
                  <div className="skillbtn">
                    {item.data().skills.map((skill) => {
                      return <Button variant="contained" className=" skillbtns ms-2">
                        {skill.value}
                      </Button>
                    })}
                  </div>
                </div>
                <div className="stdlistmian2_1 jobdescbutnsection">
                  <Button className="viewbtn JObDescSelbtn" variant="contained" onClick={() => { addStudent(item) }}>
                    Select
                  </Button>

                  {/* <Button className="ViewdetailsJObDesc" varient="contained" >View</Button> */}
                  <Model data={item.data()} />
                </div>
              </div>


              {/* </div> */}


            </>
          )
        })}
        <div className="paginationdivJobdesc">
          <div className="innerpaginationdiv">


            {currentPage > 1 && (
              <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            )}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                className="pagesbtnsjobdesc"
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                disabled={pageNumber === currentPage}
              >
                {pageNumber}
              </button>
            ))}
            {currentPage < totalPages && (
              <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDescp;
