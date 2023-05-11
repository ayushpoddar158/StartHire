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
            <div className="StudentMainDash">

                    <div >
                        <h1>Student Dashboard</h1>
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