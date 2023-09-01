import React, { useEffect, useState } from 'react'
import "../styles/likes.scss"
import ProfileNav from './../Components/NavBars/ProfileNav';
import { Link, useOutletContext } from 'react-router-dom';
import axios from 'axios'
import ReactLoading  from 'react-loading';
import Empty from "../../public/empty_orders.png"
import CardLike from './../Components/CardLike';
import { toast } from 'react-toastify';

const Likes = () => {
    const [setUpdate,me,update] = useOutletContext()
    const [likes, setLikes] = useState(null);
    useEffect(()=> {
      (async function() {
        const {data} = await axios.get(`/likes`)
        setLikes(data)
      })()
    },[update])
    async function clearLikes() {
      await axios.delete('/likes/clear')
      toast("Likes cleared", {type: "info"})
      setUpdate(true)
    }
  return me ? (
    <div id='liked'>
        <ProfileNav activePage={"Favorites"}/>
        <section id='data'>
            <div className="data-head">
                <h3>Favorites</h3>
                {likes?.length ? <button onClick={() => clearLikes()}><i className="fa-solid fa-xmark"></i> Clear all</button> : null}
            </div>
            {
              likes ? likes?.length ? 
                <div className='data-body'>
                    {likes?.map(l=> {
                      return <CardLike id={l.product.id} image={l.product.photo} title={l.product.title} key={l.id} price={l.product.price} setUpdate={setUpdate} discount={l.product.discount}/>
                    })}
                </div>
              :  
                <div className='no-products'>
                  <div className='start'>
                      <p className='no-products-text'>Sorry, there are no favorite products here yet.</p>
                      <Link to="/" className='link'>Start shopping</Link>
                  </div>
                  <img src={Empty} alt="" />
                </div>
              : <ReactLoading className= "loading" type="spinningBubbles" color="#00b3a8" height={300} width={300} />
            }  
        </section>
    </div>
  ) : null
}

export default Likes
