import { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/StudentDashboard/StudentDashboard.css'

// components
import StudentMain from './StudentMain';
import Studentprofile from './Studentprofile';

import StudentBlog from './StudentBlog';
import StudentNotification from './StudentNotification';

// Authentication Setup
import { Auth } from '../Firebase';
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
import { FaBriefcase } from 'react-icons/fa';
import Studentprofileform from '../Components/Studentprofileform';
// react icons 


const StudentDashboard = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [id, setId] = useState(null);
    const [isVerified, setIsVerified] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isUser, setIsUser] = useState(false);
    const [activeMenu, setActiveMenu] = useState("StudentMain");
    const [asideclicked, setAsideClicked] = useState(false)

    useEffect(() => {
        const getUserData = async () => {
            let id = await currentUser.uid;
            let isVerified = await currentUser.emailVerified;
            setId(id)
            setIsVerified(isVerified);
            const q = query(collection(db, "users"), where("uid", "==", id));
            const docs = await getDocs(q);
            if (docs.docs.length > 0) {
                setIsUser(true);
                setUserData(docs.docs[0].data());
            }
        }
        getUserData();
        console.log(userData)
    }, [currentUser])

    const [record, setRecord] = useState([])

    const menuNav = (menu) => {
        setActiveMenu(menu);
    }
    const hideAside = () => {
        const a = document.getElementById("Aside")
        // alert("cliked")
        if (asideclicked === true) {
            setAsideClicked(false)
        } else {
            setAsideClicked(true)
        }
        if (asideclicked === true) {
            a.style.display = 'none'
        } else {
            a.style.display = 'block'
        }
    }
    const changemenufun = () => {
        menuNav("Studentprofileform")

        const LogOut = () => {
            Auth.signOut();
            setIsUser(false);
            navigate("/Login");
        }

    }
    if (isVerified == false) {
        navigate('/VerifyEmail');
        return null;
    }

    const LogOut =  () =>{
        Auth.signOut();
        setIsUser(false);
        navigate("/Login");
    }


    if (isUser && currentUser) {
        return (
            <>
                <div>

                    <div class="container-fluid" id="StudentMain">
                        <div class="row row-offcanvas row-offcanvas-left">
                            <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{ backgroundColor: "#e9ecef" }}>
                                <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 " id='Aside'>
                                    <li class="nav-item mb-2 mt-3"><a class="nav-NavLink text-secondary" href="#"><h2>{userData.name}</h2></a></li>
                                    <li class="nav-item mb-2"
                                        onClick={() => menuNav("StudentMain")}><NavLink class="nav-NavLink text-secondary" >     <FontAwesomeIcon icon={faFile} /><span className="ml-3" style={{ color: activeMenu === "StudentMain" ? "blue" : "black" }}>Dashboard</span></NavLink></li>
                                    <li class="nav-item mb-2 "
                                        onClick={() => menuNav("profile")}><NavLink class="nav-NavLink text-secondary" ><FontAwesomeIcon icon={faUser} /><span className="ml-3" style={{ color: activeMenu === "profile" ? "blue" : "black" }}>Profile</span></NavLink></li>

                                    <li class="nav-item mb-2"
                                        onClick={() => menuNav("StudentBlog")}><NavLink class="nav-NavLink text-secondary" >     <FontAwesomeIcon icon={faBlog} /><span className="ml-3" style={{ color: activeMenu === "StudentBlog" ? "blue" : "black" }}>Blog</span></NavLink></li>
                                    <li class="nav-item mb-2"
                                        onClick={() => menuNav("StudentNotification")}><NavLink class="nav-NavLink text-secondary" ><FontAwesomeIcon icon={faBell} /><span className="ml-3" style={{ color: activeMenu === "StudentNotification" ? "blue" : "black" }}>Notifications</span></NavLink></li>
                                    <l1 class="nav-item mb-2 "
                                        onClick={LogOut}><button class="nav-NavLink text-secondary LogoutbtnAsilde" href="#">Log Out</button></l1>
                                    {/* <button onClick={hideAside}>Hide</button> */}
                                </ul>

                            </div>
                            {/* StudentMain content below */}
                            <div className="content">
                                {activeMenu === "StudentMain" && <StudentMain />}
                                {activeMenu === "profile" && <Studentprofile changemenufun={changemenufun} />}

                                {activeMenu === "StudentBlog" && <StudentBlog />}
                                {activeMenu === "StudentNotification" && <StudentNotification />}
                                {activeMenu === "Studentprofileform" && <Studentprofileform />}
                            </div>
                        </div>
                    </div>
                </div>

            </>

        )
    }
    if (currentUser && !isUser) {
        return (
            <>
                <h1>Unauthorized</h1>
            </>
        )
    }
}

export default StudentDashboard