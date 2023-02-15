import React, { useContext,useState } from 'react'
import styles from './ExpenseTracker.module.css'
import { Link } from 'react-router-dom'
import AuthContext from '../Context/AuthContext'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ExpenseTracker = () => {
  const AuthCtx = useContext(AuthContext)
  const token = AuthCtx.token
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const[isVerified,setIsVerified] = useState(false)
  const handleClose = () => setShow(false);
  const verifyEmailHandler = async(event) => {
    event.preventDefault();
    setIsLoading(true)
    try{
      const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDvwujA3wobuKDwp_QaEd25aDq_k01ZHWY",{
        method:"POST",
        body: JSON.stringify({
          requestType:"VERIFY_EMAIL",
          idToken: token
        }),
        headers: {
          "Content-Type":"application/json"
        }
    })
    setIsLoading(false)
    if(response.ok) {
      const data = await response.json()
      console.log(data)
      setIsVerified(true)
    }else {
      let errorMessage = 'Verification failed';
      const data = await response.json()
      if(data && data.error && data.error.message) {
       errorMessage = data.error.message
      }
      throw new Error(errorMessage)
    }
   
    }catch(err) {
      setShow(true)
      setError(err.message) 
    }

  }


  return (
    <React.Fragment>
    <div className={styles.header}> 
    <p style={{marginRight:"500px"}}>welcome to ExpenseTracker</p>
     <p className={styles.completeProf}>Your Profile is incomplete <Link to="/Profile" style={{color:"lightblue",textDecoration:"none"}}>complete it now</Link></p>
    </div>
    <section className={styles.verifyContainer}>
      <div>
      <p className={styles.verifyContent}>Verify Your Email to move forward</p>
     {!isVerified && !isLoading &&  <button className={styles.verifyBtn} onClick={verifyEmailHandler}>Verify</button>}
     {isLoading && <h4 style={{color:"rgb(113, 34, 34)",marginLeft:"100px"}}>verifying.....</h4>}
     {isVerified && <h4 style={{color:"rgb(113, 34, 34)",marginLeft:"50px"}}>verified successfully</h4>}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Something went wrong....</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
    </React.Fragment>
  )
}

export default ExpenseTracker;