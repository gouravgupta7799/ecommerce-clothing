import React, { useContext, useRef } from 'react'
import AuthContext from '../ContextStore/Auth-Context';

function Headline(props) {

  const AuthCtx = useContext(AuthContext);
  const Auth = AuthCtx.isLoggedIn
  const inputRef = useRef()

  const CetegoryHandler = (e) => {
    props.setChecked(e.target.value)
  }

  async function searchHandler() {

    const inputTitle = inputRef.current.value;
    
    const res = await fetch(`http://localhost:4000/store/searchProduct`, {
      method: 'POST',
      body: JSON.stringify({ title: inputTitle }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    console.log(data)
  }


  return (
    <div className='bg-secondary' style={{ display: 'flex' }}>
      <div className="text-center p-4" >
        <h1 className="text-light display-3 font-weight-bold">E-Commerce clothing</h1>
      </div>
      {Auth && <div className="app" style={{ display: 'flex', textAlign: "center", margin: 'auto', justifyContent: 'flex-end' }}>
        <select
          name="categories"
          id=""
          style={{
            padding: '7.5px',
            margin: '3px',
            borderRadius: '10px',
          }}
          onChange={CetegoryHandler}
          value={props.checked}
        >
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <div style={{
          padding: '7.5px',
          margin: '3px',
          borderRadius: '10px',
        }}>
          <input type="text" ref={inputRef} />
          <button onClick={searchHandler}>search</button>
        </div >
      </div>}

    </div >
  )
}

export default Headline;