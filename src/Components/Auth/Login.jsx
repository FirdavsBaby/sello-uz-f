import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({setAuthModal, values, setValues, setUpdate}) => {
  function onChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }
  async function submit(e) {
    e.preventDefault()
    try {
      const {data} = await axios.post("/auth/login", {email: values.email, password: values.password})
      const {token} = data
      toast("Logined successfully.", {type: "success"})
      setAuthModal(false)
      setUpdate(true)
      localStorage.setItem(token)
    } catch (error) {
      if (error.response.data.message !== "User not registered") return toast(error.response.data.message, {type: "error"})
      const current_token = localStorage.getItem('token')
      await axios.put("/profile/change/password", {password: values.password}, {headers: {Authorization: 'Bearer ' +  current_token}})
      toast("Logined successfully.", {type: "success"})
      setAuthModal(false)
      setUpdate(true)
      localStorage.setItem(token)
      window.location.reload()
    }finally {
      setValues({
        email: "",
        code: "",
        password: ""
      })
    }
  }
  return (
    <form id='login' onSubmit={submit}>
      <div className='btn-x'>
        <button type='button' onClick={() => {
          setAuthModal(false)
          localStorage.removeItem("token")
        }}>
        <i className="fa-solid fa-xmark"></i>
        </button>
        </div>
      <div className='data'>
      <label htmlFor="password">Enter your password</label>
      <input type="password" name="password" onChange={onChange} value={values.password} id="password" placeholder='*********'/>
      <button>Next</button>
      </div>
    </form>
  )
}

export default Login
