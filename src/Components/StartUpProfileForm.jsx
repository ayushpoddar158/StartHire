// Authentication @Firebase
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { Auth } from "../Firebase";
import { AuthContext } from "../Authorizer";
import { useEffect } from "react";
import { Box } from "@mui/material";
import Select from "react-select";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { render } from "react-dom";
import { WithContext as ReactTags } from "react-tag-input";
import "../style/StartUpProfileForm.css";
// import StartUpLists from "../DashboardArea/StartUpLists";

// import { StartUpDomain } from '../data';
import { StartUpDomain } from "../assets/StartUpDomain";

// Data import @Firebase
import { db } from "../Firebase";
import {
  query,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const StartUpProfileForm = () => {
  const { currentUser } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [StartUpData, setStartUpData] = useState({
    StartUpname: "",
    lastname: "",
    Founder_Name: "",
    Founder_Email: "",
    collname: "",
    degree: "",
    YOG: "",
    skills: [],
  });

  const [StartUpImg, SetStartUpImg] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);



  useEffect(() => {
    if (StartUpImg) {
      setImageUrl(URL.createObjectURL(StartUpImg));
    }
  }, [StartUpImg]);
  const getImg = (e) => {
    SetStartUpImg(e.target.files[0]);
    console.log(StartUpImg);
  };

  const getData = (e) => {
    // console.log(e.target.value)

    const { value, name } = e.target;
    // console.log(value,name)

    setStartUpData(() => {
      return {
        ...StartUpData,
        [name]: value,
        // ['skills']:tags
      };
    });

    console.log(StartUpData);
  };





  const handleAddition = (tag) => {
    console.log(tag)
    setStartUpData(() => {
      return {
        ...StartUpData,
        ["skills"]: tag,
      };
    });
    console.log(StartUpData)

  };


  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const submitHandler = async () => {
    console.log("inside submit handler");
    console.log(currentUser);
    const q = query(
      collection(db, "users"),
      where("uid", "==", currentUser.uid)
    );
    const docs = await getDocs(q);
    const doc = docs.docs[0];
    console.log(doc);
    if (doc) {
      await updateDoc(doc.ref, {
        updatedProfile: true,
        details: {
          StartUpname: StartUpData.StartUpname,
          lastname: StartUpData.lastname,
          Founder_Name: StartUpData.Founder_Name,
          Founder_Email: StartUpData.Founder_Email,
          collname: StartUpData.collname,
          degree: StartUpData.degree,
          YOG: StartUpData.YOG,
          skills: tags,
        },
      }).then(() => {
        navigate("/StartUpprofile");
      });
    }
  };

  return (
    <>
      <div class="container bootstrap snippet" id="StartUpformmain">
        <div class="row mt-2">
          <div class="col-sm-3">
            {/* <!--left col--> */}

            <div class="text-center">
              {imageUrl && StartUpImg && (
                <Box mt={2} textAlign="center">
                  {/* <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" alt="avatar" /> */}
                  <div id="StartUpImage">
                    <img src={imageUrl} alt={StartUpImg.name} height="100px" />
                  </div>
                </Box>
              )}
              <h6></h6>
              <label id="fileupload">
                {" "}
                Upload Your Logo
                <input
                  accept="image/"
                  type="file"
                  onChange={getImg}
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
                      name="last_name"
                      id="last_name"
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
                      name="last_name"
                      id="last_name"
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
            {/* <ul class="nav nav-tabs">
                <li class="active"><a data-toggle="tab" href="#home">Home</a></li>
                <li><a data-toggle="tab" href="#messages">Menu 1</a></li>
                <li><a data-toggle="tab" href="#settings">Menu 2</a></li>
              </ul> */}

            <div class="tab-content">
              <div class="tab-pane active" id="home">
                <hr />
                <form
                  class="form"
                  onSubmit={submitHandler}
                  id="registrationForm"
                >
                  <div className="container maindivStartUp">
                    <div class="form-group ">
                      <div class="col-xs-12">
                        <label className="StartUpnamecls" for="StartUp_name">
                          <h3>StartUp Name</h3>
                        </label>
                        <input
                          type="text"
                          onChange={getData}
                          class="form-control "
                          required
                          name="StartUpname"
                          id="StartUp_name"
                          placeholder="StartUp name"
                          title="enter your StartUp name if any."
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="col-xs-12">
                        <label for="StartUp_Email">
                          <h3>StartUp Email</h3>
                        </label>
                        <input
                          type="email"
                          onChange={getData}
                          class="form-control"
                          name="StartUpEmail"
                          id="StartUp_Email"
                          placeholder="StartUp Email"
                          title="enter your StartUp Email if any."
                          required
                        />
                      </div>
                    </div>

                    <div class="form-group">
                      <div class="col-xs-12">
                        <label for="FounderName">
                          <h3>Founder Name</h3>
                        </label>
                        <input
                          type="text"
                          onChange={getData}
                          class="form-control"
                          required
                          name="FounderName"
                          id="Founder_Name"
                          placeholder="enter Founder Name "
                          title="enter your Founder Name number if any."
                        />
                      </div>
                    </div>

                    <div class="form-group">
                      <div class="col-xs-12">
                        <label for="FounderEmail">
                          <h3>Founder Email</h3>
                        </label>
                        <input
                          type="email"
                          onChange={getData}
                          name="FounderEmail"
                          class="form-control"
                          required
                          id="Founder_Email"
                          placeholder="Founder Email"
                          title="enter  Founder Email"
                        />
                      </div>
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
                          <i className="fa-regular fa-folder-arrow-up"></i> Save
                        </button>
                        <button class="btn btn-lg" type="reset">
                          <i class="glyphicon glyphicon-repeat"></i> Reset
                        </button>
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
  );
};

export default StartUpProfileForm;
