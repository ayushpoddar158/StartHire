// Authentication @Firebase 
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Auth } from "../Firebase";
import { AuthContext } from "../Authorizer";
import { useEffect } from "react";
import { Box } from "@mui/material";

// Data import @Firebase
import { db } from "../Firebase";
import {
  query,
  getDocs,
  collection,
  addDoc,
  updateDoc,
  where
} from "firebase/firestore";


import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { render } from 'react-dom';
import { Codinglanginfo } from './Codinglanginfo';
import { WithContext as ReactTags } from 'react-tag-input';
import "../style/Studentprofileform.css"
import StudentLists from "../DashboardArea/StudentLists";




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


const Studentprofileform = () => {

  const { currentUser } = React.useContext(AuthContext);
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
      PimageUrl: "",
      skills: []

    }
  )

  const [StudentImg, SetStudentImg] = useState(null)
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    if (StudentImg) {
      setImageUrl(URL.createObjectURL(StudentImg));
    }
  }, [StudentImg]);
  const getImg = (e) => {
    SetStudentImg(e.target.files[0])
    console.log(StudentImg)
  }

  const getData = (e) => {
    // console.log(e.target.value)

    const { value, name } = e.target;
    // console.log(value,name)

    setStudentData(() => {
      return {
        ...StudentData,
        [name]: value,
        // ['skills']:tags


      }
    });

    console.log(StudentData)


  }

  const [tags, setTags] = React.useState([]);

  useEffect(() => {
 

    setStudentData(() => {
      return {
        ...StudentData,
        ['skills']: tags
        
  
  
      }
    });
  }, [tags])
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    console.log(tag)
    setTags([...tags,{
      "id" : tag.id,
      "text": tag.text 
    }]);
    console.log(tags);

    console.log(StudentData)
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  const submitHandler = async () => {
    console.log("inside submit handler");
    console.log(currentUser);
    const q = query(collection(db, "users"), where("uid", "==", currentUser.uid));
    const docs = await getDocs(q);
    const doc = docs.docs[0];
    console.log(doc);
    if (doc) {
      await updateDoc(doc.ref, {
        updatedProfile: true,
        details: {
          firstname: StudentData.firstname,
          lastname: StudentData.lastname,
          mobile: StudentData.mobile,
          location: StudentData.location,
          collname: StudentData.collname,
          degree: StudentData.degree,
          YOG: StudentData.YOG,
          skills: StudentData.skills
        }
      })
        .then(() => {
          // navigate("/Studentprofile");
        })
    }

  }




  return (
    <>
      <div class="container bootstrap snippet" id='studentformmain'>

        <div class="row mt-2">
          <div class="col-sm-3">
            {/* <!--left col--> */}


            <div class="text-center">

              {imageUrl && StudentImg && (
                <Box mt={2} textAlign="center">
                  {/* <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" alt="avatar" /> */}
                  <div id="StudentImage">
                    <img src={imageUrl} alt={StudentImg.name} height="100px" />
                  </div>
                </Box>
              )}
              <h6></h6>
              <label id='fileupload'> Upload Your Photo
                <input accept="image/" type="file" onChange={getImg} size="60" />
              </label>
            </div><hr /><br />

            <br />
            <div class="panel panel-default">
              <div class="panel-heading">Links<i class="fa fa-link fa-1x"></i></div>
              <hr />
              <div class="panel-body">
                <div class="form-group">

                  <div class="col-xs-12">
                    <label for="last_name"><h6>Github Link</h6></label>
                    <input type="text" class="form-control" onChange={getData} name="last_name" id="last_name" placeholder="Github lInk" title="enter your last name if any." />
                  </div>
                </div>
                <div class="form-group">

                  <div class="col-xs-12">
                    <label for="last_name"><h6>Linkedin</h6></label>
                    <input type="text" class="form-control" onChange={getData} name="last_name" id="last_name" placeholder="Linkedin Link" title="enter your last name if any." />
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


                      <label className="firstnamecls" for="first_name"><h3>First Name</h3></label>
                      <input type="text" onChange={getData} class="form-control " required name="firstname" id="first_name" placeholder="first name" title="enter your first name if any." />
                    </div>
                  </div>
                  <div class="form-group">

                    <div class="col-xs-12">
                      <label for="last_name"><h3>Last Name</h3></label>
                      <input type="text" onChange={getData} class="form-control" name="lastname" id="last_name" placeholder="last name" title="enter your last name if any." required />
                    </div>
                  </div>


                  <div class="form-group">
                    <div class="col-xs-12">
                      <label for="mobile"><h3>Mobile</h3></label>
                      <input type="number" onChange={getData} class="form-control" required name="mobile" id="mobile" placeholder="enter mobile number" title="enter your mobile number if any." />
                    </div>
                  </div>

                  <div class="form-group">

                    <div class="col-xs-12">
                      <label for="location"><h3>Location</h3></label>
                      <input type="text" onChange={getData} name='location' class="form-control" required id="location" placeholder="somewhere" title="enter a location" />
                    </div>
                  </div>
                  <div class="form-group">

                    <div class="col-xs-12">
                      <label for="collname"><h3>College/University Name</h3></label>
                      <input type="text" name='collname' onChange={getData} class="form-control" required id="" placeholder="college/University " title="enter a location" />
                    </div>
                  </div>
                  <div class="form-group">

                    <div class="col-xs-12">
                      <label for="degree"><h3>Degree</h3></label>
                      <input type="text" name='degree' onChange={getData} class="form-control" required id="dergree" placeholder="Name of Degree" title="enter degree" />
                    </div>
                  </div>


                  <div class="form-group">

                    <div class="col-xs-12 YearOf" >
                      <label for="YOG"><h3>Year of Graduation</h3></label>
                      <input  type="number" name='YOG' onChange={getData} class="form-control" required id="YOG" placeholder="Year of Graduation" title="enter year of passing" />
                    </div>
                  </div>


                  <div class="form-group skills">


                    <label className="skilllabel" for="Skills"><h3>Add Skills</h3>
                    
                    </label>
                    


                    <div className="skillsdiv">
                      <ReactTags
                        tags={tags}
                        suggestions={suggestions}
                        delimiters={delimiters}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        handleDrag={handleDrag}
                        handleTagClick={handleTagClick}
                        inputFieldPosition="bottom"
                        autocomplete
                        editable
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="col-xs-12">
                      <br />
                      <button class="btn btn-lg btn-success" onClick={submitHandler} type="button"><i className="fa-regular fa-folder-arrow-up"></i> Save</button>
                      <button class="btn btn-lg" type="reset"><i class="glyphicon glyphicon-repeat"></i> Reset</button>
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

export default Studentprofileform;












