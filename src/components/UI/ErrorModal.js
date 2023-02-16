import React from 'react'
import { Modal,Button } from 'react-bootstrap'
const ErrorModal = (props) => {
  console.log('this is error modal')
  return (
   <div>     
         <Modal show={props.onShow} className="bg-transparent " onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Something went wrong....</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
  )
}

export default ErrorModal