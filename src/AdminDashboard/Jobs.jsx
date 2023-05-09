import { deleteDoc, setDoc } from 'firebase/firestore';
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

const AdminJobs = (props) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [id, setId] = useState(null);
  const [isVerified, setIsVerified] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isStartUp, setIsStartUp] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    const getUserData = async () => {
      let id = await currentUser?.uid;
      let isVerified = await currentUser?.emailVerified;
      setId(id)
      setIsVerified(isVerified);
      const q = query(collection(db, "startups"), where("uid", "==", id));
      const docs = await getDocs(q);
      if (docs.docs.length > 0) {
        setIsStartUp(true);
        setUserData(docs.docs[0].data());
      }
    }
    getUserData();
  }, [currentUser])

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
  }, [userData]);

  const handleJobDelete = async (id) => {
    let jobDelRef = doc(db, "jobs", id);
    await deleteDoc(jobDelRef);
    // updating user job array
    const jobA = userData.jobs;
    const updateA = jobA.filter(item => item != id);
    const q = query(collection(db, "startups"), where("uid", "==", currentUser?.uid));
    const docs = await getDocs(q);
    await updateDoc(docs.docs[0].ref, {
      jobs: updateA
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

  if (currentUser && userData) {
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
                <h3 class="m-b-50 heading-line">Jobs<i class="fa fa-bell text-muted"></i></h3>
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
                            <Button variant='contained' onClick={()=>{props.ChangeMenuJobDesc()}}>Job Desc</Button>
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

}

export default AdminJobs


// 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