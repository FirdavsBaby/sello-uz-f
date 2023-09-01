import React, { createContext, useEffect, useState } from 'react'
import {Outlet} from 'react-router-dom'
import Default from './NavBars/Default'
import MainFooter from './Footers/MainFooter'
import Auth from './Auth'
import axios from 'axios'

const Layout = () => {
  const [authModal, setAuthModal] = useState(false)
  const [me, setMe] = useState(null)
  const [update, setUpdate] = useState(false)
  const token = localStorage.getItem('token')
  const [cart, setCart] = useState(null)

  useEffect(() => {
    (async function() {
      try {
        setUpdate(false)
        const {data} = await axios.get("/profile/me", {headers: {Authorization: 'Bearer ' +  token}})
        setMe(data)
        setCart(cart)
      } catch (error) {
      }
    })()
  },[update])
  return (
    <div id='main-layout'>
        <Auth setAuthModal={setAuthModal} authModal={authModal} setUpdate={setUpdate}/>
        <Default me={me} setAuthModal={setAuthModal} cart={cart}/>
        <Outlet context={[setUpdate, me, update]}/>
        <MainFooter/>
    </div>
  )
}

export default Layout
