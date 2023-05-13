import { useEffect, useState, useContext } from 'react';
import { NavLink, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import './css/AdminDashboard.css'

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


const AdminDashboard = (props) => {
    const navigate = useNavigate();
    let allData = props.allData;
    console.log(allData)

    const LogOut = () => {
        Auth.signOut();
        navigate("/LoginStartUp");
    }

    return (
        <>
            <div className='AdminDashboardmainDiv'>
                <div className="NoOfStudents">
                    <span >{allData.user?.length - 1}</span>
                    <h2>No of Students</h2>
                </div>
                <div className="NoOfStartUps">
                    <span >{allData.startup?.length}</span>
                    <h2>No of StartUp</h2>
                </div>
                <div className="NoOfJobDesc">
                    <span >{allData.job?.length}</span>
                    <h2>No of Jobs</h2>
                </div>
            </div>

        </>
    )
}

export default AdminDashboard 