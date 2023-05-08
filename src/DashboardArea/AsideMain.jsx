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
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@mui/material';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import StartUpProfileForm from './StartUpProfileForm';


const AsideMain = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [id, setId] = useState(null);
    const [isVerified, setIsVerified] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isStartUp, setIsStartUp] = useState(false);
    const [activeMenu, setActiveMenu] = useState("main");

    const LogOut = () => {
        Auth.signOut();
        navigate("/LoginStartUp");
      }

    

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

    if (isVerified == false) {
        navigate('/VerifyEmail');
        return null;
    }
    if (isStartUp && currentUser) {
        return (
            <>
                <div >

                    <div class="container-fluid mainAside" id="main" >
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
    if (currentUser && !isStartUp) {
        return (
            <>
                <h1>Unauthorized</h1>
            </>
        )
    }
}

export default AsideMain