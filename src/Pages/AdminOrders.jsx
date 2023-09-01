import React, { useEffect, useState } from 'react'
import "../styles/adminOrders.scss"
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const [data,setData] = useState(null)
  const [selected,setSelected] = useState(null)
  const [update,setUpdate] = useState(false)
  useEffect(() => {
    (async function() {
      setUpdate(false)
      const {data} = await axios.get('/purchase')
      setData(data)
    })()
  },[update])
  async function setStatus(id, status_type) {
    try {
      await axios.put(`/purchase/update/status/${id}`, {status: status_type})
      toast("Status updated successfully", {type: "success"})
      setUpdate(true)
    } catch (error) {
    }
  }
  return (
    <div id='content'>
      <div className="content-head">
        <h2>Orders</h2>
      </div>
      <div id="orders">
      <div id='orders'>
                {data?.map((o) => {
                  return (
                    <div className="order" key={o.id}>
                  <div className="order-head">
                    <button className='bar' onClick={() => {
                      selected === o.id ? setSelected(null) : setSelected(o.id)
                    }}>
                    <i className="fa-solid fa-bars"></i>
                    </button>
                      <ul className={selected === o.id ? "bars active" : "bars"}>
                      <li><button onClick={() => setStatus(o.id, "process")}><i className="fa-solid fa-chalkboard-user"></i> Process</button></li>
                      <li><button onClick={() => setStatus(o.id, "delivered")}><i className="fa-solid fa-truck-ramp-box"></i> Delivered</button></li>
                      <li><button onClick={() => setStatus(o.id, "waiting")}><i className="fa-solid fa-box-archive"></i> Waiting</button></li>
                    </ul>
                  </div>
                  <div className="order-aside">
                    <ul>
                      <li>Cart number : <span>№{o.cart_number}</span></li>
                    <li>Order date : <span>{`${o.updatedAt.split("T")[0].split("-").join(".")} ${o.updatedAt.split("T")[1].split('.')[0]}`}</span></li>
                    </ul>
                    <ul>
                    <li>Delivery amount : <span>0</span></li>
                    <li>Payment Type : <span>Paid✅</span></li>
                    </ul>
                    <ul>
                      <li>Secret code : <span>{o.secret_key}</span></li>
                      <li>Fiscal check : </li>
                    </ul>
                  </div>
                  <div className="order-body">
                    {o.cartItems.map(p => {
                      return (
                        <div className="product" key={p.id}>
                     <div className="product-start">
                     <img src={`https://16.171.9.25/${p.product.photo}`} alt="" />
                     </div>
                      <div className="product-end">
                        <Link to={`/product/${p.product.id}`} className='link'>{p.product.title}</Link>
                        <ul>
                            <li>Price : {p.product.price}</li>
                            <li>Description : {p.product.description}</li>
                            <li>Count: {p.count}</li>
                        </ul>
                      </div>
                    </div>
                      )
                    })}
                      {o.canceled ? <p className='type'>Canceled</p>
                      : o.status === "waiting" ? <p className='type waiting'>Waiting</p> 
                      : o.status === "process" ? <p className='type process'>Process</p>
                      : o.status === "delivered" ? <p className='type delivered'>Delivered</p>: null
                      }
                  </div>
                  <div className="order-footer">
                    <h4>About delivery</h4>
                    <div className="about">
                      <div className="table">
                        <p className='key'>Address : </p>
                        <p className='value'> {`${o.location.city}, ${o.location.district}, ${o.location.street}, ${o.location.avenue}`}</p>
                      </div>
                      <div className="table">
                        <p className='key'>Delivery :</p>
                        <p className='value'>Courier</p>
                      </div>
                      <div className="table">
                        <p className='key'>Total amount :</p>
                        <p className='value'>{o.total}$</p>
                      </div>
                    </div>
                  </div>
                    </div>
                  )
                })}
              </div>
      </div>
    </div>
  )
}

export default AdminOrders
