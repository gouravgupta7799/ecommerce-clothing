import { useState, useRef, useContext } from 'react';
import AuthContext from '../ContextStore/Auth-Context';
import classes from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom'
import { CartContext } from '../ContextStore/Cart-Context';
const mainUrl = 'http://localhost:4000/auth'

const AuthForm = () => {
  const navigation = useNavigate()
  const authctx = useContext(AuthContext)
  const cartCtx = useContext(CartContext);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const userNameRef = useRef();
  const [isLogInForm, setIsLogInForm] = useState(true);


  const submitFormHandler = async (event) => {
    event.preventDefault();

    let url;
    let enteredEmail;
    let enteredPassword;
    let confirmPassword;
    let userName;
    let AuthinactionDetails;
    try {

      if (!isLogInForm) {
        enteredEmail = emailRef.current.value
        enteredPassword = passwordRef.current.value
        confirmPassword = confirmPasswordRef.current.value
        userName = userNameRef.current.value

        if (enteredEmail && enteredPassword && confirmPassword) {
          if (enteredPassword !== confirmPassword) {
            let errorMessage = "Check your password again"
            throw new Error(errorMessage)
          }
          url = `${mainUrl}/signup`
          AuthinactionDetails = {
            name: userName,
            email: enteredEmail,
            password: enteredPassword,
            confirmPassword: confirmPassword,
            returnSecureToken: true
          }
        } else {
          let errorMessage = "entered field Check again"
          throw new Error(errorMessage)
        }

      } else {
        url = `${mainUrl}/login`
        enteredEmail = emailRef.current.value
        enteredPassword = passwordRef.current.value

        AuthinactionDetails = {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }
      }

      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(AuthinactionDetails),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (res.ok) {
        const data = await res.json()
        console.log('User has successfully logged in')
        if (data.idToken && data.email) {
          cartCtx.addEmail(data.email)
          authctx.logIn(data.idToken);
          navigation('/home');
        }
        navigation("/");

      } else {
        const data = await res.json()
        let errorMessage = data.error
        throw new Error(errorMessage)
      }
    }
    catch (err) {
      alert(err.message)
    }
    emailRef.current.value = null
    passwordRef.current.value = null
  }

  return (
    <div className={classes["formPage"]}>
      <form action="submit" onSubmit={submitFormHandler} className={classes['form']}>
        <h2 style={{ display: 'flex', justifyContent: 'center' }}>{isLogInForm ? 'Login' : 'Sign Up'}</h2>
        {!isLogInForm && <label htmlFor="userName" >Name</label>}
        {!isLogInForm && <input id='userName' type='text' ref={userNameRef} required />}

        <label htmlFor="email">Email</label>
        <input id='useEmail' type='email' ref={emailRef} required />

        <label htmlFor="password" >Password</label>
        <input id='userPassword' type='password' ref={passwordRef} required />

        {!isLogInForm && <label htmlFor="confirmPassword" >confirmPassword</label>}
        {!isLogInForm && <input id='userconfirmPassword' type='password' ref={confirmPasswordRef} required />}

        {isLogInForm ? <button className={classes['button']}>Login</button> : <button className={classes['button']}>SignUp</button>}

        <div className={classes['tog']}>
          <span className={classes['toggle']} onClick={() => { setIsLogInForm(!isLogInForm) }}>{isLogInForm ? "Dont have an acount? signup" : "Have an account? Login"}</span>
          <Link to='/forgetPassword' className={classes['toggle']} style={{ textDecoration: 'none' }}>Forget Passsword</Link>
        </div>
      </form>

    </div>
  )

};

export default AuthForm;
