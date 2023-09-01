import React, { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import "../../styles/profilenav.scss"


const ProfileNav = ({activePage}) => {
    const navigate = useNavigate()
    const [setUpdate] = useOutletContext()
    const links = [
        {
          icon: "fa-regular fa-user",
          text: "Profile",
          link: "/profile",
        },
        {
          icon: "fa-solid fa-box",
          text: "My orders",
          link: "/purchases",
        },
        {
          icon: "fa-regular fa-heart",
          text: "Favorites",
          link: "/likes",
        },
        {
          icon: "fa-solid fa-wallet",
          text: "Wallet",
          link: "/wallet",
        },
      ];
      function page(l) {
        navigate(l.link)
      }
      function logout() {
        localStorage.removeItem('token')
        navigate('/')
        setTimeout(() => {
          setUpdate(true)
        }, 50);
      }
      return (
    <div id='navigate'>
    {links.map(l => {
        return (
            <button className={activePage === l.text ? "link active" : "link"} key={l.icon} onClick={() => page(l)}>
             <i className={l.icon}></i>
               {l.text}
             </button>
        )
    })}
    <button  onClick={logout} className='link logout'>
    <i className="fa-solid fa-arrow-right-from-bracket"></i>
        Logout
    </button>
  </div>
  )
}

export default ProfileNav
