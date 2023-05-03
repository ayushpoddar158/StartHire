// Authentication @Firebase 
import { Auth } from "../Firebase";
import { AuthContext } from "../Authorizer";
import { useEffect } from "react";
import { Box } from "@mui/material";
import Select from "react-select";
import {TextField} from "@material-ui/core";


// Data import @Firebase
import { db } from "../Firebase";
import { storage } from "../Firebase";
import {
  query,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  where
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes
} from "firebase/storage";

import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { render } from 'react-dom';
import { StartUpDomain } from '../assets/StartUpDomain';
import { WithContext as ReactTags } from 'react-tag-input';
import "../style/StartUpProfileForm.css"
import StudentLists from "../DashboardArea/StudentLists";
import Aside from "../DashboardArea/Aside";




const suggestions = StartUpDomain.map((country) => {
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



const StartUpProfileForm = () => {
  const { currentUser } = React.useContext(AuthContext);
  const [data, setData] = useState();
  const [docRef, setDocRef] = useState();
  const [isUser, setIsUser] = useState(false);
  const [StudentImg, SetStudentImg] = useState(null)
  const [localImageUrl, setLocalImageUrl] = useState(null);
  const [showImageUrl, setShowImageUrl] = useState(null);
  const [linkImageUrl, setLinkImageUrl] = useState(null);
  // const [tags, setTags] = React.useState([]);
  const navigate = useNavigate();
  const [StudentData, setStudentData] = useState(
    {
      firstname: "",
      lastname: "",
      mobile: "",
      location: "",
      collname: "",
      degree: "",
      YOG: "",
      githubLink: "",
      linkedInLink: "",
      PImageUrl: null,
      skills: []

    }
  )



  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", currentUser.uid));
        const docs = await getDocs(q);
        const doc = docs.docs[0];
        setDocRef(doc);
        setData(doc.data());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentUser])

  useEffect(() => {
    const loadData = async () => {
      if (currentUser) {
        if (data) {
          if (data.updatedProfile) {
            // console.log(data.details.PImageUrl);
            setStudentData({
              firstname: data.details.firstname,
              lastname: data.details.lastname,
              mobile: data.details.mobile,
              location: data.details.location,
              collname: data.details.collname,
              degree: data.details.degree,
              YOG: data.details.YOG,
              githubLink: data.details.githubLink,
              linkedInLink: data.details.linkedInLink,
              PImageUrl: data.details.PImageUrl,
              skills: data.details.skills,
            });
            setLinkImageUrl(data.details.PImageUrl);
          }
        }
      }
    };
    loadData();
  }, [data]);



  const getData = (e) => {
    // console.log(e.target.value)
    const { value, name } = e.target;
    // console.log(value,name)
    setStudentData(() => {
      return {
        ...StudentData,
        [name]: value,
      }
    });

  }


  const handleImageUpload = async (e) => {
    SetStudentImg(e.target.files[0]);
    setLocalImageUrl(URL.createObjectURL(StudentImg));
  }

  // useEffect(() => {
  //   setShowImageUrl(localImageUrl);
  // }, [localImageUrl])

  useEffect(() => {
    if (linkImageUrl) {
      console.log("link", linkImageUrl)
      setShowImageUrl(linkImageUrl);
    }
  }, [linkImageUrl])

  // useEffect(() => {
  //   console.log("show", showImageUrl)
  // }, [showImageUrl])



  // tag functions



  const handleAddition = (tag) => {
    console.log(tag)
    console.log("changes")
    setStudentData(() => {
      return {
        ...StudentData,
        ["skills"]: tag,
      };
    });
    console.log(StudentData)

  };



 
  // tag functions end 

  const updateDocument = async (downloadURL) => {
    if (docRef) {
      console.log("inside update if ");
      await updateDoc(docRef.ref, {
        updatedProfile: true,
        details: {
          firstname: StudentData.firstname,
          lastname: StudentData.lastname,
          mobile: StudentData.mobile,
          location: StudentData.location,
          collname: StudentData.collname,
          degree: StudentData.degree,
          YOG: StudentData.YOG,
          skills: StudentData.skills,
          githubLink: StudentData.githubLink,
          linkedInLink: StudentData.linkedInLink,
          PImageUrl: downloadURL
        }
      }).then(() => {
        alert("Information successfully updated!");
        navigate("/dashboard");
      })
        .catch((error) => {
          console.log("Error updating document: ", error);
        })
    }
  }


  const submitHandler = async () => {
    console.log("inside submit handler");
    const doc = docRef;
    if (doc) {
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
      }
      else {
        try {
          const downloadURL = StudentData.PImageUrl;
          setLinkImageUrl(downloadURL);
          await updateDocument(downloadURL);
        } catch (err) {
          console.log(err);
        }
      }
      console.log("updating document")
    }
  }



  if (currentUser) {
    return (
      <>
        <div class="container bootstrap snippet" id='studentformmain'>
          <div class="row mt-2">
            <div class="col-sm-3">
              {/* <!--left col--> */}


              <div class="text-center">
                {StudentImg ? <Box mt={2} textAlign="center">
                  {/* <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" alt="avatar" /> */}
                  <div id="StudentImage">
                    <img src={URL.createObjectURL(StudentImg)} alt="" height="100px" /> </div>
                </Box> :
                  <Box mt={2} textAlign="center">
                    {/* <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" alt="avatar" /> */}
                    <div id="StudentImage">
                      <img src={showImageUrl} alt="" height="100px" />
                    </div>
                  </Box>}
                <h6></h6>
                <label id='fileupload'> Upload Your Logo
                  <TextField accept="image/" type="file" onChange={handleImageUpload} size="60" />
                </label>
              </div><hr /><br />

              <br />
              <div class="panel panel-default">
                <div class="panel-heading">Links<i class="fa fa-link fa-1x"></i></div>
                <hr />
                <div class="panel-body">
                  <div class="form-group">

                    <div class="col-xs-12">
                      <label for="website_Link"><h6>Website Link</h6></label>
                      <TextField type="text" class="form-control"
                        onChange={getData}
                        name="website_Link"
                        id="websiteLink"
                        defaultValue={StudentData.githubLink}
                        placeholder="website Link"
                        title="enter your last name if any." />
                    </div>
                  </div>
                  <div class="form-group">

                    <div class="col-xs-12">
                      <label for="Linkedin_Link"><h6>Linkedin</h6></label>
                      <TextField type="text"
                        class="form-control" onChange={getData}
                        name="Linkedin_Link"
                        id="linkedInLink"
                        defaultValue={StudentData.linkedInLink}
                        placeholder="Linkedin Link"
                        title="enter your Linkedin Link  if any." />
                    </div>
                  </div>
                </div>
              </div>




            </div>
            {/* <!--/col-3--> */}
            <div class="col-sm-9">
              {/* <ul class="nav nav-tabs">
                <li class="active"><a data-toggle="tab" href="#home">Home</a></li>
                <li><a data-toggle="tab" href="#messages">Menu 1</a></li>
                <li><a data-toggle="tab" href="#settings">Menu 2</a></li>
              </ul> */}


              <div class="tab-content">
                <div class="tab-pane active" id="home">
                  <hr />
                  <form class="form" onSubmit={submitHandler} id="registrationForm">
                    <div className="container maindivstudent">
                      <div class="form-group ">

                        <div class="col-xs-12">


                          <label className="firstnamecls" for="StartUp_Name"><h3>StartUp Name</h3></label>
                          <TextField  type="text"
                            onChange={getData}
                            class="form-control"
                            required 
                            name="StartUp_Name"
                            id="StartUp_Name"
                            defaultValue={StudentData.firstname}
                            placeholder="StartUp name"
                          
                            title="enter your first name if any." />
                        </div>
                      </div>
                      <div class="form-group">

                        <div class="col-xs-12 ">
                          <label for="StartUp_Email"><h3>StartUp Email</h3></label>
                          <TextField type="email"
                            onChange={getData}
                            class="form-control"
                            name="StartUp_Email"
                            id="StartUp_Email"
                            defaultValue={StudentData.lastname}
                            placeholder="StartUp Email"
                            title="enter your StartUp Email if any."
                            required />
                        </div>
                      </div>


                      <div class="form-group">
                        <div class="col-xs-12">
                          <label for="Founder_Name"><h3>Founder Name</h3></label>
                          <TextField type="number"
                            onChange={getData}
                            class="form-control"
                            required
                             name="Founder_Name"
                            id="Founder_Name"
                            defaultValue={StudentData.mobile}
                            placeholder="Enter Founder Name"
                            title="enter your Founder_Name." />
                        </div>
                      </div>

                      <div class="form-group">

                        <div class="col-xs-12">
                          <label for="location"><h3>Location</h3></label>
                          <TextField type="text"
                            onChange={getData}
                            name='location'
                            class="form-control"
                            required id="location"
                            defaultValue={StudentData.location}
                            placeholder="somewhere"
                            title="enter a location" />
                        </div>
                      </div>
                      <div class="form-group">

                        <div class="col-xs-12">
                          <label for="Contact_Number"><h3>Contact Number</h3></label>
                          <TextField type="text"
                            name='Contact_Number'
                            onChange={getData}
                            class="form-control"
                            required
                            id="Contact_Number"
                            defaultValue={StudentData.collname}
                            placeholder="Enter Contact Number "
                            title="enter Contact Number" />
                        </div>
                      </div>
                      <div class="form-group">

                      
                      </div>


                    


                      <div class="form-group selectDiv" >
                      <div class="col-xs-12 YearOf">
                        <label for="YOG">
                          <h3>Add Domain</h3>
                        </label>
                        <Select onChange={handleAddition}
                         
                          isMulti
                          name="colors"
                          options={StartUpDomain}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          placeholder="Enter Your Domain"
                         
                          value={StudentData.skills}
                         
                          
                        />
                      </div>
                    </div>
                      <div class="form-group">
                        <div class="col-xs-12">
                          <br />
                          <button class="btn btn-lg btn-success" onClick={submitHandler} type="button"><i className="fa-regular fa-folder-arrow-up"></i> Save</button>
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
          {/* <!--/col-9--> */}
        </div>
        {/* <!--/row--> */}

      </>
    )
  }

}

export default StartUpProfileForm;







