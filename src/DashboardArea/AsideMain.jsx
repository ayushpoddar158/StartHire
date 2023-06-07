import { useEffect, useState, useContext } from "react";
import {
  NavLink,
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import "../style/Dashboard/StartUpDashboard.css";
import "../style/AsideMain.css";
// components
import Main from "./Main";
import StartUpProfile from "./StartUpProfile";
import Jobs from "./Jobs";
import StartupBlog from "./StartupBlog";
import JobDescp from "./JobDescp";
import Notification from "./Notification";

// Authentication Setup
import { Auth } from "../Firebase";
import { AuthContext } from "../Authorizer";

import { useNavigate } from "react-router-dom";

// font awesome setup
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import StartUpProfileForm from "./StartUpProfileForm";

const AsideMain = (props) => {
  const navigate = useNavigate();
  let userData = props.userData;
  let isStudent = props.isStudent;
  let isStartUp = props.isStartUp;
  let isVerified = props.isVerified;
  let isAdmin = props.isAdmin;
  let unReadCount = props.unReadCount;

  const LogOut = async () => {
    await Auth.signOut().then(() => {
      window.location.replace("/login");
    });
  };
  if (isAdmin) {
    console.log("admin", isAdmin);
    return (
      <>
        <div>
          <div
            class="container-fluid mainAside"
            id="main"
            
          >
            <div class="row row-offcanvas row-offcanvas-left">
              <div
                class="col-md-3 col-lg-2 sidebar-offcanvas pl-0"
                id="sidebar"
                role="navigation"
                style={{ backgroundColor: "#e9ecef" }}
              >
                <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3   ">
                  <li class="nav-item mb-2 mt-3">
                    <a class="nav-link text-secondary asidenameanchor btn disable " href="#">
                      <h2 className="Usernameaside">some name</h2>
                    </a>
                  </li>
                  <li class="nav-item mb-2">
                    <NavLink
                      class="nav-link text-secondary"
                      to="/AdminDashboard"
                    >
                      {" "}
                      <FontAwesomeIcon className="iconnoti" icon={faFile} />
                      <span className="ml-3">Dashboard</span>
                    </NavLink>
                  </li>
                  <li class="nav-item mb-2 ">
                    <NavLink
                      class="nav-link text-secondary"
                      to="/AdminStudentLists"
                    >
                      <FontAwesomeIcon className="iconnoti" icon={faUser} />
                      <span className="ml-3">Student List</span>
                    </NavLink>
                  </li>
                  <li class="nav-item mb-2">
                    <NavLink class="nav-link text-secondary" to="/StartUpLists">
                      <FontAwesomeIcon className="iconnoti" icon={faBriefcase} />{" "}
                      <span className="ml-3">StartUp List</span>
                    </NavLink>
                  </li>
                  <li class="nav-item mb-2">
                    <NavLink
                      class="nav-link text-secondary"
                      to="/AdminNotification"
                    >
                      <FontAwesomeIcon className="iconnoti" icon={faBriefcase} />{" "}
                      <span className="ml-3">Notification</span>
                    </NavLink>
                  </li>
                  <li class="nav-item mb-2">
                    <button
                      class="nav-link text-secondary LogoutbtnAsilde"
                      onClick={LogOut}
                    >
                   Log Out
                    </button>
                  </li>
                  {/* <button>Hide</button> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isStartUp && isVerified && userData.data().updatedProfile) {
    return (
      <>
        <div>
          <div
            class="container-fluid mainAside"
            id="main"
            style={{ backgroundColor: "white" }}
          >
            <div class="row row-offcanvas row-offcanvas-left">
              <div
                class="col-md-3 col-lg-2 sidebar-offcanvas pl-0"
                id="sidebar"
                role="navigation"
                style={{ backgroundColor: "#e9ecef" }}
              >
                <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3   ">
                  <li class="nav-item mb-2 mt-3">
                    <a class="nav-link text-secondary asidenameanchor btn disable " href="#">
                      <h2 className="Usernameaside">{userData.data().name}</h2>
                    </a>
                  </li>
                  {/* <li class="nav-item mb-2">
                    <NavLink class="nav-link text-secondary" to="/Dashboard">
                      {" "}
                      <FontAwesomeIcon className="iconnoti" icon={faFile} />
                      <span className="ml-3">Dashboard</span>
                    </NavLink>
                  </li> */}
                  <li class="nav-item mb-2 ">
                    <NavLink
                      class="nav-link text-secondary"
                      to="/StartUpProfile"
                    >
                      <FontAwesomeIcon className="iconnoti" icon={faUser} />
                      <span className="ml-3">Profile</span>
                    </NavLink>
                  </li>
                  <li class="nav-item mb-2">
                    <NavLink class="nav-link text-secondary" to="/Jobs">
                      <FontAwesomeIcon className="iconnoti" icon={faBriefcase} />{" "}
                      <span className="ml-3">Jobs</span>
                    </NavLink>
                  </li>
                  <li class="nav-item mb-2">
                    <NavLink class="nav-link text-secondary" to="/StartUpBlog">
                      <FontAwesomeIcon className="iconnoti" icon={faBlog} />
                      <span className="ml-3">Blog</span>
                    </NavLink>
                  </li>
                  <li class="nav-item mb-2">
                    <NavLink class="nav-link text-secondary" to="/Notification">
                      <FontAwesomeIcon className="iconnoti" icon={faBell} />
                      <span className="ml-3">Notifications</span>
                      <span className="studentUpnotispan">
                        {unReadCount === 0 ? "" : unReadCount}
                      </span>
                    </NavLink>
                  </li>
                  <li class="nav-item mb-2">
                    <button
                      class="nav-link text-secondary LogoutbtnAsilde"
                      onClick={LogOut}
                    >
                   Log Out
                    </button>
                  </li>
                  {/* <button>Hide</button> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (isStudent && isVerified && userData.data().updatedProfile) {
    console.log("isStudent");
    return (
      <>
        <div>
          <div class="container-fluid mainAside" id="main">
            <div class="row row-offcanvas row-offcanvas-left">
              <div
                class="col-md-3 col-lg-2 sidebar-offcanvas pl-0"
                id="sidebar"
                role="navigation"
                style={{ backgroundColor: "#e9ecef" }}
              >
                <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                  <li class="nav-item mb-2 mt-3">
                    <a class="nav-link text-secondary asidenameanchor btn disable " href="#">
                      <h2 className="Usernameaside">
                        {userData.data().ProfileName}
                      </h2>
                    </a>
                  </li>
                  <li class="nav-item mb-2">
                    <NavLink
                      class="nav-link text-secondary "
                      to="/StudentDashboard"
                    >
                      {" "}
                      <FontAwesomeIcon className="iconnoti" icon={faFile} />
                      <span className="ml-3">Dashboard</span>
                    </NavLink>
                  </li>
                  <li class="nav-item mb-2 ">
                    <NavLink
                      class="nav-link text-secondary "
                      to="/StudentProfile"
                    >
                      <FontAwesomeIcon className="iconnoti" icon={faUser} />
                      <span className="ml-3">Profile</span>
                    </NavLink>
                  </li>
                  <li class="nav-item mb-2">
                    <NavLink
                      class="nav-link text-secondary "
                      to="/StudentNotification"
                    >
                      <FontAwesomeIcon  className="iconnoti" icon={faBell} />
                      <span className="studentUpnotispan">
                        {unReadCount === 0 ? "" : unReadCount}
                      </span>
                      <span className="ml-3">Notifications </span>
                      
                    </NavLink>
                  </li>
                  <li class="nav-item mb-2">
                    <button
                      class="nav-link text-secondary LogoutbtnAsilde"
                      onClick={LogOut}
                    >
                      Log Out
                    </button>
                  </li>
                  {/* <button>Hide</button> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default AsideMain;
