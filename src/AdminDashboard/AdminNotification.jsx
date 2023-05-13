import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import { useState } from 'react';
import './css/AdminNotification.css'


// Data setup 
import { db } from "../Firebase";
import {
  query,
  getDocs,
  collection,
  addDoc,
  getDoc,
  arrayUnion,
  updateDoc,
  where,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const AdminNotification = (props) => {
  let allData = props.allData;
  console.log(allData)

  const [notiSelect, setNotiSelect] = useState('');
  const [notiTextArea, setnotitextarea] = useState('');
  const [sendingState, setSendingState] = useState();

  const handleChange = (event) => {
    setNotiSelect(event.target.value);
  };
  const handleTextArea = (e) => {
    setnotitextarea(e.target.value)
  }

  var sendMessage = async (notiSelect, notifTextArea) => {
    if (notiSelect == "student") {
      const myCollectionRef = collection(db, 'users');
      const MessageRef = collection(db, 'notification');
      const messageDoc = await addDoc(MessageRef, {
        isRead: false,
        message: notifTextArea,
        recieverId: "all Students",
        senderId: "Admin",
        senderName: "Admin",
        sentTime: serverTimestamp()
      })
        .then((messageDoc) => {
          getDocs(myCollectionRef).then((querySnapshot) => {
            // Update each document in the collection with the same value
            querySnapshot.forEach((student) => {
              const docRef = doc(myCollectionRef, student.id);
              updateDoc(docRef, { notification: arrayUnion(messageDoc.id) })
                .then(() => {
                  console.log("Document successfully written!");
                })
            });
          }).catch((error) => {
            console.error('Error getting documents from the collection:', error);
          });
        })
        .catch((error) => {
          console.error('Error adding document:', error);
        })
    }
    else if (notiSelect == "startup") {
      const myCollectionRef = collection(db, 'startups');
      const MessageRef = collection(db, 'notification');
      const messageDoc = await addDoc(MessageRef, {
        isRead: false,
        message: notifTextArea,
        recieverId: "all Students",
        senderId: "Admin",
        senderName: "Admin",
        sentTime: serverTimestamp()
      })
        .then((messageDoc) => {
          getDocs(myCollectionRef).then((querySnapshot) => {
            querySnapshot.forEach((student) => {
              const docRef = doc(myCollectionRef, student.id);
              updateDoc(docRef, { notification: arrayUnion(messageDoc.id) })
                .then(() => {
                  console.log("Document successfully written!");
                })
            });
          }).catch((error) => {
            console.error('Error getting documents from the collection:', error);
          });
        })
        .catch((error) => {
          console.error('Error adding document:', error);
        })
    }
  }

  var sendNotification = () => {
    var validOptions = ['student', 'startup']
    if (validOptions.includes(notiSelect)) {
      setSendingState("Sending Notification");
      sendMessage(notiSelect, notiTextArea)
      setSendingState("Sent");
    }
  }


  return (
    <>
      <div className="notimainDiv">
        <FormControl>
          <div className="notidivinner1">
            <h2 className='notiHeader'>Send Notification</h2>
            <Box className="Notibox" sx={{}}>
              <FormControl className='notiFormControl' >
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={notiSelect}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={"student"}>All Students</MenuItem>
                  <MenuItem value={"startup"}>All Startups</MenuItem>
                  <MenuItem value={"custom"}>Custom

                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="notiinner2">
            <textarea name="" id="notiTextArea" cols="70" rows="5" value={notiTextArea} onChange={handleTextArea} placeholder='Write Content here'></textarea>
          </div>
          {sendingState ? <div className="sendingState"><h1>{sendingState}</h1></div> : null}
          <div className="notibutton">
            <Button id='notibtn'
              style={{ width: "50%" }}
              variant="contained"
              onClick={sendNotification}>
              Send</Button>
          </div>
        </FormControl>
      </div>
    </>
  )
}

export default AdminNotification