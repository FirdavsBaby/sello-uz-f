import React, { useState } from 'react'
import "../styles/adminLogin.scss"
import { toast } from 'react-toastify';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    const [values,setValues] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const token = localStorage.getItem('admin-token')
    function handleOnchange(e) {
        setValues((v) => ({...v, [e.target.name]: e.target.value}))
    }
    async function LoginAdmin(e) {
        e.preventDefault()
        if (!values.email || !values.password) return toast("Please field all the field", {type: "error"})
        try {
            const {data} = await axios.post("/auth/admin/login", values)
            const {token, message} = data
            localStorage.setItem('admin-token', token)
            toast(message, {type: "success"})
            navigate('/admin/dashboard')
          } catch (error) {
            toast(error.response.data.message, {type: "error"})
          }

    }
    return token ? <Navigate to="/admin/dashboard"/> : (
    <section id='login'>
      <form onSubmit={LoginAdmin}>
        <h2>Logining to admin dashboard😶</h2>
        <input type="email" name='email' placeholder="Admin email" onChange={handleOnchange} value={values.email}/>
        <input type="password" name='password' placeholder="Admin password" onChange={handleOnchange} value={values.password}/>
        <button type="submit">Login</button>
      </form>
    </section>
  )
}

export default Login
