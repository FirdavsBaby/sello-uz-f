import React, { useEffect, useState } from 'react'
import "../styles/adminCards.scss"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

const AdminProducts = () => {
    const [data,setData] = useState(null)
    const [update, setUpdate ] = useState(false) 
    useEffect(() => {
        (async function() {
            setUpdate(false)
            const {data} = await axios.get('/products?count=')
            setData(data.products)
        })()
    },[update])
    async function deleteProduct(id) {
        try {
            const {data} = await axios.delete(`/products/delete/${id}`)
            toast(data.message, {type: "info"})
            setUpdate(true)
        } catch (error) {
            console.log(error);
        }
    }
    const navigate = useNavigate()
  return (
    <div id='content'>
      <div className="content-head">
      <h2>Products</h2>
      <Link to="/admin/new/product" className='add-product'>
        NEW PRODUCT
      </Link>
      </div>
      <div className="cards">
      {data?.map((c) => {
        return (
        <div className="card" key={c.id}>
            <Link className='clicklable_link' to={`/product/${c.id}`}>
            <img src={`https://16.171.9.25/${c.photo}`} alt="" className='start'/>
            <p>{c.title}</p>
            {c.discount ? <h4 className='old-price'>{c.price}$</h4>: ""}
            <h4>{c.discount ? c.price - (c.price * c.discount.percent / 100)  : c.price} $ {c.discount ? <span>-{c.discount.percent}%</span> : null}</h4>
            </Link>
            <div className='end' style={c.discount ? {marginTop: "30px"} : {marginTop: "50px"}}>
            <button className='update' onClick={() => navigate(`/admin/update/product/${c.id}`)}>Update</button>
            <button className='delete' onClick={() => deleteProduct(c.id)}>Delete</button>
            </div>
        </div>
        )
      })}
      </div>
    </div>
  )
}

export default AdminProducts
