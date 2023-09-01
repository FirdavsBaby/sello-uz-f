import React, { useEffect, useState } from 'react'
import "../styles/adminDashboard.scss"
import axios from 'axios'

const AdminDashboard = () => {
  const [data,setData] = useState(null)
  useEffect(() => {
    (async function () {
      const {data} = await axios.get("/profile/users")
      setData(data)
    })()
  },[])
  console.log(data);
  return (
    <div id='content'>
      <div className="content-head">
      <h2>Users</h2>
      </div>
      <table>
  <tr>
    <th>Email</th>
    <th>FullName</th>
    <th>Number</th>
    <th>Gender</th>
    <th>Username</th>
    <th>Balance</th>
    <th>Registered</th>
  </tr>
    {data?.map((u) => {
      return u.role !== "admin" ? (
        <tr>
        <td>{u.email}</td>
        <td>{u.last_name && u.first_name ? `${u.last_name} ${u.first_name}` : "Not entered"}</td>
        <td>{u.number ? "+" + u.number : "Not entered"}</td>
        <td>{u.gender}</td>
        <td>{u.username ? u.username : "Not entered"}</td>
        <td>{u.balance}</td>
        <td>{u.createdAt.split("T")[0]}</td>
        </tr>
      ) : null
    })}
</table>
    </div>
  )
}

export default AdminDashboard
