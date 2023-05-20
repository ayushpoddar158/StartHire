import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Model.css'

const Model=(props)=> {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} className="ViewdetailsJObDesc" varient="contained" >View</Button>
<div className="container666">


      <Modal className='model'
        show={show}
        onHide={handleClose}
        // backdrop="static"
        keyboard={false}
        
        
        
      >
      <div className="modelhead">
        <Modal.Header closeButton>
          <Modal.Title>{props.uname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="JobDescStudDetails">
                <ul class="list-unstyled mb-1-9">
                <li class="mb-2 mb-xl-3 display-28">
                                <span class="display-26 text-secondary me-2 font-weight-600">
                                 Gender
                                </span>
                                <span class="display-26 text-primary me-2 font-weight-600">
                                 Male
                                </span>
                                
                                <hr />

                              </li>
                <li class="mb-2 mb-xl-3 display-28">
                                <span class="display-26 text-secondary me-2 font-weight-600">
                                 Address:
                                </span>
                                <span class="display-26 text-primary me-2 font-weight-600">
                                 Bbsr
                                </span>
                                
                                <hr />

                              </li>
                <li class="mb-2 mb-xl-3 display-28">
                                <span class="display-26 text-secondary me-2 font-weight-600">
                                 College/University:
                                </span>
                                <span class="display-26 text-primary me-2 font-weight-600">
                                 Nalanda 
                                </span>
                                
                                <hr />

                              </li>
                <li class="mb-2 mb-xl-3 display-28">
                                <span class="display-26 text-secondary me-2 font-weight-600">
                                 Degree:
                                </span>
                                <span class="display-26 text-primary me-2 font-weight-600">
                                 B-Tech
                                </span>
                                
                                <hr />

                              </li>
                <li class="mb-2 mb-xl-3 display-28">
                                <span class="display-26 text-secondary me-2 font-weight-600">
                                 Degree Status:
                                </span>
                                <span class="display-26 text-primary me-2 font-weight-600">
                                 Completed
                                </span>
                                
                                <hr />

                              </li>
                <li class="mb-2 mb-xl-3 display-28">
                                <span class="display-26 text-secondary me-2 font-weight-600">
                                 Year Of Passing
                                </span>
                                <span class="display-26 text-primary me-2 font-weight-600">
                                 2023
                                </span>
                                
                                <hr />

                              </li>
                <li class="mb-2 mb-xl-3 display-28">
                                <span class="display-26 text-secondary me-2 font-weight-600">
                                 About 
                                </span>
                                <span class="display-26 text-primary me-2 font-weight-600">
                                 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex necessitatibus exercitationem cum alias nam a voluptatibus repellendus impedit eius distinctio quibusdam fuga neque temporibus dolore tempora et, corporis totam recusandae?
                                </span>
                                
                                <hr />

                              </li>
                </ul>
                </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
        </div>
      </Modal>
      </div>
    </>
  );
}
export default Model