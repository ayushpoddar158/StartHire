
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './css/AdminStudentList.css'
import { Button } from '@mui/material';
const AdminStudentLists = (props) => {
  var allStudents = props.allData.user;
  console.log(allStudents);

  return (
    <>
      <div className='maindiv1'>
        <h2>Check Student Status</h2>
        <div className="box2">
          <FormControl>

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="female" control={<Radio />} label="Available" />
              <FormControlLabel value="male" control={<Radio />} label="Verified" />
              <FormControlLabel value="other" control={<Radio />} label="Rejected" />

            </RadioGroup>
          </FormControl>
        </div>
        {allStudents?.map((item) => {
          if (item?.data().desgn === "student") {
            console.log(item?.data().details.firstname)
            return <div className="box3">
              <div className="studentList">
                <div className="stdlistmian2_1 firstdivig">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "auto" }}
                  />
                  <div class="ms-2"><span>{item?.data().details.firstname + "  " + item?.data().details.lastname}</span></div>
                  <div class="ms-2"><span>{item?.data().email}</span></div>
                  <div class="ms-2"><span>{item?.data().details.mobile}</span></div>
                </div>
                <div className=" skillmaindiv">
                  <div className="conatainer skilltextdiv">
                    <h3>Skills</h3>
                  </div>
                  <div className="skillbtn">
                    {item?.data().details.skills.map((skill) => {
                      return( 
                      <Button variant="contained" className=" skillbtns ms-2">
                        {skill.label}
                      </Button>)
                    })}
                  </div>
                </div>
                <div className="stdlistmian2_1">
                  <Button className="viewbtn" variant="contained">
                    Verify
                  </Button>
                  <Button className="viewbtn" variant="contained">
                    reject
                  </Button>
                </div>
              </div>
            </div>
          }
        })}
      </div>
    </>


  )
}

export default AdminStudentLists