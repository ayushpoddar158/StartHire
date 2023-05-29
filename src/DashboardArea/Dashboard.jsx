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


const Dashboard = (props) => {
    const userData = props.userData;
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);


    // useEffect(() => {
    //     console.log(userData);
    //     console.log("user", currentUser)
    // }, [])


    if (currentUser.emailVerified == false) {
        navigate('/VerifyEmail');
    }
    return (
        <>
            <div className='DashboardmainDiv'>
                <div className="StartUpinnnderdiv">
                    This is Dashboard
                </div>
            </div>

        </>

    )
}

export default Dashboard