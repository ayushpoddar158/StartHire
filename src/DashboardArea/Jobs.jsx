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
  doc,
} from "firebase/firestore";

// material ui components
import { Button } from '@mui/material';

const Jobs = (props) => {
  var userDataRef = props.userData;
  console.log("userRef",userDataRef)
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

  const handleJobDelete = async (job) => {
    var jobDelRef = doc(db, "jobs", job.id);
    let assign = job.data.assign;
    let startUpId = job.data.creator;
    console.log(assign, startUpId)
    try {
      await deleteDoc(jobDelRef);
      await updateDoc(userDataRef.ref, {
        jobs: arrayRemove(job.id)
      })
      assign.forEach(async (id) => {
        let assignRef = doc(db, "users", id);
        await updateDoc(assignRef, {
          startups: arrayRemove(startUpId)
        })
      });
    }
    catch (e) {
      console.log("error", e);
    }
    finally {
      console.log("Updated The Jobs")
      window.location.reload();
    }
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
       
       
           
            {/* <Jobs/> end */}
            <div class=" JobsListStartUp">

              {jobs.map(job => {
                return (<div class="notification-ui_dd-content">
                  <div class="notification-list notification-list--unread">
                    <div class="notification-list_content">
                      <div class="notification-list_detail">
                        <div>
                          <p className='JObTitle'><b></b>{job.data?.details.jobTitle}</p>
                          <p className='jobDesc' class="text-muted"><span>Desc:</span>{job.data?.details.jobDescription}</p>
                          <p  class="text-muted joblocation"><small><span>Location:</span>{job.data?.details.jobLocation}</small></p>
                          <Link to={`/UpdateJobs/${job.id}`}>
                            <Button className='jobslistsbtn' variant="contained">Update Job</Button>
                          </Link>
                          <Button className='jobslistsbtn' variant="contained" color='error' onClick={() => { handleJobDelete(job) }}>Delete Job</Button>
                          <Link to={`/JobDescp/${job.id}`}>
                            <Button className='jobslistsbtn' variant='contained' >Job Desc</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
            <div class="CreateJobmain">
            {/* <Jobs/> strat */}
            
            <h1>Create Jobs</h1>
            <hr />
            <div className='createbtndiv'>

            
              <Link to="/createjobs">
                <Button className='Createbtn' variant="contained" >Create Job</Button>
              </Link>
              </div>
            </div>

      
       
      </div>

    </>
  )

}

export default Jobs


// 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