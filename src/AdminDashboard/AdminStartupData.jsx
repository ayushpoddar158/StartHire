import { deleteDoc, setDoc } from 'firebase/firestore';
import React, { useState, useEffect, useContext } from 'react'
import Aside from './Aside'
import { Link, useNavigate, useParams } from 'react-router-dom';
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

const AdminStartupData= () => {
  var startUpId = useParams().id;  
  console.log(startUpId)
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    const getStartUpData= async (startUpId) => {
      const q = query(collection(db, "startups"), where("uid", "==", startUpId));
      const docs = await getDocs(q);
      console.log(docs)
      if (docs.docs.length > 0) {
        setUserData(docs.docs[0].data());
        console.log("startUpData",docs.docs[0].data());
      }
    }
    getStartUpData(startUpId);
  }, [])

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
              {/* <Jobs/> end */}
              <div class=" AdminStartUpdatalist">

                {jobs.map(job => {
                  return (<div class="notification-ui_dd-content col-12">
                    <div class="notification-list notification-list--unread">
                      <div class="notification-list_content outerstartupbtndivide">
                        <div class="notification-list_detail innerstartupdatabtndivide">
                          <div>
                            <p><b></b>{job.data.details.jobTitle}</p>
                            <p class="text-muted">{job.data.details.jobDescription}</p>
                            <p class="text-muted"><small>{job.data.details.jobLocation}</small></p>
                          
                          </div>
                          <div>
                          <Button variant="contained" color='error' className='admindatabtn' onClick={() => { handleJobDelete(job.id) }}>Delete Job</Button>
                            <Link to={`/JobDescp/${job.id}`}>
                              <Button variant='contained' className='admindatabtn' >Job Desc</Button>
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

}

export default AdminStartupData; 