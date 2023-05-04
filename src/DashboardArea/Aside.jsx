import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
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


// font awesome setup
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';




const Aside = (active) => {
    const { currentUser } = useContext(AuthContext);
    const [id, setId] = useState(null);
    const [isVerified, setIsVerified] = useState(null);
    const [userData, setUserData] = useState(null);
    

    // useEffect(() => {
    //     const getUserData = async () => {
    //         let id = await currentUser.uid;
    //         let isVerified = await currentUser.emailVerified;
    //         setId(id)
    //         setIsVerified(isVerified);
    //         const q = query(collection(db, "users"), where("uid", "==", id));
    //         const docs = await getDocs(q);
    //         setUserData(docs.docs[0].data());
    //     }
    //     getUserData();
    // }), [currentUser];

    useEffect(() => {
        const getUserData = async () => {
            let id = await currentUser.uid;
            let isVerified = await currentUser.emailVerified;
            setId(id)
            setIsVerified(isVerified);
            const q = query(collection(db, "startups"), where("uid", "==", id));
            const docs = await getDocs(q);
            setUserData(docs.docs[0].data());
        }
        getUserData();
        console.log(userData)
    }, [currentUser])


    while (userData) {
        if (isVerified == false) {
            return (
                <>
                    <h1>Please Verify Your Email Address
                    </h1>
                </>);
        }
        return (
            <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{ backgroundColor: "#e9ecef" }}>
                <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                    <li class="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h5>{userData.name}</h5></a></li>
                    <li class="nav-item mb-2"><Link class="nav-link text-secondary" to="/Dashboard"><FontAwesomeIcon icon={faCoffee}/><span className="ml-3">Dashboard</span></Link></li>
                    <li class="nav-item mb-2 "><Link class="nav-link text-secondary" to="/StartUpProfile"><FontAwesomeIcon icon={faUser}/><span className="ml-3">Profile</span></Link></li>

                    <li class="nav-item mb-2"><Link class="nav-link text-secondary" to="/Jobs"><i class="far fa-chart-bar font-weight-bold"></i> <span className="ml-3">Jobs</span></Link></li>
                    <li class="nav-item mb-2"><Link class="nav-link text-secondary" to="/StartUpBlog"><i class="fas fa-file-export font-weight-bold"></i><span className="ml-3">Blog</span></Link></li>
                    <li class="nav-item mb-2"><Link class="nav-link text-secondary" to="/Notification"><FontAwesomeIcon icon={faBell}/><span className="ml-3">Notifications</span></Link></li>
                    <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#">LogOut</a></li>
                </ul>
            </div>
        )
    }





}

export default Aside