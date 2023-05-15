import React from 'react'
import '../style/StudentDashboard/StudentNotification.css'

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

const StudentNotification = (props) => {
    var notifObj = props.notifObj;
    console.log("notifObj", notifObj);

    var UpdateRead = async (notifId) => {
        await updateDoc(notifId.ref, {
            isRead: true
        }).then(() => {
            console.log("updated")
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <>
            <div className='StudentmainClass'>
                <div class="container-fluid " id="" >
                    <div class="">
                        <div class="col main pt-5 mt-3 studentNotimain">
                            <section class="Studentsection-50 ">
                                <div class="container">
                                    <h3 class="m-b-50 heading-line">Notification <i class="fa fa-bell text-muted"></i></h3>
                                    {notifObj.map((item) => {
                                        UpdateRead(item)
                                        return (
                                            <div class="notification-ui_dd-content">
                                                <div class="notification-list notification-list--unread">
                                                    <div class="notification-list_content">
                                                        <div class="notification-list_detail">
                                                            <p><b>{item.data().senderName}</b> </p>
                                                            <p class="text-muted">{item.data().message}</p>
                                                            <p class="text-muted"><small>Sent At : {item.data().sentTime.toDate().toLocaleString()}</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>






        </>
    )
}

export default StudentNotification