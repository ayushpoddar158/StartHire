import { useEffect, useState, useContext } from 'react';
import { NavLink, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import '../style/Dashboard/StartUpDashboard.css'
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


const Dashboard = () => {
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

    const menuNav = (menu) => {
        setActiveMenu(menu);
    }

    const changemenuStartup=()=>{
        // alert("hell")
        menuNav("StartUpProfileForm")
    }

    const ChangeMenuJobDesc=()=>{
        menuNav("JobDescp")
    }

    if (isVerified == false) {
        navigate('/VerifyEmail');
        return null;
    }
    if (isStartUp && currentUser) {
        return (
            <>
                <div className='DashboardmainDiv'>
                    This is Dashboard Page
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