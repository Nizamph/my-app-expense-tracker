import React, { useState,useEffect } from 'react'
import styles from './Profile.module.css'
// import AuthContext from '../Context/AuthContext'
import ErrorModal from './UI/ErrorModal'
import { useSelector } from 'react-redux'
const Profile = () => {
  const userToken = useSelector(state => state.auth.idToken)
  const userEmail = useSelector(state => state.auth.email)
  // const AuthCtx = useContext(AuthContext)
  const [updatename,setUpdateName] = useState('')
  const [updatePhotoUrl,setUpdatePhotoUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const updateDetailsHandler = (event) => {
      event.preventDefault()

      setIsLoading(true)
    // const userToken = AuthCtx.token
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDvwujA3wobuKDwp_QaEd25aDq_k01ZHWY',{
      method:"POST",
      body: JSON.stringify({
        idToken: userToken,
        displayName:updatename,
        photoUrl:updatePhotoUrl,
        returnSecureToken:true,
      }),    
      headers: {
        "Content-Type":"application/json"
      }
    }).then((res) => {
      setIsLoading(false)
      if(res.ok) {
        return res.json()
      }else {
        let errorMessage = 'Updation Failed'
         const data = res.json()
        if(data && data.error && data.error.message) {
          errorMessage = data.error.message
        }
        throw new Error(errorMessage)
      }
    }).then((res) => {
     console.log('from post',res)
    }).catch((err) => {
      alert(err.message)
    })
  }
  // console.log('this is email from profile',AuthCtx.email)
  useEffect(() => {
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDvwujA3wobuKDwp_QaEd25aDq_k01ZHWY',{
      method:"POST",
      body:JSON.stringify({
        idToken:userToken
      }),
      headers: {
        'Content-Type':'application/json'
      }
    }).then((res) => {
      if(res.ok){
        return res.json()
      }else{
        let errorMessage="Something went wrong"
        throw new Error(errorMessage)
      }
    }).then((res) =>{
      console.log('from useEfect',res)
      setUpdateName(res.users[0].displayName)
      setUpdatePhotoUrl(res.users[0].photoUrl)
    }).catch((err) => {
      alert(err.message)
    })
  },[userToken])

  const updateNameHandler = (event) => {
    setUpdateName(event.target.value)
  }

  const updatePhotoUrlHandler = (event) => {
    setUpdatePhotoUrl(event.target.value)
  }
  
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [isVeriLoading,setVeriLoading] = useState(false);
  const[isVerified,setIsVerified] = useState(false)

  
  const handleClose = () => setShow(false);
 
  // const token = AuthCtx.token
  const verifyEmailHandler = async(event) => {
    event.preventDefault();
    setVeriLoading(true)
    try{
      const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDvwujA3wobuKDwp_QaEd25aDq_k01ZHWY",{
        method:"POST",
        body: JSON.stringify({
          requestType:"VERIFY_EMAIL",
          idToken: userToken
        }),
        headers: {
          "Content-Type":"application/json"
        }
    })
    setVeriLoading(false)
    if(response.ok) {
      const data = await response.json()
      console.log('from verified email',data)
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
    
    <section className={styles.contactForm}>
    <h2 style={{textAlign:"center"}}>Update Your Profile</h2>
      <div className={styles.contactContainer}>
      <h3>Contact Details</h3>
      <button className={styles.cancelBtn}>Cancel</button>
      </div>
      <form className={styles.form}>
        <label className={styles.label} type="text"><h4>Full Name: </h4></label>
        <input className={styles.input} value={updatename} onChange={updateNameHandler}/>
        <label className={styles.label}  style={{marginLeft:"40px"}} type="text"><h4>Profile Photo URL: </h4></label>
        <input className={styles.input} value={updatePhotoUrl}  onChange={updatePhotoUrlHandler}/>
      </form>
      <div>
      {!isLoading && <button className={styles.updateBtn} onClick={updateDetailsHandler}>Update</button>}
      {isLoading && <p>Updating....</p>}
      </div>
    </section>
    <div className={styles.verify}>
    <h3>Verify Your Email Address</h3>
    <i className={styles.p}>you've entered <strong>{userEmail}</strong> as the email address for your account.</i>
      <i className={styles.p}>Please Verify this email by clicking button below.</i>

      {!isVerified && !isVeriLoading &&  <button className={styles.verifyBtn} onClick={verifyEmailHandler}>Verify</button>}
     {isVeriLoading && <h4 style={{color:"rgb(113, 34, 34)",marginLeft:"100px"}}>verifying.....</h4>}
     {isVerified && <h4 style={{color:"rgb(113, 34, 34)",marginLeft:"50px"}}>verified successfully</h4>}
      </div>
     <ErrorModal
     onShow={show}
     onClose={handleClose}
     error={error}
     /> 
    </React.Fragment>
  )
}

export default Profile