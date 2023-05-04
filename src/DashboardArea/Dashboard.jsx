import { useEffect, useState, useContext } from 'react';
import { NavLink, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

// components
import Main from './Main';
import StartUpProfile from './StartUpProfile';
import Jobs from './Jobs';
import StartupBlog from './StartupBlog';
import Notification from './Notification';
// Authentication Setup
import { AuthContext } from '../Authorizer';


// Data setup 
import { db } from "../Firebase";
import {
    query,
    getDocs,
    collection,
    addDoc,
    where
} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

// font awesome setup
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';


const Dashboard = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [id, setId] = useState(null);
    const [isVerified, setIsVerified] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isStartUp, setIsStartUp] = useState(false);
    const [activeMenu, setActiveMenu] = useState("main");

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

    const [record, setRecord] = useState([])

    const menuNav = (menu) => {
        setActiveMenu(menu);
    }

    if (isVerified == false) {
        navigate('/VerifyEmail');
        return null;
    }
    if (isStartUp && currentUser) {
        return (
            <>
                <div>

                    <div class="container-fluid" id="main">
                        <div class="row row-offcanvas row-offcanvas-left">
                            <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{ backgroundColor: "#e9ecef" }}>
                                <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                                    <li class="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h5>{userData.name}</h5></a></li>
                                    <li class="nav-item mb-2"
                                        onClick={() => menuNav("main")}><NavLink class="nav-link text-secondary" ><i class="fas fa-file-export font-weight-bold"></i><span className="ml-3" style={{ color: activeMenu === "main" ? "blue" : "black" }}>Dashboard</span></NavLink></li>
                                    <li class="nav-item mb-2 "
                                        onClick={() => menuNav("profile")}><NavLink class="nav-link text-secondary"><FontAwesomeIcon icon={faUser} /><span className="ml-3" style={{ color: activeMenu === "profile" ? "blue" : "black" }}>Profile</span></NavLink></li>
                                    <li class="nav-item mb-2"
                                        onClick={() => menuNav("jobs")}><NavLink class="nav-link text-secondary" ><i class="far fa-chart-bar font-weight-bold"></i> <span className="ml-3" style={{ color: activeMenu === "jobs" ? "blue" : "black" }}>Jobs</span></NavLink></li>
                                    <li class="nav-item mb-2"
                                        onClick={() => menuNav("startupblog")}><NavLink class="nav-link text-secondary" ><i class="fas fa-file-export font-weight-bold"></i><span className="ml-3" style={{ color: activeMenu === "startupblog" ? "blue" : "black" }}>Blog</span></NavLink></li>
                                    <li class="nav-item mb-2"
                                        onClick={() => menuNav("notification")}><NavLink class="nav-link text-secondary" ><FontAwesomeIcon icon={faBell} /><span className="ml-3" style={{ color: activeMenu === "notification" ? "blue" : "black" }}>Notifications</span></NavLink></li>
                                    <li class="nav-item mb-2"
                                        onClick={() => Logout()}><a class="nav-link text-secondary" href="#">LogOut</a></li>
                                </ul>
                            </div>
                            {/* main content below */}
                            <div class="col-md-9 col-lg-10 pt-5 mt-3" id="content">
                                {activeMenu === "main" && <Main />}
                                {activeMenu === "profile" && <StartUpProfile />}
                                {activeMenu === "jobs" && <Jobs />}
                                {activeMenu === "startupblog" && <StartupBlog />}
                                {activeMenu === "notification" && <Notification />}
                            </div>
                        </div>

                    </div>
                </div>

            </>

        )
    }
    if (currentUser && !isStartUp) {
        return (
            <>
                <h1>Unauthorized</h1>
            </>
        )
    }
}

export default Dashboard