import { arrayRemove, deleteDoc, setDoc } from 'firebase/firestore';
import React, { useState, useEffect, useContext } from 'react'
import Aside from './Aside'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authorizer';
import '../style/Dashboard/CreateJob.css';

// Data setup 
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

// material ui components
import { Button } from '@mui/material';

const Jobs = (props) => {
  var userDataRef = props.userData;
  var userData = userDataRef.data();
  const { currentUser } = useContext(AuthContext);
  const [id, setId] = useState(null);
  const [isVerified, setIsVerified] = useState(null);
  const [isStartUp, setIsStartUp] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    if (userData) {
      const jobids = userData?.jobs;
      console.log(jobids);
      if (jobids) {
        jobids.forEach(async (id) => {
          let jobRef = doc(db, "jobs", id);
          let job = await getDoc(jobRef);
          if (job) {
            setJobs(jobs => [
              ...jobs,
              {
                "id": id,
                "data": job.data()
              }]);
          }
        }
        );
      }
    }
  }, []);

  const handleJobDelete = async (id) => {
    let jobDelRef = doc(db, "jobs", id);
    await deleteDoc(jobDelRef);
    await updateDoc(userDataRef.ref, {
      jobs: arrayRemove(id) 
    })
    console.log("updated user job array")
    window.location.reload();
  }

  useEffect(() => {
    console.log(data)
  }, [data]);



  useEffect(() => {
    console.log(jobs)
  }, [jobs]);

    return (
      <>
        <div className='Createmain1'>
          <div class="container-fluid" id="main">
            <div class="row row-offcanvas row-offcanvas-left">
              {/* <Jobs/> strat */}
              <h1>jobs</h1>
              <div>
                <Link to="/createjobs">
                  <Button variant="contained" >Create Job</Button>
                </Link>
              </div>
              {/* <Jobs/> end */}
              <div class="container">

                {jobs.map(job => {
                  return (<div class="notification-ui_dd-content">
                    <div class="notification-list notification-list--unread">
                      <div class="notification-list_content">
                        <div class="notification-list_detail">
                          <div>
                            <p><b></b>{job.data.details.jobTitle}</p>
                            <p class="text-muted">{job.data.details.jobDescription}</p>
                            <p class="text-muted"><small>{job.data.details.jobLocation}</small></p>
                            <Link to={`/UpdateJobs/${job.id}`}>
                              <Button variant="contained">Update Job</Button>
                            </Link>
                            <Button variant="contained" color='error' onClick={() => { handleJobDelete(job.id) }}>Delete Job</Button>
                            <Link to={`/JobDescp/${job.id}`}>
                              <Button variant='contained' >Job Desc</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </>
    )

}

export default Jobs


// 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