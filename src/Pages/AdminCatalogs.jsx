import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import "../styles/adminCategories.scss"

const AdminCatalogs = () => {
    const [data,setData] = useState(null)
    const [update,setUpdate] = useState(false)
    useEffect(() => {
        (async function() {
            const {data} = await axios.get('/catalogs')
            setUpdate(false)
            setData(data)
        })() 
    },[update])
    async function deleteCategory(id) {
        await axios.delete(`/catalogs/delete/${id}`)
        toast("Category deleted successfully", {type: "info"})
        setUpdate(true)
    }
  return (
    <div id='content'>
      <div className="content-head">
        <h2>Catalogs</h2>
        <Link className='add-product' to="/admin/new/catalog">New Catalog</Link>
      </div>
      <table className='categories'>
        <tr>
            <th>Name</th>
            <th>Actions</th>
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

export default AdminCatalogs
