import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';

const AuthWindow = ({setAuthModal, setValues, values}) => {
    async function sendCode(e) {
        try {
            e.preventDefault()
            const {data} = await axios.post("/auth/send-code", values)
            const {token, message} = data
            toast(message, {type: "success"})
            localStorage.setItem("token", token)
            setAuthModal("verifyCode")
        } catch (error) {
            console.log(error);
        }

    }
    function onChange(e) {
        setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    }

  return (
    <form id='send' onSubmit={sendCode}>
        <div className='btn-x'>
        <button type='button' onClick={() => {
          setAuthModal(false)
          localStorage.removeItem("token")
        }}><i className="fa-solid fa-xmark"></i></button>
        </div>
        <h3>Hello!</h3>
        <h3>Sign in or create a profile</h3>
        <div className='data'>
            <label htmlFor="phone">Enter email</label>
            <input type="email" name='email' id='phone' onChange={onChange} value={values.email} placeholder='example@gmail.com'/>
            {values.email ? <button>Next</button> : <button disabled>Next</button> }
        </div>
    </form>
  )
}

export default AuthWindow
