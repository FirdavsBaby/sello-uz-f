import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import '../styles/adminLayout.scss'
import AdminNav from './NavBars/AdminNav';

const AdminLayout = () => {
  const token = localStorage.getItem('admin-token')
  const navigate = useNavigate()
  useEffect(() => {
    (async function() {
      try {
        const {data} = await axios.get('/profile/me/admin', {headers: {Authorization: 'Bearer ' + token}})
      } catch (error) {
        if (error.response.data.message === "Bad Request") {
          localStorage.removeItem('admin-token')
          navigate('/login')
        }
      }
    })()
  },[])
  return token ? (
    <div id='admin-layout'>
      <AdminNav/>
     <Outlet/> 
    </div>
  ) : <Navigate to="/login"/>
}

export default AdminLayout
