import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios'
import {ToastContainer} from 'react-toastify'
import'react-toastify/dist/ReactToastify.css'

axios.defaults.baseURL = "https://16.171.9.25/api"
axios.defaults.headers.common['Content-Type'] = "application/json"
const token = localStorage.getItem("token")
const admin_token = localStorage.getItem("admin-token")
if (token) {
axios.defaults.headers.common.Authorization = `Bearer ${token}`
}
if (admin_token) {
  axios.defaults.headers.common.Authorization = `Bearer ${admin_token}`
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
    <ToastContainer theme='colored'/>
  </Router>,
)
