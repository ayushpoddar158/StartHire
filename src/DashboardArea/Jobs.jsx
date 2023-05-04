import React, { useState, useEffect, useContext } from 'react'
import Aside from './Aside'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authorizer';

// Data setup 
import { db } from "../Firebase";
import {
  query,
  getDocs,
  collection,
  addDoc,
  getDoc,
  where,
  doc
} from "firebase/firestore";


const Jobs = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [id, setId] = useState(null);
  const [isVerified, setIsVerified] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isStartUp, setIsStartUp] = useState(false);
  const [jobs, setJobs] = useState([]);

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
      jobids.forEach(async (id) => {
        let jobRef = doc(db, "jobs", id);
        let job = await getDoc(jobRef);
        if (job) {
          setJobs(jobs => [...jobs, job.data()]);
        }
      }
      );
    }
  }, [userData]);

  useEffect(() => {
    console.log(jobs)
  }, [jobs]);
  if (currentUser && userData) {
    return (
      <>
        <div>
          <div class="container-fluid" id="main">
            <div class="row row-offcanvas row-offcanvas-left">
              {/* <Jobs/> strat */}
              <h1>jobs</h1>
              <div>
                <Link to="/createjobs"><button className="btn btn-primary" type="button">Create Job</button></Link>
              </div>
              {/* <Jobs/> end */}
              <div class="container">
                <h3 class="m-b-50 heading-line">Jobs<i class="fa fa-bell text-muted"></i></h3>
                {jobs.map(job => {
                  return(<div class="notification-ui_dd-content">
                    <div class="notification-list notification-list--unread">
                      <div class="notification-list_content">
                        <div class="notification-list_detail">
                          <div>
                            <p><b></b>{job.details.jobTitle}</p>
                            <p class="text-muted">{job.details.jobDescription}</p>
                            <p class="text-muted"><small>10 mins ago</small></p>
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

export default Jobs