import React, { useState } from 'react';
import { Button } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import './Model.css'

const StartUpDetailModel = (props) => {
  const data = props.sData;
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
            <Modal.Header >
              <Modal.Title>{data?.sid}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="JobDescStudDetails">
                <ul class="list-unstyled mb-1-9">
                  <li class="mb-2 mb-xl-3 display-28">
                    <span class="display-26 span1  me-2 font-weight-600">
                      StartUp Name:
                    </span>
                    <span class="display-26 span2 me-2 font-weight-600">
                     {data?.StartUpName} 
                    </span>

                    <hr />

                  </li>
                  <li class="mb-2 mb-xl-3 display-28">
                    <span class="display-26 span1 me-2 font-weight-600">
                      Founder Name:
                    </span>
                    <span class="display-26 span2 me-2 font-weight-600">
                     {data?.FounderName} 
                    </span>

                    <hr />

                  </li>
                  <li class="mb-2 mb-xl-3 display-28">
                    <span class="display-26 span1 me-2 font-weight-600">
                      Contact No:
                    </span>
                    <span class="display-26 span2 me-2 font-weight-600">
                     {data?.ContactNumber} 
                    </span>

                    <hr />

                  </li>
                  <li class="mb-2 mb-xl-3 display-28">
                    <span class="display-26 span1 me-2 font-weight-600">
                      Email:
                    </span>
                    <span class="display-26 span2 me-2 font-weight-600">
                      {data?.StartUpEmail} 
                    </span>

                    <hr />

                  </li>
                  <li class="mb-2 mb-xl-3 display-28">
                    <span class="display-26 span1 me-2 font-weight-600">
                      Website:
                    </span>
                    <span class="display-26 span2 me-2 font-weight-600">
                  <a className='modelweblinkanchr' href="#">dummy</a>
                    </span>

                    <hr />

                  </li>
                  <li class="mb-2 mb-xl-3 display-28">
                    <span class="display-26 span1 me-2 font-weight-600">
                      Address: 
                    </span>
                    <span class="display-26 span2 me-2 font-weight-600">
                     {data?.location} 
                    </span>

                    <hr />

                  </li>
                  <li class="mb-2 mb-xl-3 display-28">
                    <span class="display-26 span1 me-2 font-weight-600">
                      Domain: 
                    </span>
                    <span class="display-26 span2 me-2 font-weight-600">
                     <Button className='starupmodedomain' variant='contained'>skil1</Button>
                    </span>
                    {/* <hr /> */}

                  </li>
          
                  
                </ul>
              </div>
            </Modal.Body>
            <Modal.Footer>
         
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
export default StartUpDetailModel