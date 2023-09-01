import React, { useEffect, useState } from 'react'
import "../styles/purchases.scss"
import Empty from "../../public/empty_orders.png"
import { Link, useOutletContext } from 'react-router-dom'
import ProfileNav from '../Components/NavBars/ProfileNav';
import axios from 'axios'
import { toast } from 'react-toastify';

const Purchase = () => {
  const [selected,setSelected] = useState(null)
  const [setUpdate,me] = useOutletContext()
  const [updateOrder, setUpdateOrder] = useState(false)
  const [data,setData] = useState(null)
  useEffect(()=> {
    (async function() {
      const {data} = await axios.get("/purchase/my")
      setData(data)
      setUpdateOrder(false)
      setUpdate(true)
    })()
  }, [updateOrder])
  function $toSom(number) {
    const exchangeRate = 10500
    const sum = number * exchangeRate
    return sum.toLocaleString()
}
async function Cancel(id) {
  try {
    const {data} = await axios.put(`/purchase/cancel/${id}`)
    setData(data)
    setUpdateOrder(true)
    toast("Order canceled", {type: "info"})
  } catch (error) {
    toast(error.response.data.message, {type: "error"})
  }
}
  return me?.isVerified ? (
    <div id='purchase'>
        <ProfileNav activePage={"My orders"}/>
        <section id='data'>
        <div className="data-head">
                <h3>My orders</h3>
            </div>
            {data?.length ?
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
                    {selected === o.id ? 
                      <ul className="bars active">
                      {!o.canceled && o.status === "waiting" ? <li><button onClick={() => Cancel(o.id)}><i className="fa-solid fa-ban"></i> Cancel</button></li> : null}
                    </ul>
                    : 
                    <ul className="bars">
                      {!o.canceled && o.status === "waiting" ? <li><button><i className="fa-solid fa-ban"></i> Cancel</button></li> : null}
                    </ul>}
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
                            <li>Price : {$toSom(p.product.price)} so'm</li>
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
                        <p className='value'>{$toSom(o.total)} so'm</p>
                      </div>
                    </div>
                  </div>
                    </div>
                  )
                })}
              </div>
            : 
              <div className='no-products'>
              <div className='start'>
                  <p className='no-products-text'>Delivery is carried out by the Sello Logistics service.</p>
                  <Link to="/" className='link'>Start shopping</Link>
              </div>
              <img src={Empty} alt="" />
        </div>
            }
        </section>
    </div>
  ) : null
}

export default Purchase
