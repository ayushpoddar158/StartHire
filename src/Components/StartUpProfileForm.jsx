import React from 'react'

import { useState } from 'react';
import { render } from 'react-dom';
import { StartUpDomain } from '../assets/StartUpDomain';
import { WithContext as ReactTags } from 'react-tag-input';
import "../style/Studentprofileform.css"

const suggestions = StartUpDomain.map((Sdomian) => {
    return {
      id: Sdomian,
      text: Sdomian,
    };
  });


  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];  


const StartUpprofileForm = () => {

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




  return (
<>
    <div class="container bootstrap snippet" id='studentformmain'>
    {/* <div class="row">
  		<div class="col-sm-10"><h1>Create Profile</h1></div>
    	<div class="col-sm-2"><a href="/users" class="pull-right"><img title="profile image" class="img-circle img-responsive" src="http://www.gravatar.com/avatar/28fd20ccec6865e2d5f0e1f4446eb7bf?s=100"/></a></div>
    </div> */}
    <div class="row mt-2">
  		<div class="col-sm-3">
        {/* <!--left col--> */}
              

      <div class="text-center">
        <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" alt="avatar"/>
        <h6>Upload StartUp Logo...</h6>
        <input type="file" class="text-center center-block file-upload"/>
      </div><hr/><br/>

               <br />
          <div class="panel panel-default">
            <div class="panel-heading">Links<i class="fa fa-link fa-1x"></i></div>
            <hr />
            <div class="panel-body">     
            <div class="form-group">
                          
                          <div class="col-xs-6">
                            <label for="StartUp_Email"><h6>Github link</h6></label>
                              <input type="text" class="form-control" name="StartUp_Email" id="StartUp_Email" placeholder="Github lInk" title="enter your last name if any."/>
                          </div>
                      </div>
            <div class="form-group">
                          
                          <div class="col-xs-6">
                            <label for="StartUp_Email"><h6>Linkedin</h6></label>
                              <input type="text" class="form-control" name="StartUp_Email" id="StartUp_Email" placeholder="Linkedin Link" title="enter your last name if any."/>
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
                <hr/>
                  <form class="form" action="##" method="post" id="registrationForm">
                      <div class="form-group">
                          
                          <div class="col-xs-6">
                              <label for="StartUp_name"><h4>Start Up Name</h4></label>
                              <input type="text" class="form-control" name="StartUp_name" required id="StartUp_name" placeholder="StartUp Name" title="enter yourStartUp  name if any."/>
                          </div>
                      </div>
                      <div class="form-group">
                          
                          <div class="col-xs-6">
                            <label for="StartUp_Email"><h4>Start Up Email</h4></label>
                              <input type="email" class="form-control" name="StartUp_Email" required id="StartUp_Email" placeholder="StartUp Email" title="enter your StarUp  email if any."/>
                          </div>
                      </div>
          
                      <div class="form-group">
                          
                          <div class="col-xs-6">
                              <label for="FounderName"><h4>Founder Name</h4></label>
                              <input type="text" class="form-control" name="FounderName" id="FounderName" placeholder="Enter Founder Name" title="enter your FounderName number if any."/>
                          </div>
                      </div>
          
                      <div class="form-group">
                          <div class="col-xs-6">
                             <label for="FounderEmail"><h4>Founder Email</h4></label>
                              <input type="text" class="form-control" name="FounderEmail" id="FounderEmail" placeholder="Enter Founder Email " title="enter your FounderEmail number if any."/>
                          </div>
                      </div>
                   
                      <div class="form-group">
                          
                          <div class="col-xs-6">
                              <label for="email"><h4>Location</h4></label>
                              <input type="email" class="form-control" id="location" placeholder="somewhere" title="enter a location"/>
                          </div>
                      </div>
                    
                    
                      <div class="form-group">
                          
                          <div class="col-xs-6">
                              <label for="StartUpDesccription"><h4>StarUp Description</h4></label>
                              <textarea  class="form-control" id="StartUpDesccription" placeholder="StartUp Desccription" title="enter StartUp Desccription"/>
                          </div>
                      </div>
                      <div class="form-group">
                          
                          {/* <div class="col-xs-6">
                              <label for="email"><h4>Skills</h4></label>
                              <input type="email" class="form-control" id="location" placeholder="somewhere" title="enter a location"/>
                          </div> */}
                          <label for="Skills"><h4>ADD Domain</h4></label>
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
                                <br/>
                              	<button class="btn btn-lg btn-success" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Save</button>
                               	<button class="btn btn-lg" type="reset"><i class="glyphicon glyphicon-repeat"></i> Reset</button>
                            </div>
                      </div>
              	</form>
              
              <hr/>
              
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

export default StartUpprofileForm;