import React, { useContext, useEffect, useState } from 'react'
import classes from './Profile.module.css'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../ContextStore/Auth-Context';

const url = 'http://localhost:4000'
export default function Profile() {
  const AuthCtx = useContext(AuthContext);
  const idToken = AuthCtx.isToken;

  const [fullName, setFullName] = useState("")
  const [fullAddress, setFullAddress] = useState("")
  const [emailId, setEmailId] = useState("")
  const [photo, setPhoto] = useState("")
  const [number, setNumber] = useState("")
  const history = useNavigate()


  const fetchData = async () => {
    try {
      const response = await fetch(
        `${url}/profile`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': idToken
          }
        }
      );
      const data = await response.json();
      if (data.user) {
        const user = data.user;
        setFullName(user.displayName || '');
        setFullAddress(user.userAddress || '');
        setPhoto(user.photoUrl || '');
        setNumber(user.userNumber || '');
        setEmailId(user.userEmail || '');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const respnse = await fetch(`${url}/profile`, {
        method: "POST",
        body: JSON.stringify({
          displayName: fullName,
          photoUrl: photo,
          address: fullAddress,
          number: number
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': idToken
        }
      })

      const data = await respnse.json()
      if (data) {
        alert('updated')
        history('/')
      }

    } catch (error) {
      console.error("submiting error", error)
    }
    setFullName('')
    setPhoto('')
  }

  useEffect(() => {
    fetchData()
  }, [idToken])


  return (
    <div>
      <form onSubmit={submitHandler}
        className={classes.main}>
        <div className={classes.head}>
          <h3>contact details</h3>
          <h5>email Id:- {emailId}</h5>
        </div>

        <div className={classes.int}>
          <label htmlFor="name">Full Name</label>
          <input type="text" value={fullName} className={classes.input}
            onChange={(e) => { setFullName(e.target.value) }} />
        </div>

        <div className={classes.int}>
          <label htmlFor="name">Full Address</label>
          <input type="text" value={fullAddress} className={classes.input}
            onChange={(e) => { setFullAddress(e.target.value) }} />
        </div>

        <div className={classes.int}>
          <label htmlFor="picture">Profile Photo URL</label>
          <input type="text" value={photo} className={classes.input}
            onChange={(e) => {
              setPhoto(e.target.value)
            }} />
        </div>

        <div className={classes.int}>
          <label htmlFor="number">Number</label>
          <input type="text" value={number} className={classes.input}
            onChange={(e) => { setNumber(e.target.value) }} />
        </div>

        <button className={classes['button']}>update</button>

      </form>
    </div >
  )
}