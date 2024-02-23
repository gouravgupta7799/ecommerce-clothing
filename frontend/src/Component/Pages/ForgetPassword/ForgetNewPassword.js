import React, { useRef } from 'react'
import classes from './ForgetNewPassword.module.css'
import { useNavigate, useParams } from "react-router-dom";

export default function ForgetnewPassword() {
  const prarams = useParams()
  const history = useNavigate()

  const emailInputRef = useRef()
  const psswordInputRef = useRef()
  const confirmPsswordInputRef = useRef()

  async function newPasswordHandler(e) {
    e.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredPassword = psswordInputRef.current.value
    const confirmPassword = confirmPsswordInputRef.current.value

    if (enteredPassword === confirmPassword) {
      const res = await fetch(`http://localhost:4000/password/resetPassword`, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          passwordInput: enteredPassword,
          id: prarams.prodId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()
      alert(data.msg)
      history('/')
    }
    else {
      alert('check the input filds')
    }
    emailInputRef.current.value = ''
    psswordInputRef.current.value = ''
    confirmPsswordInputRef.current.value = ''

  }

  return (
    <div className={classes.main}>
      <form className={classes['formForget']} action="submit" onSubmit={newPasswordHandler}>
        <label className={classes['Forgetlabel']} htmlFor="email">email</label>
        <input type="email" ref={emailInputRef} />
        <label className={classes['Forgetlabel']} htmlFor="password">new password</label>
        <input type="password" ref={psswordInputRef} />
        <label className={classes['Forgetlabel']} htmlFor="password">confirm password</label>
        <input type="password" ref={confirmPsswordInputRef} />
        <button>reset password</button>
      </form>
    </div>
  )
}
