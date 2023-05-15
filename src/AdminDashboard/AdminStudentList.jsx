import * as React from "react";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./css/AdminStudentList.css";
import { Button } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect } from "react";

// Data setup 
import { db } from "../Firebase";
import {
  query,
  getDocs,
  collection,
  addDoc,
  where,
  updateDoc,
  arrayUnion,
  serverTimestamp
} from "firebase/firestore";
import { TextField } from "@mui/material";




const AdminStudentLists = (props) => {
  var allStudents = props.allData.user;
  var [select, setSelect] = React.useState();
  var [pending, setPending] = React.useState();
  var [available, setAvailable] = React.useState([]);
  var [selected, setSelected] = React.useState([]);
  var [rejected, setRejected] = React.useState([]);
  var [container, setContainer] = React.useState([]);
  var [filtered, setFiltered] = React.useState([]);
  var [inpdata, setInpdata] = React.useState("");

  var handleChange = (e) => {
    setSelect(e.target.value)
  }

  const getInpData = (e) => {
    setInpdata(e.target.value)
    console.log("inpData", inpdata)
  }

  useEffect(() => {
    var getData = async () => {
      const Availq = query(
        collection(db, "users"),
        where("VerifIsConfirmed", "==",false),
        where("VerifIsRejected", "==", false),
        where("VerifIsVerified", "==", true)
      );
      await getDocs(Availq)
        .then((availableStd) => {
          setAvailable(availableStd.docs)
          setContainer(availableStd.docs)
        })
      const Selectedq = query(
        collection(db, "users"),
        where("VerifIsConfirmed", "==", true)
      );
      await getDocs(Selectedq)
        .then((SelectedStd) => {
          setSelected(SelectedStd.docs)
        })
      const Rejectedq = query(
        collection(db, "users"),
        where("VerifIsRejected", "==", true)
      );
      await getDocs(Rejectedq)
        .then((rejectedStd) => {
          setRejected(rejectedStd.docs)
        });
    }
    getData();
  }, [])

  useEffect(() => {
    if (available) {
      console.log("avail", available)
    }
  }, [available])

  useEffect(() => {
    if (select === "available") {
      setContainer(available)
    }
    else if (select === "accepted") {
      setContainer(selected)
    }
    else if (select === "rejected") {
      setContainer(rejected)
    }
  }, [select])

  useEffect(() => {
    if (inpdata === "") {
      setFiltered(container)
    }
    else {
      var filter = container.filter((item) => {
        return item.data().firstName.toLowerCase().includes(inpdata.toLowerCase())
          || item.data().email.toLowerCase().includes(inpdata.toLowerCase())
      })
      setFiltered(filter)
    }
  }
  , [inpdata, container])

  const ConfirmStd = async (item) => {
    await updateDoc(item.ref, {
      VerifIsConfirmed: true,
      VerifIsRejected: false
    }).then(async () => {
      var notifRef = query(collection(db, "notification"));
      await addDoc(notifRef, {
        isRead: false,
        message: "Congratulations!" + item.data().firstName + "You have been selected for the collaboration program !",
        recieverId: item.id,
        senderId: "Admin",
        senderName: "Admin",
        sentTime: serverTimestamp()
      }).then((newNotfId) => {
        console.log("newNotfId", newNotfId.id)
        updateDoc(item.ref, {
          notification: arrayUnion(newNotfId.id)
        }).then(() => {
          window.location.reload();
        }).catch((err) => {
          console.log("couldnot add notification", err)
        });
      })
        .catch((err) => {
          console.log("couldnot add notification", err)
        });
    }
    )
  }

  const RejectStd = async (item) => {
    await updateDoc(item.ref, {
      VerifIsConfirmed: false,
      VerifIsRejected: true
    }).then(async () => {
      var notifRef = query(collection(db, "notification"));
      await addDoc(notifRef, {
        isRead: false,
        message: "Alert!" + item.data().firstName + "You have been rejected for the collaboration program ! You will be informed for upcoming oppertunities",
        recieverId: item.id,
        senderId: "Admin",
        senderName: "Admin",
        sentTime: serverTimestamp()
      }).then((newNotfId) => {
        console.log("newNotfId", newNotfId.id)
        updateDoc(item.ref, {
          notification: arrayUnion(newNotfId.id)
        }).then(() => {
          window.location.reload();
        }).catch((err) => {
          console.log("couldnot add notification", err)
        });
      })
        .catch((err) => {
          console.log("couldnot add notification", err)
        });
    });
  }

  return (
    <>
      <div className="maindiv1">
        <h2 className="StuidentListheaderh2">Check Student Status</h2>
        <div className="box2">
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={select}
              onChange={handleChange}
              defaultValue={"available"}
            >
              <FormControlLabel
                className="Admindstudentlistradio"
                value="available"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 28,
                        color: green[800],
                        "&.Mui-checked": {
                          color: green[600],
                        },
                      },
                    }}
                  />
                }
                label="Available"
              />
              <FormControlLabel
                className="Admindstudentlistradio"
                value="accepted"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 28,
                        color: green[800],
                        "&.Mui-checked": {
                          color: green[600],
                        },
                      },
                    }}
                  />
                }
                label="Accepted"
              />
              <FormControlLabel
                className="Admindstudentlistradio"
                value="rejected"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 28,
                        color: green[800],
                        "&.Mui-checked": {
                          color: green[600],
                        },
                      },
                    }}
                  />
                }
                label="Rejected"
              />
            </RadioGroup>
          </FormControl>
          <div style={{ "background-color": "white", "padding": "10px 0" }}>
            <TextField
              id="outlined-read-only-input"
              label="Search"
              defaultValue="Hello World"
              onChange={getInpData}
              value={inpdata}
            />
          </div>
        </div >
        {filtered?.map((item) => {
          if (item?.data().desgn === "student" && item?.data().updatedProfile) {
            return (
              <div className="box3">
                <div className="studentList">
                  <div className="stdlistmian2_1 firstdivig">
                    <img
                      src={item?.data().PImageUrl}
                      alt="avatar 1"
                      style={{ width: "45px", height: "auto" }}
                    />
                    <div class="ms-2">
                      <span>
                        {item?.data().firstName +
                          "  " +
                          item?.data().lastName}
                      </span>
                    </div>
                    <div class="ms-2">
                      <span>{item?.data().email}</span>
                    </div>
                    <div class="ms-2">
                      <span>{item?.data().Mobile}</span>
                    </div>
                  </div>
                  <div className=" skillmaindiv">
                    <div className="conatainer skilltextdiv">
                      <h3>Skills</h3>
                    </div>
                    <div className="skillbtn">
                      {item?.data().skills.map((skill) => {
                        return (
                          <Button
                            variant="contained"
                            className=" skillbtns AdminSkillbtns ms-2"
                          >
                            {skill.label}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="stdlistmian2_1 Adminstdlistmian2_1">
                    <Button className="viewbtn Adminviewbtnver "
                      variant="contained"
                      onClick={() => { ConfirmStd(item) }}>
                      Confirm
                    </Button>
                    <Button className="viewbtn Adminviewbtnrej"
                      variant="contained"
                      onClick={() => { RejectStd(item) }}>
                      Reject
                    </Button>
                   <Link to={`/AdminStudentView/${item.id}`} > 
                    <Button className="viewbtn Adminviewbtnrej"
                      variant="contained" >
                      View 
                    </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div >
    </>
  );
};

export default AdminStudentLists;
