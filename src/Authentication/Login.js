import React from 'react';
import styles from './Auth.module.css';
import { useState,useRef,useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const[isLoading,setIsLoading] = useState(false)
  
  const AuthCtx = useContext(AuthContext)

  const navigate = useNavigate()

  const loginSubmitHandler = async(event) => {
    try {
      event.preventDefault()
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;  
      setIsLoading(true)
     const response = await  fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDvwujA3wobuKDwp_QaEd25aDq_k01ZHWY',
      {
       method:"POST",
       body:JSON.stringify({
         email:enteredEmail,
         password:enteredPassword
       }),
       headers:{
         "Content-Type":"application/json"
       }
      }
      )
      setIsLoading(false)
      if(response.ok) {
        const data = await response.json()
        AuthCtx.login(data.tokenId)
        navigate('/ExpenseTracker')
      }else {
        let errorMessage = 'Authentication failed';
        const data  = await response.json()
        if(data && data.error && data.error.message){
          errorMessage = data.error.message
          
        }
        throw new Error(errorMessage)
        
      }
    }catch(err) {
      alert(err.message)
    } 
  }             
  return (
    <React.Fragment>
    <div className={styles.background}>
    <div className={styles.signUpContainer} >
      <div className={styles.signUpBorder}>
        <div className={styles.signUp}>Login</div>
        <form className={styles.form} onSubmit={loginSubmitHandler}>
          <input className={styles.input} type="email" placeholder='Email' ref={emailInputRef}  required/>
          <input className={styles.input} type="password" placeholder='Password' ref={passwordInputRef} required/>
         {!isLoading && <button className={styles.signUpbtn}>Log in</button>} 
         {isLoading && <p style={{color:"white",textAlign:"center"}} >Loading...</p>}
           <a>Forgot password</a>
        </form>
      </div>
      <button className={styles.AccountToggler}>Dont have an account? Sign up</button>
    </div>
    </div>
    </React.Fragment>
  )
}

export default Login;