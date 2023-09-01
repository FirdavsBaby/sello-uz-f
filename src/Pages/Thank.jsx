import React from 'react'
import { Link, Navigate, useOutletContext } from 'react-router-dom'
import "../styles/thank.scss"
import img from '../../public/success.svg'

const Thank = () => {
  const [setUpdate, me] = useOutletContext() 
  return me?.isVerified ? (
    <section id='thank'>
      <img src={img} alt="" />
      <h1>Application accepted</h1>
      <p>Congratulations, your order has been received. Wait for confirmation of our service</p>
      <Link to="/purchases" className='link'>View order</Link>
    </section>
  ) : null
}

export default Thank
