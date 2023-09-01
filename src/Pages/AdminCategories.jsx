import React, { useEffect, useState } from 'react'
import "../styles/adminCategories.scss"
import { Link } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';

const AdminCategories = () => {
    const [data,setData] = useState(null)
    const [update,setUpdate] = useState(false)
    useEffect(() => {
        (async function() {
            const {data} = await axios.get('/categories')
            setUpdate(false)
            setData(data)
        })() 
    },[update])
    async function deleteCategory(id) {
        await axios.delete(`/categories/delete/${id}`)
        toast("Category deleted successfully", {type: "info"})
        setUpdate(true)
    }
  return (
    <div id='content'>
      <div className="content-head">
        <h2>Categories</h2>
        <Link to="/admin/new/category" className='add-product'>
        NEW CATEGORY
      </Link>
      </div>
      <table className='categories'>
        <tr>
            <th>Name</th>
            <th>Action</th>
        </tr>
        {data?.map((c) => {
            return (
            <tr key={c.id}>
                <td>{c.name}</td>
                <td><button onClick={() => deleteCategory(c.id)}>Delete</button></td>
            </tr>
            )
        })}
      </table>
    </div>
  )
}

export default AdminCategories
