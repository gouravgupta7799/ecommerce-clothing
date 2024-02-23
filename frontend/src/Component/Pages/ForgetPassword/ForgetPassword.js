import React, { useContext, useRef } from 'react'
import classes from './ForgetPassword.module.css'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../ContextStore/Auth-Context'

export default function ForgetPassword() {

  const auth = useContext(AuthContext)
  const history = useNavigate()

  const emailInputRef = useRef()
  const idToken = auth.isToken


  const submitHandler = async (e) => {
    e.preventDefault()

    const enteredEmail = emailInputRef.current.value

    const res = await fetch(`http://localhost:4000/password/forgotpassword`, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': idToken
      }
    })

    const data = await res.json()
    if (res.ok) {
      alert('Password changing link send to your mail successfully')
      setTimeout(() => {
        history('/')
      }, 2000)
    }
    else {
      alert(data.error.message)
    }

  }

  return (
    <div className={classes.container}>
      <form className={`${classes.form}`} onSubmit={submitHandler}>
      <label htmlFor='email'>Email Id</label>
      <input type='email' id='email' ref={emailInputRef} />
      <button>Change Password</button>
    
    </form ></div >
  )
}