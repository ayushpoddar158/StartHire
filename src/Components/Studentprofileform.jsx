// Authentication @Firebase
import { Auth } from "../Firebase";
import { AuthContext } from "../Authorizer";
import { useEffect } from "react";
import { Box } from "@mui/material";
import Select from "react-select";
import StudentAside from "../StudentDashboard/StudentAside";

import Textarea from "@mui/joy/Textarea";

// Data import @Firebase
import { db } from "../Firebase";
import { storage } from "../Firebase";
import {
  query,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { render } from "react-dom";
import { Codinglanginfo } from "./Codinglanginfo";
import { WithContext as ReactTags } from "react-tag-input";
import "../style/Studentprofileform.css";
import StudentLists from "../DashboardArea/StudentLists";
import Aside from "../DashboardArea/Aside";

// degree drop doen imports strt

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import CustomSelect from "@mui/material/Select";
import Button from "@mui/material/Button";
// degree drop doen imports ends

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const suggestions = Codinglanginfo.map((country) => {
  return {
    id: country,
    text: country,
  };
});

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Studentprofileform = (props) => {
  // degree fun and use starte start
  const [degree, setDegree] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setDegree(event.target.value);
    alert(degree);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // degree fun and use starte end

  let userDataRef = props.userData;
  let userData = userDataRef.data();
  console.log("userRef", userData);
  const { currentUser } = React.useContext(AuthContext);
  const [StudentImg, SetStudentImg] = useState(null);
  const [localImageUrl, setLocalImageUrl] = useState(null);
  const [showImageUrl, setShowImageUrl] = useState(null);
  const [linkImageUrl, setLinkImageUrl] = useState(null);
  const navigate = useNavigate();
  const [StudentData, setStudentData] = useState({
    firstname: userData.firstName,
    lastname: userData.lastName,
    mobile: userData.Mobile,
    location: userData.location,
    collname: userData.College,
    degree: userData.Degree,
    YOG: userData.YOG,
    githubLink: userData.githubLink,
    linkedInLink: userData.linkedInLink,
    PImageUrl: userData.PImageUrl,
    skills: userData.skills,
  });

  useEffect(() => {
    setLinkImageUrl(userData.PImageUrl);
  });

  const getData = (e) => {
    // console.log(e.target.value)
    const { value, name } = e.target;
    // console.log(value,name)
    setStudentData(() => {
      return {
        ...StudentData,
        [name]: value,
      };
    });
  };

  const handleImageUpload = async (e) => {
    SetStudentImg(e.target.files[0]);
    setLocalImageUrl(URL.createObjectURL(StudentImg));
  };

  // useEffect(() => {
  //   setShowImageUrl(localImageUrl);
  // }, [localImageUrl])

  useEffect(() => {
    if (linkImageUrl) {
      console.log("link", linkImageUrl);
      setShowImageUrl(linkImageUrl);
    }
  }, [linkImageUrl]);

  // useEffect(() => {
  //   console.log("show", showImageUrl)
  // }, [showImageUrl])

  // tag functions
  const handleAddition = (tag) => {
    console.log(tag);
    console.log("changes");
    setStudentData(() => {
      return {
        ...StudentData,
        ["skills"]: tag,
      };
    });
    console.log(StudentData);
  };

  // tag functions end

  const updateDocument = async (downloadURL) => {
    if (StudentData.firstname === "") {
      alert("Please enter your first name");
    } else if (StudentData.lastname === "") {
      alert("Please enter your last name");
    } else if (StudentData.mobile === "") {
      alert("Please enter your mobile numer");
    } else if (StudentData.location === "") {
      alert("Please enter your address");
    } else if (StudentData.collname === "") {
      alert("Please enter your collage name ");
    } else if (StudentData.degree === "") {
      alert("Please enter your qualification");
    } else if (StudentData.YOG === "") {
      if (StudentData.YOG < 2016 || StudentData.YOG > 2023) {
        alert("Please enter a valid year of graduation");
      }
    } else if (StudentData.skills.length === 0) {
      alert("Please enter at least one skill");
    } else {
      console.log("inside update else");
      await updateDoc(userDataRef.ref, {
        updatedProfile: true,
        firstName: StudentData.firstname,
        lastName: StudentData.lastname,
        Mobile: StudentData.mobile,
        location: StudentData.location,
        College: StudentData.collname,
        Degree: StudentData.degree,
        YOG: StudentData.YOG,
        skills: StudentData.skills,
        githubLink: StudentData.githubLink,
        linkedInLink: StudentData.linkedInLink,
        PImageUrl: downloadURL,
      })
        .then(() => {
          alert("Information successfully updated!");
          window.location.replace("/studentdashboard");
        })
        .catch((error) => {
          console.log("Error updating document: ", error);
        });
    }
  };

  const submitHandler = async () => {
    console.log("inside submit handler");
    if (StudentImg) {
      const fileRef = ref(storage, `images/userImages/${StudentImg.name}`);
      try {
        const snap = await uploadBytes(fileRef, StudentImg);
        console.log("Uploaded", snap);
        const downloadURL = await getDownloadURL(fileRef);
        console.log("Download URL:", downloadURL);
        setLinkImageUrl(downloadURL);
        await updateDocument(downloadURL);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("inside else");
      const downloadURL = StudentData.PImageUrl;
      setLinkImageUrl(downloadURL);
      await updateDocument(downloadURL).catch((err) => {
        console.log(err);
      });
    }
  };

  if (currentUser) {
    return (
      <>
        <div class=" bootstrap snippet" id="studentformmain">
          {/* profile form stART */}
          <div class="">
            <div class="row mt-2">
              <div class="col-sm-3">
                {/* <!--left col--> */}

                <div class="text-center">
                  {StudentImg ? (
                    <Box mt={2} textAlign="center">
                      {/* <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" alt="avatar" /> */}
                      <div id="StudentImage">
                        <img
                          src={URL.createObjectURL(StudentImg)}
                          alt=""
                          height="100px"
                        />{" "}
                      </div>
                    </Box>
                  ) : (
                    <Box mt={2} textAlign="center">
                      {/* <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" alt="avatar" /> */}
                      <div id="StudentImage">
                        <img src={showImageUrl} alt="" height="100px" />
                      </div>
                    </Box>
                  )}
                  <h6></h6>
                  <label id="fileupload">
                    {" "}
                    Upload Your Photo
                    <input
                      accept="image/"
                      type="file"
                      onChange={handleImageUpload}
                      size="60"
                    />
                  </label>
                </div>
                <hr />
                <br />

                <br />
                <div class="panel panel-default">
                  <div class="panel-heading">
                    Links<i class="fa fa-link fa-1x"></i>
                  </div>
                  <hr />
                  <div class="panel-body">
                    <div class="form-group">
                      <div class="col-xs-12">
                        <label for="last_name">
                          <h6>Github Link</h6>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={getData}
                          name="githubLink"
                          id="githubLink"
                          defaultValue={StudentData.githubLink}
                          placeholder="Github lInk"
                          title="enter your last name if any."
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-xs-12">
                        <label for="last_name">
                          <h6>Linkedin</h6>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={getData}
                          name="linkedInLink"
                          id="linkedInLink"
                          defaultValue={StudentData.linkedInLink}
                          placeholder="Linkedin Link"
                          title="enter your last name if any."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!--/col-3--> */}
              <div class="col-sm-9">
                <div class="tab-content">
                  <div class="tab-pane active" id="home">
                    <hr />
                    <form
                      class="form"
                      onSubmit={submitHandler}
                      id="registrationForm"
                    >
                      <div className=" maindivstudent">
                        <div class="form-group Studentformdivs">
                          <div class="col-xs-12">
                            <label className="firstnamecls" for="first_name">
                              <h3> Name</h3>
                            </label>
                            <input
                              type="text"
                              onChange={getData}
                              class="form-control"
                              required
                              name="firstname"
                              id="first_name"
                              defaultValue={StudentData.firstname}
                              placeholder="first name"
                              title="enter your first name if any."
                            />
                          </div>
                        </div>

                        <div class="form-group Studentformdivs">
                          <div class="col-xs-12 YearOf">
                            <label for="YOG">
                              <h3>Gender</h3>
                            </label>
                            <div className="col-xs-12 p-0">
                              <FormControl>
                                <RadioGroup
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="row-radio-buttons-group"
                                >
                                  <FormControlLabel
                                    value="female"
                                    control={<Radio />}
                                    label="Male"
                                  />
                                  <FormControlLabel
                                    value="male"
                                    control={<Radio />}
                                    label="Female"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </div>
                          </div>
                        </div>
                        <div class="form-group Studentformdivs">
                          <div class="col-xs-12">
                            <label for="last_name">
                              <h3>Email</h3>
                            </label>
                            <input
                              type="email"
                              onChange={getData}
                              class="form-control"
                              name="lastname"
                              id="last_name"
                              defaultValue={StudentData.lastname}
                              placeholder="email address"
                              title="enter your email ."
                              required
                            />
                          </div>
                        </div>

                        <div class="form-group Studentformdivs">
                          <div class="col-xs-12">
                            <label for="mobile">
                              <h3>Mobile</h3>
                            </label>
                            <input
                              type="number"
                              onChange={getData}
                              class="form-control"
                              required
                              name="mobile"
                              id="mobile"
                              defaultValue={StudentData.mobile}
                              placeholder="enter mobile number"
                              title="enter your mobile number if any."
                            />
                          </div>
                        </div>

                        <div class="form-group Studentformdivs">
                          <div class="col-xs-12">
                            <label for="location">
                              <h3>Location</h3>
                            </label>
                            <input
                              type="text"
                              onChange={getData}
                              name="location"
                              class="form-control"
                              required
                              id="location"
                              defaultValue={StudentData.location}
                              placeholder="somewhere"
                              title="enter a location"
                            />
                          </div>
                        </div>
                        <div class="form-group Studentformdivs">
                          <div class="col-xs-12">
                            <label for="collname">
                              <h3>College Name</h3>
                            </label>
                            <input
                              type="text"
                              name="collname"
                              onChange={getData}
                              class="form-control"
                              required
                              id=""
                              defaultValue={StudentData.collname}
                              placeholder="college/University "
                              title="enter a location"
                            />
                          </div>
                        </div>
                        <div class="form-group Studentformdivs">
                          <div class="col-xs-12">
                            <label for="degree">
                              <h3>Choose Degree</h3>
                            </label>
                            <div className="col-xs-12 p-0">
                              <FormControl className="fayu">
                                <InputLabel
                                  className="sonf"
                                  id="demo-controlled-open-select-label"
                                >
                                  Choose Degree
                                </InputLabel>
                                <CustomSelect
                                  className="cus"
                                  labelId="demo-controlled-open-select-label"
                                  id="demo-controlled-open-select"
                                  open={open}
                                  onClose={handleClose}
                                  onOpen={handleOpen}
                                  value={degree}
                                  label="Degree"
                                  onChange={handleChange}
                                  required
                                >
                                  {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
                                  <MenuItem value={"B-Tech"}>B-Tech</MenuItem>
                                  <MenuItem value={"BCA"}>BCA</MenuItem>
                                  <MenuItem value={"MBA"}>MBA</MenuItem>
                                  <MenuItem value={"M-Tech"}>M-Tech</MenuItem>
                                  <MenuItem value={"MCA"}>MCA</MenuItem>
                                  <MenuItem value={"BBA"}>BBA</MenuItem>
                                  <MenuItem value={"MBA"}>MBA</MenuItem>
                                  <MenuItem value={"BSc"}>BSc</MenuItem>
                                  <MenuItem value={"MSc"}>MSc</MenuItem>
                                </CustomSelect>
                              </FormControl>
                            </div>
                          </div>
                        </div>

                        <div class="form-group Studentformdivs">
                          <div class="col-xs-12 YearOf">
                            <label for="YOG">
                              <h3>Degree Status</h3>
                            </label>
                            <div className="col-xs-12 p-0">
                              <FormControl>
                                <RadioGroup
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="row-radio-buttons-group"
                                >
                                  <FormControlLabel
                                    value="female"
                                    control={<Radio />}
                                    label="Completed"
                                  />
                                  <FormControlLabel
                                    value="male"
                                    control={<Radio />}
                                    label="Persuing"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </div>
                          </div>
                        </div>

                        <div class="form-group Studentformdivs">
                          <div class="col-xs-12 YearOf">
                            <label for="YOG">
                              <h3>Year of Graduation</h3>
                            </label>
                            <input
                              type="number"
                              name="YOG"
                              onChange={getData}
                              class="form-control"
                              required
                              id="YOG"
                              defaultValue={StudentData.YOG}
                              placeholder="Year of Graduation"
                              title="enter year of passing"
                            />
                          </div>
                        </div>

                        <div class="form-group Studentformdivs">
                          <div class="col-xs-12 YearOf">
                            <label for="YOG">
                              <h3>Awards and Certifications</h3>
                            </label>
                            <Textarea
                              // color="primary"
                              disabled={false}
                              minRows={2}
                              size="lg"
                              placeholder="Write your Certificates and awards names if any "
                            />
                          </div>
                        </div>

                        <div class="form-group Studentformdivs">
                          <div class="col-xs-12 ">
                            <label for="YOG">
                              <h3>About You</h3>
                            </label>
                            <Textarea
                              // color="primary"
                              disabled={false}
                              minRows={2}
                              size="lg"
                              placeholder="Write About Yourself "
                            />
                          </div>
                        </div>

                        <div class="form-group selectDiv Studentformdivs">
                          <div class="col-xs-12 YearOf ">
                            <label for="YOG">
                              <h3>Add Skills</h3>
                            </label>
                            <Select
                              onChange={handleAddition}
                              isMulti
                              name="colors"
                              options={Codinglanginfo}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              placeholder="Enter Your Skills"
                              value={StudentData.skills}
                            />
                          </div>
                        </div>
                        <div class="form-group">
                          <div class="col-xs-12">
                            <br />
                            <button
                              class="btn btn-lg btn-success"
                              onClick={submitHandler}
                              type="button"
                            >
                              <i className="fa-regular fa-folder-arrow-up"></i>{" "}
                              Save
                            </button>
                            {/* <button class="btn btn-lg" type="reset"><i class="glyphicon glyphicon-repeat"></i> Reset</button> */}
                          </div>
                        </div>
                      </div>
                    </form>

                    <hr />
                  </div>
                </div>
                {/* <!--/tab-pane--> */}
              </div>
              {/* <!--/tab-content--> */}
            </div>
            {/* PROFILE FORM END */}
          </div>
        </div>
      </>
    );
  }
};

export default Studentprofileform;
