import { NavLink, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import './css/AdminDashboard.css'

// Authentication Setup
import { Auth, db } from "../Firebase";
import { AuthContext } from '../Authorizer';

import { useNavigate } from 'react-router-dom';
import { collection, updateDoc, getDocs } from "firebase/firestore";

import { Button } from "@mui/material";


const AdminDashboard = (props) => {
    const navigate = useNavigate();
    let allData = props.allData;
    let studentSignUpOpen = props.studentSignUpOpen;
    let startupSignUpOpen = props.startupSignUpOpen;
    console.log(allData)

    const LogOut = () => {
        Auth.signOut();
        navigate("/LoginStartUp");
    }

    const ChangeStudentSignUp = async (signUpBool) => {
        const q = collection(db, "adminParams");
        await getDocs(q).then(async (docs) => {
            console.log("admindocs", docs.docs[0].data())
            await updateDoc(docs.docs[0].ref, {
                StdRegOpen: !signUpBool
            })
                .then(() => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error)
                })
        })

    }

    const ChangeStartUpSignUp = async (signUpBool) => {
        const q = collection(db, "adminParams");
        await getDocs(q).then(async (docs) => {
            console.log("admindocs", docs.docs[0].data())
            await updateDoc(docs.docs[0].ref, {
                StartUpRegOpen: !signUpBool
            })
                .then(() => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error)
                })
        })
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
            {studentSignUpOpen ?
                <div className="AdminStudentclosebtn">
                    <Button className="adminbtn btn"  onClick={() => { ChangeStudentSignUp(studentSignUpOpen) }}>Close Student Registration</Button>
                </div>
                :
                <div className="AdminStudentOpenBtn">
                    <Button className="adminbtn btn" onClick={() => { ChangeStudentSignUp(studentSignUpOpen) }}>Open Student Registration</Button>
                </div>
            }

            {startupSignUpOpen ?
                <div className="AdminStartUpclosebtn">
                    <Button className="adminbtn btn" onClick={() => { ChangeStartUpSignUp(startupSignUpOpen) }}>Close StartUp Registration</Button>
                </div>
                :
                <div className="AdminStartUpOpenBtn">
                    <Button className="adminbtn btn"  onClick={() => { ChangeStartUpSignUp(startupSignUpOpen) }}>Open StartUp Registration</Button>
                </div>
            }

        </>
    )
}

export default AdminDashboard 