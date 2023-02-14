import React from 'react'
import styles from './Profile.module.css'
import { useRef,useContext } from 'react'
import AuthContext from '../Context/AuthContext'
const Profile = () => {
  const AuthCtx = useContext(AuthContext)
  console.log('this is auth context',AuthCtx)
  const fullNameInputRef = useRef()
  const ProPicInputRef = useRef()
  
  const updateDetailsHandler = (event) => {
      event.preventDefault()
      const enteredFullName = fullNameInputRef.current.value;
      const enteredProPicUrl = ProPicInputRef.current.value;
    const userToken = AuthCtx.token
    console.log('user token',userToken)
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDvwujA3wobuKDwp_QaEd25aDq_k01ZHWY',{
      method:"POST",
      body: JSON.stringify({
        idToken:userToken,
        displayName:enteredFullName,
        photoUrl:enteredProPicUrl,
        returnSecureToken:true,
      }),
      
      headers: {
        "Content-Type":"application/json"
      }
    }).then((res) => {
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
     console.log(res)
    }).catch((err) => {
      alert(err.message)
    })
  }

  return (
    <React.Fragment>
    <header className={styles.header}>
     <div style={{marginRight:"auto"}}>
      <p>"Winners never quit,quitters never win"</p>
     </div>
     <div className={styles.porfileUpdation} style={{marginLeft:"auto"}}>
      <p>Your Profile is 64% completed.A complete Profile has</p>
      <p>higher chances of landing a job <a style={{color:"blue"}}>complete now</a></p>
     </div>
    </header>
    
    <section className={styles.contactForm}>
      <div className={styles.contactContainer}>
      <h3>Contact Details</h3>
      <button className={styles.cancelBtn}>Cancel</button>
      </div>
      <form className={styles.form}>
        <label className={styles.label} type="text"><h4>Full Name: </h4></label>
        <input className={styles.input} ref={fullNameInputRef}/>
        <label className={styles.label} style={{marginLeft:"40px"}} type="text"><h4>Profile Photo URL: </h4></label>
        <input className={styles.input} ref={ProPicInputRef}/>
      </form>
      <div>
      <button className={styles.updateBtn} onClick={updateDetailsHandler}>Update</button>
      </div>
    </section>
    </React.Fragment>
  )
}

export default Profile