import React, { useEffect, useState } from 'react'
import "../styles/cart.scss"
import UZ from '../../public/uz.svg'
import { useNavigate, useOutletContext } from 'react-router-dom';
import CartCard from './../Components/CartCard';
import axios from 'axios'
import { toast } from 'react-toastify';


const Cart = () => {
  const [tootlip, setTootlip] = useState(0)
  const [data,setData] = useState(null)
  const [count, setCount] = useState(0)
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [total, setTotal] = useState(0)
  const [setUpdate, me] = useOutletContext()
  const [updateCart, setUpdateCart] = useState(false)
  function $toSom(number) {
    const exchangeRate = 10500
    const sum = number * exchangeRate
    return sum.toLocaleString()
  }
  function hover(number) {
    setTootlip(number)
  }
  useEffect(() => {
    (async function() {
      setUpdateCart(false)
       const {data} = await axios.get("/cart")
       setData(data)
       let count = 0
       let price = 0
       let discount = 0
       let total = 0
       
       for (let i = 0; i < data.length; i++) {
        count += data[i].count;
        price += data[i].product.price * data[i].count;
      
        if (data[i].product.discount) {
          discount += (data[i].product.price * data[i].count) * (data[i].product.discount.percent / 100);
          console.log(discount);
        }
      }
      
      total = price - discount;

       setCount(count)
       setTotal(total)
       setDiscount(discount)
       setPrice(price)
    })()
  },[updateCart])
  async function clearCart() {
    await axios.delete("/cart/clear")
    toast("Cart cleared.", {type: "info"})
    setUpdateCart(true)
    setUpdate(true)
  }

  const navigate = useNavigate()
  function Order() {
    if(!me?.cart.length) return toast("Cart is empty.", {type: "error"})
    navigate('/purchase')
  }
  return (
    <section id='cart'>
        <div className="cart-start">
          <dir className="start-head">
            <h2>Cart</h2>
            <h4>Delivery is carried out by the Sello Logistics service.</h4>
            <div className="btn-clear">
            <button onClick={() => clearCart()}><i className="fa-solid fa-xmark"></i>Clear all</button>
            </div>
          </dir>
          <div className="cards">
          {
            data?.map((i) => {
              return <CartCard key={i.id} title={i.product.title} photo={i.product.photo} id={i.product.id} count={i.count} price={i.product.price} discount={i.product.discount} setUpdate={setUpdateCart} cart_item_id={i.id} setGlobalUpdate={setUpdate}/>
            })
          }
          </div>
        </div>
        <div className="cart-end">
          <div className="cart-end_head">
          <h3>
          Order price
          </h3>
          <ul>
            <li>Count of products: <span>{count}</span></li>
            <li>Price <span>{$toSom(price)} so'm</span></li>
            <li>Discount<span>-{discount ? $toSom(discount) : null} so'm</span></li>
            <li>Delivery<span>0</span></li>
            <li>Total payable:<span>{$toSom(total)} so'm</span></li>
          </ul>
          <button id='checkout-btn' onClick={Order}>
          Go to checkout
          </button>
          </div>
          <div className='end_body'>
                    <div className='info'>
                        <div className='body_info'>
                        <h5><i className="fa-solid fa-truck"></i>DeliveryShipping:</h5>
                        <p>The cost of delivery in the city is from 15,000 so'm.</p>
                        </div>
                        <p className={`${tootlip === 1  ? "tootlip-1 hovered": "tootlip-1"}`}>Delivery is carried out to the point of your choice within 2 working days from the date of order.</p>
                        <button className='info_tootlip-1' onMouseEnter={() => hover(1)} onMouseLeave={() => hover(0)}><i className="fa-solid fa-circle-info"></i> </button>
                    </div>
                    <div className='info'>
                       <div className='body_info'>
                       <h5><i className="fa-solid fa-cube"></i>Pickup from <span>sello !</span></h5>
                        <p className={`${tootlip === 2  ? "tootlip-2 hovered": "tootlip-2"}`}>You can pick up at our branches</p>
                       </div>
                       <button className='info_tootlip-2'onMouseEnter={() => hover(2)} onMouseLeave={() => hover(0)}><i className="fa-solid fa-circle-info"></i></button>
                    </div>
                </div>
                <div className='end_footer'>
                    <h5>
                    <img src={UZ} alt="" />
                    Delivery country: <span>Uzbekistan</span>
                    </h5>
                    <div className='end_footer_end'>
                        <p>1. Return of product: <span>No</span></p>
                        <p>2. Open the package: <span>Yes</span></p>
                    </div>
                </div>
        </div>
    </section>
  )
}

export default Cart
