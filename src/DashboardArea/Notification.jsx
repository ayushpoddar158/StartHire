import React, { useEffect } from 'react'
import Aside from '../DashboardArea/Aside'
import '../style/Dashboard/Notification.css'



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
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
    console.log("notifObj", notifObj);

    var UpdateRead = async(notifId) => {
        await updateDoc(notifId.ref, {
            isRead: true
        }).then(() => {
            console.log("updated")
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        console.log(notifObj)
    }, [notifObj])

    return (
        <>
            <div className='MainNotiStart'>
                <div class="container-fluid" id="notimainid">
                    <div class="">
                        <div class="col StartNotimain pt-5 mt-3">
                            <section class="Startsection-50">
                                <div class=" ">
                                    <h3 class="m-b-50 heading-line">Notifications <FontAwesomeIcon icon={faBell} size="lg" /></h3>
                                </div>
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
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notification