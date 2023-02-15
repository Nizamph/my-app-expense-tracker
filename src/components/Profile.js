import React, { useState,useContext,useEffect } from 'react'
import styles from './Profile.module.css'
import AuthContext from '../Context/AuthContext'
const Profile = () => {
  const AuthCtx = useContext(AuthContext)
  const [updatename,setUpdateName] = useState('')
  const [updatePhotoUrl,setUpdatePhotoUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const updateDetailsHandler = (event) => {
      event.preventDefault()
      setIsLoading(true)
    const userToken = AuthCtx.token
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDvwujA3wobuKDwp_QaEd25aDq_k01ZHWY',{
      method:"POST",
      body: JSON.stringify({
        idToken:userToken,
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

  useEffect(() => {
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDvwujA3wobuKDwp_QaEd25aDq_k01ZHWY',{
      method:"POST",
      body:JSON.stringify({
        idToken:AuthCtx.token
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
  },[AuthCtx.token])

  const updateNameHandler = (event) => {
    setUpdateName(event.target.value)
  }

  const updatePhotoUrlHandler = (event) => {
    setUpdatePhotoUrl(event.target.value)
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
        <input className={styles.input} value={updatename} onChange={updateNameHandler}/>
        <label className={styles.label}  style={{marginLeft:"40px"}} type="text"><h4>Profile Photo URL: </h4></label>
        <input className={styles.input} value={updatePhotoUrl}  onChange={updatePhotoUrlHandler}/>
      </form>
      <div>
      {!isLoading && <button className={styles.updateBtn} onClick={updateDetailsHandler}>Update</button>}
      {isLoading && <p>Updating....</p>}
      </div>
    </section>
    </React.Fragment>
  )
}

export default Profile