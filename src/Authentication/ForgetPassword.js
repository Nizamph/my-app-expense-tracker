import React from 'react';
import styles from './Auth.module.css';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import ErrorModal from '../components/UI/ErrorModal';
import background from '../BackgroundPic/login.jpg';
const ForgetPassword = () => {
  const emailInputRef = useRef();
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckout, setIsCheckOut] = useState(false);
  const forgetPasswordHandler = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const enteredEmail = emailInputRef.current.value;
      console.log(enteredEmail);
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDvwujA3wobuKDwp_QaEd25aDq_k01ZHWY',
        {
          method: 'POST',
          body: JSON.stringify({
            requestType: 'PASSWORD_RESET',
            email: enteredEmail,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setIsLoading(false);
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setIsCheckOut(true);
        setTimeout(() => {
          setIsCheckOut(false);
        }, 3000);
      } else {
        let errorMessage = 'Attempt Failed!!!';
        const data = await response.json();

        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
      setShowModal(true);
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
            <div className={styles.signUp}>Forget Password??</div>
            <div className={styles.forgetDescription}>
              <div>Enter the email address associated with your account </div>
              <div> and we'll send you link to reset your password</div>
            </div>
            <form
              className={styles.form}
              onSubmit={forgetPasswordHandler}>
              <input
                className={styles.input}
                type='email'
                placeholder='Email'
                ref={emailInputRef}
                required
              />
              {!isLoading && (
                <button className={styles.signUpbtn}>Continue</button>
              )}
              {isLoading && (
                <p style={{ color: 'white', textAlign: 'center' }}>
                  sending...
                </p>
              )}
              {isCheckout && (
                <p style={{ color: 'white', textAlign: 'center' }}>
                  please Checkout Your Email
                </p>
              )}
            </form>
          </div>
          <Link
            to='/'
            style={{
              textDecoration: 'none',
              color: 'white',
              marginTop: '7px',
            }}>
            Do you have an account? Log in
          </Link>
        </div>
      </div>

      <ErrorModal
        onClose={() => setShowModal(false)}
        onShow={showModal}
        error={error}
      />
    </React.Fragment>
  );
};

export default ForgetPassword;
