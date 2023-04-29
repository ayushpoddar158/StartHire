// Authentication @Firebase 
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Auth } from "../Firebase";
import { AuthContext } from "../Authorizer";

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
  const [StartUpData, setStartUpData] = useState(
    {
      firstname: "",
      lastname: "",
      mobile: "",
      location: "",
      collname: "",
      degree: "",
      YOG: "",
      skills: ""

    }
  )

  const getData = (e) => {
    // console.log(e.target.value)

    const { value, name } = e.target;
    // console.log(value,name)

    setStartUpData(() => {
      return {
        ...StartUpData,
        [name]: value


      }
    });

    // console.log(inpVal)


  }

  const [tags, setTags] = React.useState([
    { id: 'C', text: 'C' },

  ]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
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
          firstname: StartUpData.firstname,
          lastname: StartUpData.lastname,
          mobile: StartUpData.mobile,
          location: StartUpData.location,
          collname: StartUpData.collname,
          degree: StartUpData.degree,
          YOG: StartUpData.YOG
          // skills: tags
        }
      })
        .then(() => {
          navigate("/Studentprofile");
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
              <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" alt="avatar" />
              <h6>Upload Your Logo Here</h6>
              <input type="file" class="text-center center-block file-upload" />
            </div><hr /><br />

            <br />
            <div class="panel panel-default">
              <div class="panel-heading">Links<i class="fa fa-link fa-1x"></i></div>
              <hr />
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
                  <div class="form-group">

                    <div class="col-xs-6">


                      <label for="first_name"><h4>First Name</h4></label>
                      <input type="text" onChange={getData} class="form-control" required name="firstname" id="first_name" placeholder="first name" title="enter your first name if any." />
                    </div>
                  </div>
                  <div class="form-group">

                    <div class="col-xs-6">
                      <label for="last_name"><h4>Last Name</h4></label>
                      <input type="text" onChange={getData} class="form-control" name="lastname" id="last_name" placeholder="last name" title="enter your last name if any." required />
                    </div>
                  </div>


                  <div class="form-group">
                    <div class="col-xs-6">
                      <label for="mobile"><h4>Mobile</h4></label>
                      <input type="number" onChange={getData} class="form-control" required name="mobile" id="mobile" placeholder="enter mobile number" title="enter your mobile number if any." />
                    </div>
                  </div>

                  <div class="form-group">

                    <div class="col-xs-6">
                      <label for="location"><h4>Location</h4></label>
                      <input type="text" onChange={getData} name='location' class="form-control" required id="location" placeholder="somewhere" title="enter a location" />
                    </div>
                  </div>
                  <div class="form-group">

                    <div class="col-xs-6">
                      <label for="collname"><h4>College/University Name</h4></label>
                      <input type="text" name='collname' onChange={getData} class="form-control" required id="" placeholder="college/University " title="enter a location" />
                    </div>
                  </div>
                  <div class="form-group">

                    <div class="col-xs-6">
                      <label for="degree"><h4>Degree</h4></label>
                      <input type="text" name='degree' onChange={getData} class="form-control" required id="dergree" placeholder="Name of Degree" title="enter degree" />
                    </div>
                  </div>


                  <div class="form-group">

                    <div class="col-xs">
                      <label for="YOG"><h4>Year Of Graduation</h4></label>
                      <input type="number" name='YOG' onChange={getData} class="form-control" required id="YOG" placeholder="Year of Graduation" title="enter year of passing" />
                    </div>
                  </div>


                  <div class="form-group">


                    <label for="Skills"><h4>Add Skills</h4></label>


                    <div>
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












