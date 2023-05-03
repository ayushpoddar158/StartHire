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

const StudentAside = () => {
    const { currentUser } = useContext(AuthContext);
    const [id, setId] = useState(null);
    const [isVerified, setIsVerified] = useState(null);
    const [userData, setUserData] = useState(null);


    const getUserData = async () => {
        let id = await currentUser.uid;
        let isVerified = await currentUser.emailVerified;
        setId(id)
        setIsVerified(isVerified);
        const q = query(collection(db, "users"), where("uid", "==", id));
        const docs = await getDocs(q);
        setUserData(docs.docs[0].data());
    }
    getUserData();

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
    // }, [currentUser]);
    // console.log(id, isVerified);
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
                    <li class="nav-item mb-2 "><Link class="nav-link text-secondary" to="/StartUpProfile"><i class="fas fa-user font-weight-bold"></i> <span className="ml-3">Profile</span></Link></li>
                     <li class="nav-item mb-2"><Link class="nav-link text-secondary" to="/Notification">Notifications</Link></li>
        
                </ul>
            </div>
        )
    }





}

export default StudentAside