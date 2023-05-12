import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./css/AdminStudentList.css";
import { Button } from "@mui/material";
import { green } from "@mui/material/colors";

const AdminStudentLists = (props) => {
  var allStudents = props.allData.user;
  console.log(allStudents);

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
            >
              <FormControlLabel
                className="Admindstudentlistradio"
                value="female"
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
                value="male"
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
                label="Verified"
              />
              <FormControlLabel
                className="Admindstudentlistradio"
                value="other"
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
        </div>
        {allStudents?.map((item) => {
          if (item?.data().desgn === "student" && item?.data().updatedProfile) {
            console.log(item?.data().details.firstname);
            return (
              <div className="box3">
                <div className="studentList">
                  <div className="stdlistmian2_1 firstdivig">
                    <img
                      src={item?.data().details.PImageUrl}
                      alt="avatar 1"
                      style={{ width: "45px", height: "auto" }}
                    />
                    <div class="ms-2">
                      <span>
                        {item?.data().details.firstname +
                          "  " +
                          item?.data().details.lastname}
                      </span>
                    </div>
                    <div class="ms-2">
                      <span>{item?.data().email}</span>
                    </div>
                    <div class="ms-2">
                      <span>{item?.data().details.mobile}</span>
                    </div>
                  </div>
                  <div className=" skillmaindiv">
                    <div className="conatainer skilltextdiv">
                      <h3>Skills</h3>
                    </div>
                    <div className="skillbtn">
                      {item?.data().details.skills.map((skill) => {
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
      </div>
    </>
  );
};

export default AdminStudentLists;
