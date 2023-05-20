import { NavLink, BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import './css/AdminDashboard.css'

// Authentication Setup
import { Auth, db } from "../Firebase";
import { AuthContext } from '../Authorizer';

import { useNavigate } from 'react-router-dom';
import { collection, updateDoc, getDocs } from "firebase/firestore";




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
                <div>
                    <button onClick={() => { ChangeStudentSignUp(studentSignUpOpen) }}>Close Student Registration</button>
                </div>
                :
                <div>
                    <button onClick={() => { ChangeStudentSignUp(studentSignUpOpen) }}>Open Student Registration</button>
                </div>
            }

            {startupSignUpOpen ?
                <div>
                    <button onClick={() => { ChangeStartUpSignUp(startupSignUpOpen) }}>Close StartUp Registration</button>
                </div>
                :
                <div>
                    <button onClick={() => { ChangeStartUpSignUp(startupSignUpOpen) }}>Open StartUp Registration</button>
                </div>
            }

        </>
    )
}

export default AdminDashboard 