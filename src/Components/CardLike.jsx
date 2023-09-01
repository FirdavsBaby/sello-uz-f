import React, { useContext } from 'react'
import "../styles/card.scss"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const CardLike = ({image, title, price, discount, id, setUpdate}) => {
    const token = localStorage.getItem('token')
    function $toSom(number) {
      const exchangeRate = 10500
      const sum = number * exchangeRate
      return sum.toLocaleString()
    }
    async function addToCart(id) {
      try {
        await axios.post('/cart/add', {product_id: id}, {headers: {Authorization: 'Bearer ' +  token}})
        setUpdate(true)
      } catch (error) {
        console.log(error);
      }
    }
    async function addToLike(id) {
      try {
        await axios.delete(`/likes/delete/${id}`)
        setUpdate(true)
      } catch (error) {
      }
    }
    return (
      <button className='card'>
        <button className="add-to-like" onClick={() => addToLike(id)}><i className="fa-solid fa-xmark"></i></button>
        <Link className='clicklable_link' to={`/product/${id}`}>
        <img src={`https://16.171.9.25/${image}`} alt="" className='start'/>
        <p>{title}</p>
        {discount ? <h4 className='old-price'>{$toSom(price)} s'om</h4>: ""}
        <h4>{discount ? $toSom(price - (price * discount.percent / 100))  : $toSom(price)} s'om {discount ? <span>-{discount.percent}%</span> : null}</h4>
        </Link>
        <div className='end' style={discount ? {marginTop: "0px"} : {marginTop: "20px"}}>
        <button className='add-to-cart' onClick={() => addToCart(id)}>ADD TO CART</button>
        </div>
      </button>
    )
}

export default CardLike
