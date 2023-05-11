import React, { useEffect } from 'react'
import Aside from '../DashboardArea/Aside'
import '../style/Dashboard/Notification.css'

// Data setup 
import { db } from "../Firebase";
import {
    query,
    getDocs,
    collection,
    addDoc,
    getDoc,
    updateDoc,
    where,
    doc
} from "firebase/firestore";




const Notification = (props) => {
    var notifObj = props.notifObj;
    console.log("notifObj",notifObj);

    

    useEffect(() => {
        console.log(notifObj)
    }, [notifObj])

    return (
        <>

            <div className='MainNotiStart'>
                <div class="container-fluid" id="main">
                    <div class="">
                        <div class="col main pt-5 mt-3">
                            <section class="section-50">
                                <div class="container">
                                    <h3 class="m-b-50 heading-line">Notifications <i class="fa fa-bell text-muted"></i></h3>

                                    <div class="notification-ui_dd-content">
                                        <div class="notification-list notification-list--unread">
                                            <div class="notification-list_content">

                                                <div class="notification-list_detail">
                                                    <p><b>John Doe</b> reacted to your post</p>
                                                    <p class="text-muted">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.</p>
                                                    <p class="text-muted"><small>10 mins ago</small></p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>






        </>
    )
}

export default Notification