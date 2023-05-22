import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Model.css'

const Model = (props) => {
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
              I will not close if you click outside me. Don't even try to press
              escape key.
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