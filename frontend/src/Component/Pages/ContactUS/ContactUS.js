import React, { useContext, useRef } from 'react';
import AuthContext from '../../ContextStore/Auth-Context'
import { useNavigate } from 'react-router-dom';
import classes from './ContactUS.module.css'
const url = 'http://localhost:4000/contact'

function ContactUS(props) {

  const history = useNavigate()
  const nameRef = useRef('');
  const emailRef = useRef('');
  const contactNumberRef = useRef('');
  const detailsIssueRef = useRef('');
  const athx = useContext(AuthContext)
  const token = athx.isToken

  async function submitHandler(event) {

    event.preventDefault();

    // could add validation here...
    try {
      const information = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        contactNumber: contactNumberRef.current.value,
        detailsIssue: detailsIssueRef.current.value,
      };

      const info = await fetch(`${url}`, {
        method: 'POST',
        body: JSON.stringify(information),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      const data = await info.json()
      alert(data.msg)
      history('/')
    }
    catch (err) {
      console.log(err.message)
    }

    nameRef.current.value = ''
    emailRef.current.value = ''
    contactNumberRef.current.value = ''
    detailsIssueRef.current.value = ''
  }

  return (
    <div className={classes['openclas']}>
      <form className={classes.container} onSubmit={submitHandler}>
        <h1 style={{ marginLeft: '20px' }}>Contact US</h1>
        <div className={classes.control}>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' ref={nameRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='contactNumber'>contactNumber</label>
          <input type='text' id='contactNumber' ref={contactNumberRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='details'>describe your issue</label>
          <input type='text' id='details' ref={detailsIssueRef} />
        </div>
        <button>ContactUs</button>
      </form>
    </div>
  );
}

export default ContactUS;
