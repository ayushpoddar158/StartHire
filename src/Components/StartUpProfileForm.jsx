// Authentication @Firebase 
import { Auth } from "../Firebase";
import { AuthContext } from "../Authorizer";
import { useEffect } from "react";
import { Box } from "@mui/material";
import Select from "react-select";
import { TextField } from "@material-ui/core";


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
  const [StartUpImg, setStartUpImg] = useState(null)
  const [localImageUrl, setLocalImageUrl] = useState(null);
  const [showImageUrl, setShowImageUrl] = useState(null);
  const [linkImageUrl, setLinkImageUrl] = useState(null);
  // const [tags, setTags] = React.useState([]);
  const navigate = useNavigate();
  const [StartUpData, setStartUpData] = useState(
    {
      StartUpName: "",
      StartUpEmail: "",
      location: "",
      FounderName: "",
      ContactNumber: "",
      websiteLink: "",
      linkedInLink: "",
      PImageUrl: null,
      domains: []
    }
  )



  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "startups"), where("uid", "==", currentUser.uid));
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
            setStartUpData({
              StartUpName: data.details.StartUpName,
              StartUpEmail: data.details.StartUpEmail,
              location: data.details.location,
              FounderName: data.details.FounderName,
              ContactNumber: data.details.ContactNumber,
              websiteLink: data.details.websiteLink,
              linkedInLink: data.details.linkedInLink,
              PImageUrl: data.details.PImageUrl,
              domains: data.details.domains
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
    setStartUpData(() => {
      return {
        ...StartUpData,
        [name]: value,
      }
    });

  }


  const handleImageUpload = async (e) => {
    setStartUpImg(e.target.files[0]);
    setLocalImageUrl(URL.createObjectURL(StartUpImg));
  }

  useEffect(() => {
    if (linkImageUrl) {
      console.log("link", linkImageUrl)
      setShowImageUrl(linkImageUrl);
    }
  }, [linkImageUrl])



  // tag functions



  const handleAddition = (tag) => {
    console.log(tag)
    console.log("changes")
    setStartUpData(() => {
      return {
        ...StartUpData,
        ["domains"]: tag,
      };
    });
    console.log(StartUpData)
  };
 useEffect(() =>{
  console.log(StartUpData)
 },[StartUpData])



  // tag functions end 

  const updateDocument = async (downloadURL) => {
    if (docRef) {
      console.log("inside update if ");
      await updateDoc(docRef.ref, {
        updatedProfile: true,
        details: {
          StartUpName: StartUpData.StartUpName,
          StartUpEmail: StartUpData.StartUpEmail,
          location: StartUpData.location,
          FounderName: StartUpData.FounderName,
          ContactNumber: StartUpData.ContactNumber,
          websiteLink: StartUpData.websiteLink,
          linkedInLink: StartUpData.linkedInLink,
          PImageUrl: downloadURL,
          domains: StartUpData.domains
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
      if (StartUpImg) {
        const fileRef = ref(storage, `images/userImages/${StartUpImg.name}`);
        try {
          const snap = await uploadBytes(fileRef, StartUpImg);
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
          const downloadURL = StartUpData.PImageUrl;
          setLinkImageUrl(downloadURL);
          await updateDocument(downloadURL);
          navigate("/dashboard");
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
                {StartUpImg ? <Box mt={2} textAlign="center">
                  {/* <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" alt="avatar" /> */}
                  <div id="StudentImage">
                    <img src={URL.createObjectURL(StartUpImg)} alt="" height="100px" /> </div>
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
                        name="websiteLink"
                        id="websiteLink"
                        value={StartUpData.websiteLink}
                        placeholder="website Link"
                        title="enter your last name if any." />
                    </div>
                  </div>
                  <div class="form-group">

                    <div class="col-xs-12">
                      <label for="Linkedin_Link"><h6>Linkedin</h6></label>
                      <TextField type="text"
                        class="form-control" onChange={getData}
                        name="linkedInLink"
                        id="linkedIn_Link"
                        value={StartUpData.linkedInLink}
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
                          <TextField type="text"
                            onChange={getData}
                            class="form-control"
                            required
                            name="StartUpName"
                            id="StartUp_Name"
                            value={StartUpData.StartUpName}
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
                            name="StartUpEmail"
                            id="StartUp_Email"
                            value={StartUpData.StartUpEmail}
                            placeholder="StartUp Email"
                            title="enter your StartUp Email if any."
                            required />
                        </div>
                      </div>


                      <div class="form-group">
                        <div class="col-xs-12">
                          <label for="Founder_Name"><h3>Founder Name</h3></label>
                          <TextField type="text"
                            onChange={getData}
                            class="form-control"
                            required
                            name="FounderName"
                            id="Founder_Name"
                            value={StartUpData.FounderName}
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
                            value={StartUpData.location}
                            placeholder="somewhere"
                            title="enter a location" />
                        </div>
                      </div>
                      <div class="form-group">

                        <div class="col-xs-12">
                          <label for="Contact_Number"><h3>Contact Number</h3></label>
                          <TextField type="text"
                            name='ContactNumber'
                            onChange={getData}
                            class="form-control"
                            required
                            id="ContactNumber"
                            value={StartUpData.ContactNumber}
                            placeholder="Enter Contact Number "
                            title="enter Contact Number" />
                        </div>
                      </div>
                      <div class="form-group">


                      </div>





                      <div class="form-group selectDiv" >
                        <div class="col-xs-12 YearOf">
                          <label for="StartUpDomain">
                            <h3>Add Domain</h3>
                          </label>
                          <Select onChange={handleAddition}

                            isMulti
                            name="colors"
                            options={StartUpDomain}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Enter Your Domain"
                            value={StartUpData.domains}


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







