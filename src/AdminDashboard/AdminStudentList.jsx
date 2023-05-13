import * as React from "react";
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
  where
} from "firebase/firestore";





const AdminStudentLists = (props) => {
  var allStudents = props.allData.user;
  var [select, setSelect] = React.useState();
  var [pending, setPending] = React.useState();
  var [available, setAvailable] = React.useState();
  var [selected, setSelected] = React.useState();
  var [rejected, setRejected] = React.useState();


  var handleChange = (e) => {
    setSelect(e.target.value)
  }

  useEffect(() => {
    var getData = async () => {
      const Availq = query(
        collection(db, "users"),
        where("VerifIsConfirmed", "==", false),
        where("VerifIsRejected", "==", true),
        where("VerifIsVerified", "==", false)
      );
      await getDocs(Availq)
        .then((availableStd) => {
          setAvailable(availableStd.docs)
        })
      const Selectedq = query(
        collection(db, "users"),
        where("VerifIsConfirmed", "==", true),
        where("VerifIsRejected", "==", false),
        where("VerifIsVerified", "==", true)
      );
      await getDocs(Selectedq)
        .then((SelectedStd) => {
          setSelected(SelectedStd.docs)
        })
      const Rejectedq = query(
        collection(db, "users"),
        where("VerifIsConfirmed", "==", false),
        where("VerifIsRejected", "==", true),
        where("VerifIsVerified", "==", true)
      );
      await getDocs(Rejectedq)
        .then((rejectedStd) => {
          setRejected(rejectedStd.docs)
        });
      const pendingq = query(
        collection(db, "users"),
        where("VerifIsConfirmed", "==", false),
        where("VerifIsRejected", "==", false),
        where("VerifIsVerified", "==", true)
      );
      await getDocs(pendingq)
        .then((pendingStd) => {
          setPending(pendingStd.docs)
        })
    }
    getData();
  }, [])

  useEffect(() => {
    if (pending) {
      console.log("pending",pending[0].data())
    }
  }, [pending])



  useEffect(() => {
    console.log(select)
  }, [select])

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
                value="pending"
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
                label="Pending"
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
        </div >
        {allStudents?.map((item) => {
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
                    <Button className="viewbtn Adminviewbtnver " variant="contained">
                      Verify
                    </Button>
                    <Button className="viewbtn Adminviewbtnrej" variant="contained">
                      reject
                    </Button>
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
