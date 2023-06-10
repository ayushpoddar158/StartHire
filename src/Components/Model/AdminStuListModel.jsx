import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Model.css'

const AdminStuListModel = (props) => {
  const data = props.userData;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} className="AdminViewdetailsJObDesc" varient="contained" >View</Button>
      <div className="container666">


        <Modal className='model'
          show={show}
          onHide={handleClose}
          // backdrop="static"
          keyboard={false}



        >
          <div className="modelhead">
            <Modal.Header >
              <Modal.Title>{data?.sid}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="JobDescStudDetails">
                <ul class="list-unstyled mb-1-9">
                  <li class="mb-2 mb-xl-3 display-28">
                    <span class="display-26 span1  me-2 font-weight-600">
                      Name :
                    </span>
                    <span class="display-26 span2 me-2 font-weight-600">
                     {data?.ProfileName} 
                    </span>

                    <hr />
                    <span class="display-26 span1  me-2 font-weight-600">
                      Gender:
                    </span>
                    <span class="display-26 span2 me-2 font-weight-600">
                     {data?.gender} 
                    </span>

                    <hr />

                  </li>
                  <li class="mb-2 mb-xl-3 display-28">
                    <span class="display-26 span1 me-2 font-weight-600">
                      Location:
                    </span>
                    <span class="display-26 span2 me-2 font-weight-600">
                     {data?.location} 
                    </span>

                    <hr />

                  </li>
                  <li class="mb-2 mb-xl-3 display-28">
                    <span class="display-26 span1 me-2 font-weight-600">
                      College/University:
                    </span>
                    <span class="display-26 span2 me-2 font-weight-600">
                     {data?.College} 
                    </span>

                    <hr />

                  </li>
                  <li class="mb-2 mb-xl-3 display-28">
                    <span class="display-26 span1 me-2 font-weight-600">
                      Degree:
                    </span>
                    <span class="display-26 span2 me-2 font-weight-600">
                      {data?.Degree} 
                    </span>

                    <hr />

                  </li>
                  <li class="mb-2 mb-xl-3 display-28">
                    <span class="display-26 span1 me-2 font-weight-600">
                      Degree Status:
                    </span>
                    <span class="display-26 span2 me-2 font-weight-600">
                     {data?.DegreeStatus} 
                    </span>

                    <hr />

                  </li>
                  <li class="mb-2 mb-xl-3 display-28">
                    <span class="display-26 span1 me-2 font-weight-600">
                      Year Of Passing:
                    </span>
                    <span class="display-26 span2 me-2 font-weight-600">
                     {data?.YOG} 
                    </span>

                    <hr />

                  </li>
                  <li class="mb-2 mb-xl-3 display-28">
                    <span class="display-26 span1 me-2 font-weight-600">
                      About:
                    </span>
                    <span class="display-26 span2 me-2 font-weight-600">
                     {data?.about} 
                    </span>

                    <hr />

                  </li>
                  <li class="mb-2 mb-xl-3 display-28">
                    <span class="display-26 span1 me-2 font-weight-600">
                      Certifications and Awards:
                    </span>
                    <span class="display-26 span2 me-2 font-weight-600">
                     {data?.awardsAndCert == "" ? "None" :  data?.awardsAndCert} 
                    </span>

                    {/* <hr /> */}

                  </li>
                  
                </ul>
              </div>
            </Modal.Body>
            <Modal.Footer>
            {/* <hr /> */}
              <Button variant="secondary" className='closebtnmodel' onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    </>
  );
}
export default AdminStuListModel