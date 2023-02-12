import React from 'react'
import styles from './Signup.module.css'
import { useRef } from 'react'
const SignupForm = () => {
  const emailInputRef = useRef()
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  

  const onSubmitHandler = (event) => {
    event.preventDefault()
    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value
    const enteredConfirmPassword = confirmPasswordInputRef.current.value
    if(enteredPassword === enteredConfirmPassword) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvwujA3wobuKDwp_QaEd25aDq_k01ZHWY',
      {
        method:"POST",
        body:JSON.stringify(
          {
            email:enteredEmail,
            password:enteredPassword
          }
        ),
        returnSecureToken: true,
        headers: {
          "Content-Type":"application/json"
        }
      }
      )
      .then((res) => {
        if(res.ok) {
          return res.json()
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed'
            if(data && data.error && data.error.message) {
              throw new Error(errorMessage)
            }
          })
        }
      }).then((data) => {
        console.log(data)
      }).catch((err) => {
        alert(err.message)
      })
    }else {
      alert("Password and confirm password are not matching")
    }
  }

  
  
  
  return (      
    <React.Fragment>
    <div className={styles.background}>
    <div className={styles.signUpContainer} >
      <div className={styles.signUpBorder}>
        <div className={styles.signUp}>Sign Up</div>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <input className={styles.input} type="email" placeholder='Email'  ref={emailInputRef} required/>
          <input className={styles.input} type="password" placeholder='Password' ref={passwordInputRef}  required/>
          <input className={styles.input}  type="password" placeholder='confirm Password' ref={confirmPasswordInputRef}  required/>
          <button className={styles.signUpbtn}>Sign Up</button>
        </form>
      </div>
      <button className={styles.AccountButton}>Have an account? Login</button>
    </div>
    </div>
    </React.Fragment>
  )
}

export default SignupForm;