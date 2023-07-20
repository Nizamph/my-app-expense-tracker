import React from 'react';
import styles from './Auth.module.css';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background from '../BackgroundPic/login.jpg';
const SignupForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;
    if (enteredPassword === enteredConfirmPassword) {
      setIsLoading(true);
      fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDvwujA3wobuKDwp_QaEd25aDq_k01ZHWY',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
          }),
          returnSecureToken: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              console.log(data);
              let errorMessage = 'Authentication failed';
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
                throw new Error(errorMessage);
              }
            });
          }
        })
        .then((data) => {
          console.log(data);
          navigate('/');
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert('Password and confirm password are not matching');
    }
  };

  return (
    <React.Fragment>
      <div className={styles.background}>
      <div className={styles.imageContainer}>
          <img
            src={background}
            alt='emailPic'
            className={styles.bgImage}
          />
        </div>
        <div className={styles.signUpContainer}>
          <div className={styles.signUpBorder}>
            <div className={styles.signUp}>Sign Up</div>
            <form
              className={styles.form}
              onSubmit={onSubmitHandler}>
              <input
                className={styles.input}
                type='email'
                placeholder='Email'
                ref={emailInputRef}
                required
              />
              <input
                className={styles.input}
                type='password'
                placeholder='Password'
                ref={passwordInputRef}
                required
              />
              <input
                className={styles.input}
                type='password'
                placeholder='confirm Password'
                ref={confirmPasswordInputRef}
                required
              />
              {!isLoading && (
                <button className={styles.signUpbtn}>Sign Up</button>
              )}
              {isLoading && (
                <p style={{ color: 'white', textAlign: 'center' }}>
                  Loading...
                </p>
              )}
            </form>
          </div>
          <button className={styles.AccountButton}>
            <Link
              to='/'
              style={{ textDecoration: 'none', color: 'white' }}>
              Have an account? Login
            </Link>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignupForm;
