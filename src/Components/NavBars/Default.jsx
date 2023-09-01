import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Logo from "../../../public/logo.svg"
import '../../styles/layout.scss'
import axios from 'axios'
import { toast } from 'react-toastify';

const Default = ({setAuthModal,me}) => {
    const [catalogs, setCatalogs] = useState(null)
    const [useCatalog, setUseCatalog] = useState(null)
    const [firstCatalogs, setFirstCatalogs] = useState(null)
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()
    useEffect(()=> {
        (async function() {
            const {data} = await axios.get("/catalogs")
            setCatalogs(data)
            setUseCatalog(null)
            const catalogs = data.slice(0, 5)
            setFirstCatalogs(catalogs)

        })()
    },[])
    function searchOnchange(e) {
        setSearchValue(e.target.value)
    }
    function getCategories(catalog) {
        setUseCatalog(catalog)
    }
    function setModal(link) {
        if(me) return navigate(`/${link}`)
        setAuthModal("sendCode")
    }
    function onclickCatalog(name) {
        navigate(`/filter/${name}/all/all/all/all`)
    }
    function onclickCategory(name) {
        navigate(`/filter/all/${name}/all/all/all`)
    }
    function search(e) {
        e.preventDefault()
        if (!searchValue) return toast("Nothing to search", {type: "warning"})
        navigate(`/filter/all/all/all/all/${searchValue}`)
    }
    return (
    <header id='header'>
        <nav id='heading'>
            <Link to="/" className='start'><img src={Logo} alt=""/></Link>
            <div className='center'>
            <label htmlFor='dropdown_activate'  id='dropdown'><i className="fa-solid fa-bars"></i> Catalog</label>
            <input type="checkbox" id='dropdown_activate' hidden/>
            <div id='dropdown-window'>
                <hr />
                <ul className='catalogs'>
                    {catalogs?.map(c=> {
                        return  (
                            <li onClick={() => onclickCatalog(c.name)}  onMouseEnter={() => getCategories(c)} key={c}><button>{c.name}</button><i className="fa-solid fa-chevron-right"></i></li>
                        )
                        
                    })}
                </ul>
                <ul className='categories'>
                    <h3>{useCatalog?.name}</h3>
                    {
                        useCatalog ? useCatalog?.categories.length ? useCatalog?.categories.map((c)=> {
                            return  <li key={c.id}><button onClick={() => onclickCategory(c.name)}>{c.name}</button></li>
                        })
                        : <h3>No categories</h3> 
                        : <h3>Choose catalog...</h3>  
                    }
                </ul>
            </div>
            <form className='search' onSubmit={search}>
                <input type="text" name="" id="" placeholder='Type product name...' onChange={searchOnchange} value={searchValue}/>
                <button><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
            </div>
            <ul className='end'>
                <li>
                    <button className='link' onClick={() => setModal('likes')}>
                    <i className="fa-regular fa-heart"></i>
                        Liked
                        {me?.like.length ? <span className='like-nof'>{me?.like.length}</span> : null}
                    </button>
                </li>
                <li>
                    <button className='link' onClick={() => setModal('cart')}>
                    <i className="fa-solid fa-cart-shopping"></i>
                        Cart
                        {me?.cart.length ? <span className='cart-nof'>{me?.cart.length}</span> : null}
                    </button>
                </li>
                <li>
                    <button className='link' onClick={() => setModal('profile')}>
                    <i className="fa-regular fa-user"></i>
                        Profile
                    </button>
                </li>
            </ul>
        </nav>
        <br />
        <span className="line"></span>
        <nav id='links'>
            <ul>
            <li>
                <Link className='link discount' to="/filter/all/all/all/all-discounts/all">🔥Discount</Link>
            </li>
                {firstCatalogs?.map(c=> {
                    return c ? (
                <li key={c.id}>
                    <Link to={`/filter/${c.name}/all/all/all/all`} className='link'>{c.name}</Link>
                </li>
                    ) : ""
                })}
                <li>
                    <Link to="/brands" className='link'>Brands</Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Default
