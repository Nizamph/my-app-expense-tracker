import React, { useContext,useState } from 'react'
import styles from './ExpenseTracker.module.css'
import { Link, Navigate } from 'react-router-dom'
import AuthContext from '../Context/AuthContext'
import Button from 'react-bootstrap/Button';
import ErrorModal from './UI/ErrorModal';
import { useNavigate } from 'react-router-dom';
const ExpenseTrackerWelcome = () => {
  const AuthCtx = useContext(AuthContext)
  const token = AuthCtx.token
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const[isVerified,setIsVerified] = useState(false)
  const navigate = useNavigate()



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
      navigate("/ExpenseForm")
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


  const logoutHandler = () => {
    AuthCtx.logout()
    navigate("/Login", {replace:true} )
  }

  return (
    <React.Fragment>
    <div className={styles.header}> 
    <p style={{marginRight:"500px",marginTop:"15px"}}>welcome to ExpenseTracker</p>
     <Button style={{backgroundColor:"rgb(113, 34, 34",border:"none"}} onClick={logoutHandler}>logout</Button>
     <p className={styles.completeProf}>Your Profile is incomplete <Link to="/Profile" style={{color:"lightblue",textDecoration:"none"}}>complete it now</Link></p>
    </div>
    <section className={styles.verifyContainer}>
      <div>
      <p className={styles.verifyContent}>Verify Your Email to move forward</p>
     {!isVerified && !isLoading &&  <button className={styles.verifyBtn} onClick={verifyEmailHandler}>Verify</button>}
     {isLoading && <h4 style={{color:"rgb(113, 34, 34)",marginLeft:"100px"}}>verifying.....</h4>}
     {isVerified && <h4 style={{color:"rgb(113, 34, 34)",marginLeft:"50px"}}>verified successfully</h4>}
      </div>
     <ErrorModal
     onShow={show}
     onClose={handleClose}
     error={error}
     />
    </section>
    </React.Fragment>
  )
}

export default ExpenseTrackerWelcome;