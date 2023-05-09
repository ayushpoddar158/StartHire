import { useEffect, useState, useContext } from 'react';
import { NavLink, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import '../style/Dashboard/StartUpDashboard.css'
import '../style/AsideMain.css'
// components
import Main from './Main';
import StartUpProfile from './StartUpProfile';
import Jobs from './Jobs';
import StartupBlog from './StartupBlog';
import JobDescp from './JobDescp';
import Notification from './Notification';

// Authentication Setup
import { Auth } from "../Firebase";
import { AuthContext } from '../Authorizer';



import { useNavigate } from 'react-router-dom';

// font awesome setup
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import StartUpProfileForm from './StartUpProfileForm';


const AsideMain = (props) => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    let userData = props.userData;
    let isStudent = props.isStudent;
    let isStartUp = props.isStartUp;
    let isVerified = props.isVerified;
    let isAdmin = props.isAdmin;

    const LogOut = async() =>{
      await Auth.signOut()
        .then(() => {
          window.location.replace("/login")
        })
    }
   if (isAdmin) {
        console.log(isAdmin)
        return (
            <>
                <div >

                    <div class="container-fluid mainAside" id="main" style={{backgroundColor:"white"}}>
                        <div class="row row-offcanvas row-offcanvas-left">
                            <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{ backgroundColor: "#e9ecef" }}>
                                <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3   " >
                                    <li class="nav-item mb-2 mt-3" ><a class="nav-link text-secondary" href="#"><h2 >some name</h2></a></li>
                                    <li class="nav-item mb-2"
                                    ><NavLink class="nav-link text-secondary" to="/AdminDashboard"> <FontAwesomeIcon icon={faFile} /><span className="ml-3" >Dashboard</span></NavLink></li>
                                    <li class="nav-item mb-2 "
                                    ><NavLink class="nav-link text-secondary" to="/AdminStudentLists"><FontAwesomeIcon icon={faUser} /><span className="ml-3" >StudentList</span></NavLink></li>
                                    <li class="nav-item mb-2"
                                    ><NavLink class="nav-link text-secondary" to="/AdminJobs" ><FontAwesomeIcon icon={faBriefcase} /> <span className="ml-3" >Jobs</span></NavLink></li>
                                   {/* <button>Hide</button> */}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

            </>
        )
    }

    if (isStartUp) {
        return (
            <>
                <div >

                    <div class="container-fluid mainAside" id="main" style={{backgroundColor:"white"}}>
                        <div class="row row-offcanvas row-offcanvas-left">
                            <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{ backgroundColor: "#e9ecef" }}>
                                <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3   " >
                                    <li class="nav-item mb-2 mt-3" ><a class="nav-link text-secondary" href="#"><h2 >{userData.name}</h2></a></li>
                                    <li class="nav-item mb-2"
                                    ><NavLink class="nav-link text-secondary" to="/Dashboard"> <FontAwesomeIcon icon={faFile} /><span className="ml-3" >Dashboard</span></NavLink></li>
                                    <li class="nav-item mb-2 "
                                    ><NavLink class="nav-link text-secondary" to="/StartUpProfile"><FontAwesomeIcon icon={faUser} /><span className="ml-3" >Profile</span></NavLink></li>
                                    <li class="nav-item mb-2"
                                    ><NavLink class="nav-link text-secondary" to="/Jobs" ><FontAwesomeIcon icon={faBriefcase} /> <span className="ml-3" >Jobs</span></NavLink></li>
                                    <li class="nav-item mb-2"
                                    ><NavLink class="nav-link text-secondary" to="/StartUpBlog" ><FontAwesomeIcon icon={faBlog} /><span className="ml-3" >Blog</span></NavLink></li>
                                    <li class="nav-item mb-2"
                                    ><NavLink class="nav-link text-secondary" to="/Notification" ><FontAwesomeIcon icon={faBell} /><span className="ml-3" >Notifications</span></NavLink></li>
                                    <li class="nav-item mb-2"
                                    ><button class="nav-link text-secondary LogoutbtnAsilde" onClick={LogOut}>LogOut</button></li>
                                    {/* <button>Hide</button> */}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

            </>

        )
    }
    else if (isStudent) {
        console.log("isStudent")
        return (
            <>
                <div>
                    <div class="container-fluid" id="main">
                        <div class="row row-offcanvas row-offcanvas-left">
                            <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{ backgroundColor: "#e9ecef" }}>
                                <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                                    <li class="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h2>{userData.name}</h2></a></li>
                                    <li class="nav-item mb-2"
                                    ><NavLink class="nav-link text-secondary" to="/StudentDashboard"> <FontAwesomeIcon icon={faFile} /><span className="ml-3" >Dashboard</span></NavLink></li>
                                    <li class="nav-item mb-2 "
                                    ><NavLink class="nav-link text-secondary" to="/StudentProfile"><FontAwesomeIcon icon={faUser} /><span className="ml-3" >Profile</span></NavLink></li>
                                    <li class="nav-item mb-2"
                                   ><NavLink class="nav-link text-secondary" to="/StudentNotification" ><FontAwesomeIcon icon={faBell} /><span className="ml-3" >Notifications</span></NavLink></li>
                                    <li class="nav-item mb-2"
                                    ><button class="nav-link text-secondary LogoutbtnAsilde" onClick={LogOut}>LogOut</button></li>
                                    {/* <button>Hide</button> */}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>

            </>

        )
    }
}

export default AsideMain