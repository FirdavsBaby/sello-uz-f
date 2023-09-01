import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import "../styles/adminBrands.scss"

const AdminBrands = () => {
    const [data,setData] = useState(null)
    const [update,setUpdate] = useState(false)
    useEffect(() => {
        (async function() {
            const {data} = await axios.get('/brands')
            setUpdate(false)
            setData(data)
        })() 
    },[update])
    const navigate = useNavigate()
    async function deleteBrand(id) {
        await axios.delete(`/brands/delete/${id}`)
        setUpdate(true)
        toast('Brand deleted successfully',{type: "info"})
    }
  return (
    <div id='content'>
      <div className="content-head">
        <h2>Brands</h2>
        <Link className='add-product' to="/admin/new/brand">New BRAND</Link>
      </div>
        <ul className="brands-content">
        {data ? data?.map((b) => {
          return  <li key={b.id} className='link-btn'>
            <img onClick={() => navigate(`/filter/all/all/${b.name}/all/all`)} src={`https://16.171.9.25/${b.photo}`} alt="" />
            <button onClick={() => deleteBrand(b.id)}>Delete</button>
            </li>
        }) : <h2 className='announcement'>No Brands..</h2>}
        </ul>
    </div>
  )
}

export default AdminBrands
