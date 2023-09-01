import React from 'react'
import "../../styles/adminNav.scss"
import { Link, useNavigate } from 'react-router-dom';

const AdminNav = () => {
  const navigate = useNavigate()
  return (
    <nav id='navbar'>
      <ul>
        <li>
          <Link to="/admin/dashboard"><i className="fa-solid fa-users"></i></Link>
        </li>
        <li>
          <Link to="/admin/products"><i className="fa-brands fa-product-hunt"></i></Link>
        </li>
        <li>
          <Link to="/admin/orders"><i className="fa-solid fa-money-check-dollar"></i></Link>
        </li>
        <li>
          <Link to="/admin/categories"><i className="fa-solid fa-clipboard"></i></Link>
        </li>
        <li>
          <Link to="/admin/catalogs"><i className="fa-solid fa-list"></i></Link>
        </li>
        <li>
          <Link to="/admin/discount"><i className="fa-solid fa-percent"></i></Link>
        </li>
        <li>
          <Link to="/admin/brands"><i className="fa-solid fa-copyright"></i></Link>
        </li>
        <li>
          <Link to="/admin/reviews"><i className="fa-solid fa-chart-line"></i></Link>
        </li>
      </ul>
      <button className='logout' onClick={() => {
        localStorage.removeItem('admin-token');
        navigate('/login');
      }}>
      <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </button>
    </nav>
  )
}

export default AdminNav
