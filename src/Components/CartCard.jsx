import React from 'react'
import "../styles/cart-card.scss"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const CartCard = ({title, price, discount, count, id, photo, setUpdate, cart_item_id, setGlobalUpdate}) => {
  function $toSom(number) {
    const exchangeRate = 10500
    const sum = number * exchangeRate
    return sum.toLocaleString()
  }
  async function PlusCount(id) {
      await axios.post("/cart/add", {product_id: id})
      setUpdate(true)
  }
  async function minusCount(id) {
    await axios.put(`/cart/count/minus/${id}`)
    setUpdate(true)
  }
  async function deleteFromCart(id) {
    await axios.delete(`/cart/delete/${id}`)
    setUpdate(true)
    setGlobalUpdate(true)
  }
  async function addtoLike(id) {
    try {
      await axios.post('/likes/add', {product_id: id})
        setGlobalUpdate(true)
    } catch (error) {
      toast(error.response.data.message, {type: "error"})
    }
  }
  return (
    <div id='card'>
      <img src={`https://16.171.9.25/${photo}`} alt="" />
      <div className="end-card">
        <Link className='link' to={`/product/${id}`}>{title}</Link>
        <p className='price'>{discount ?  $toSom(price - (price * discount.percent / 100)) : $toSom(price)} so'm {discount ? <span>Discount: {discount.percent}%<p className='discount-minus'>{$toSom(price)} so'm</p></span> : null}</p>
        <p className='country'>Страна доставки: <span>Узбекистан</span></p>
        <div className='end-card-footer'>
            <div className="btns">
            <button onClick={() => addtoLike(id)}><i className="fa-regular fa-heart"></i>Add to favorite</button>
            <button onClick={() => deleteFromCart(cart_item_id)}><i className="fa-solid fa-xmark"></i>Delete from cart</button>
            </div>
            <div className="count-emiter">
                {count === 1 ? <button className='in-active'><i className="fa-solid fa-minus"></i></button> : <button onClick={() => minusCount(id)}><i className="fa-solid fa-minus"></i></button>}
                <h3>{count}</h3>
                <button onClick={() => PlusCount(id)}><i className="fa-solid fa-plus"></i></button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CartCard
