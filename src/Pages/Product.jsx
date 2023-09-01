import React, { useEffect, useState } from 'react'
import '../styles/product.scss'
import UZ from '../../public/uz.svg'
import Card from './../Components/Card';
import { useParams } from 'react-router';
import axios from 'axios'
import { useOutletContext, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Product = () => {
    const {id} = useParams()
    const [tootlip, setTootlip] = useState(0)
    const [setUpdate, me] = useOutletContext()
    const [data, setData] = useState(null)
    const [info, setInfo] = useState(null)
    const [raiting,setRaiting] = useState(null)
    const [values,setValues] = useState({
        commentary: "",
        photo: "",
        product_id: "",
        star: 0,
    })
    function handleOnChange(e) {
        setValues((v) =>({...v, [e.target.name]: e.target.value}))
    }
    const [file,setFile] = useState(null)
    const [rec, setRec] = useState(null)
    const [starsActive, setStars] = useState({
        star1: false,
        star2: false,
        star3: false,
        star4: false,
        star5: false
    })
    const [starCount, setStarCount] = useState(0)
    function hover(number) {
        setTootlip(number)
    }
    function $toSom(number) {
        const exchangeRate = 10500
        const sum = number * exchangeRate
        return sum.toLocaleString()
      }
    const [modal, setModal] = useState(false)
    async function newFeedback(e) {
        e.preventDefault()
        if (!values.commentary) return toast("Please field all the fields", {type: "error"})
        if (!starsActive.star1 && !starsActive.star2 && !starsActive.star3 && !starsActive.star4 && !starsActive.star5) return  toast("PLease set your grade", {type: "error"})
        if (!me) return toast("Register or login for leave feedback", {type: "error"})
        try {
            let count = 1
            for (const star in starsActive) {
                if (starsActive[star]) {
                  count++;
                }
              }
            let photo = null
            if (photo) {
                const {data} = await axios.post('/file')
                photo = data
            }
            await axios.post('/reviews/new', {...values, photo: photo?.name, product_id: data?.id, star: count})
            toast("Review sended successfully", {type: "success"})
            setModal(false)
        } catch (error) {
            console.log(error);
            toast(error.response.data.message, {type: "error"})
        }
    }
    useEffect(()=> {
        (async function(){
            window.scrollTo({
                top: 1,
                behavior: "smooth"
            })
            const {data} = await axios.get(`/products/${id}`)
            setData(data)
            const {data: recomendation} = await axios.get(`/products?count=12&category=${data.category.name}&catalog=${data.catalog.name}`)
            setRec(recomendation.products)
            const keys = Object.keys(data.info)
            let total_star = 0
            for (let i = 0; i < data.review?.length; i++) {
                total_star += data.review[i].star
            }
            setRaiting(total_star)
            const values = Object.values(data.info)
            const info = []
            for (let i = 0; i < keys.length; i++) {
                for (let j = i; j < values.length; j++) {
                    const obj = {
                        key: keys[i],
                        value: values[j]
                    }
                    const checkObj = info.find((o)=> o.key === keys[i])
                    if (!checkObj) {
                        info.push(obj)
                    } 
                }                
            }
            setInfo(info)
        })()
    },[id])
    async function addtoLike(id) {
        try {
            await axios.post('/likes/add', {product_id: id})
              setUpdate(true)
          } catch (error) {
            toast(error.response.data.message, {type: "error"})
          }
    }
    let token = localStorage.getItem('token')
    async function addToCart(id) {
        try {
          await axios.post('/cart/add', {product_id: id}, {headers: {Authorization: 'Bearer ' +  token}})
          setUpdate(true)
        } catch (error) {
          console.log(error);
        }
      }
      const navigate = useNavigate()
      async function purchase(id) {
        const cartItem = me?.cart.find((c) => c.product.id === id)
        if (!cartItem) {
          await axios.post('/cart/add', {product_id: id}, {headers: {Authorization: 'Bearer ' +  token}})
        }
        setUpdate(true)
        navigate("/purchase")
      }
  return data ? (
<div>
<section id='product'>
      <div className='product_info'>
        <div className='product_info_head'>
            <div className='start'>
                <h2>{data?.title}</h2>
                <p><i className="fa-solid fa-star"></i> {data?.review.length ? raiting / data?.review.length: 0} Rating</p>
            </div>
            <button onClick={() => addtoLike(data?.id)}><i className="fa-regular fa-heart"></i> ADD TO LIKED</button>
        </div>
        <div className="product_info_body">
            <div className='start'>
                <div className='bg' style={{backgroundImage: `url('https://16.171.9.25/${data?.photo}')`}}>
                </div>
                <img src={`https://16.171.9.25/${data?.photo}`} alt="" />
            </div>
            <div className='end'>
                <div className='end_header'>
                    <h4>Buy product for</h4>
                   <div className='price'>
                    <h2>{data?.discount ? $toSom(data?.price - (data?.price * data?.discount.percent / 100))  : $toSom(data?.price)} s'om</h2>
                    {data?.discount ? <p className='discount'>With discount {data?.discount?.percent}% <del>{$toSom(data?.price)} so'm</del></p> : null}
                   </div>
                    <p>Brand: {data?.brand.name}</p>
                    <div className="btns">
                        <button className='add-to-cart' onClick={() => addToCart(data?.id)}>ADD TO CART</button>
                        <button className='purchase' onClick={() => purchase(data?.id)}>PURCHASE</button>
                    </div>
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
        </div>
    </div>
    <br />
    <hr />
    <div className='product_characteristics'>
        <h3>Characteristics</h3>
        <ul className='characteristics'>
            <h2>Main characteristics</h2>
            {info?.map((o) => {
                return <li key={o.id}><span className='key'>{o.key}</span> <span className='value'>{o.value}</span></li>
            })}
        </ul>
    </div>
    <div className='product_description'>
        <h3>Description</h3>
        <div className='description'>
            <h2>Description {data?.description}</h2>
            <p>{data?.description}</p>
        </div>
    </div>
    <div className="product_reviews">
        <h3>Reviews</h3>
        <div className="reviews">
            <h3>Customer reviews of this product</h3>
            <button onClick={() => setModal(true)}>Leave feedback +</button>
        </div>
    </div>
    <div className="recomendation">
        <h3>Recomendation</h3>
        <div className="cards">
            {rec?.map((p)=> {
                return <Card key={p.id} image={p.photo} title={p.title} price={p.price} id={p.id} discount={p.discount}/>
            })}
        </div>
    </div>
</section>
    <div className={modal ? 'modal-review active' : 'modal-review'}>
        <form onSubmit={newFeedback}>
            <div className='modal-heading'>
            <h3>
                Leave feedback
            </h3>
            <button type='button' onClick={() => setModal(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <p className='info'>
            You can only change certain information here
            </p>
            <p className='raiting'>
            <i className="fa-solid fa-star"></i>
            {data?.review.length ? raiting / data?.review.length: 0} Raiting
            </p>
            <div className="modal_aside">
                <p>
                    Photo
                </p>
                <div className="input">
                <input type="file" name="" id="file" hidden onChange={(e) => setFile(e.target.files[0])}/>
                <label htmlFor="file"><i className="fa-solid fa-image"></i></label>
                </div>
            </div>
            <div className='modal_body'>
                <p>Grade</p>
                <div className="stars">
                <i className={`fa-${starsActive.star1 ? "solid": "regular"} fa-star`} onClick={() => (function() {
                    setStars({...starsActive, star1:!starsActive.star1})
                    setStarCount(starsActive.star2 ? starCount - 1 : starCount + 1)
                })()}></i>
                 <i className={`fa-${starsActive.star2 ? "solid": "regular"} fa-star`} onClick={() => (function() {
                    setStars({...starsActive, star2:!starsActive.star2})
                    setStarCount(starsActive.star2 ? starCount - 1 : starCount + 1)
                })()}></i>
                 <i className={`fa-${starsActive.star3 ? "solid": "regular"} fa-star`} onClick={() => (function() {
                    setStars({...starsActive, star3:!starsActive.star3})
                    setStarCount(starsActive.star3 ? starCount - 1 : starCount + 1)
                })()}></i>
                 <i className={`fa-${starsActive.star4 ? "solid": "regular"} fa-star`} onClick={() => (function() {
                    setStars({...starsActive, star4:!starsActive.star4})
                    setStarCount(starsActive.star4 ? starCount - 1 : starCount + 1)
                })()}></i>
                 <i className={`fa-${starsActive.star5 ? "solid": "regular"} fa-star`} onClick={() => (function() {
                    setStars({...starsActive, star5:!starsActive.star5})
                    setStarCount(starsActive.star5 ? starCount - 1 : starCount + 1)
                })()}></i>
                </div>
            </div>
            <div className='modal_footer'>
                <p>Commentary</p>
                <textarea name="commentary" value={values.commentary} id="" cols="55" rows="5" placeholder='Commentary' onChange={handleOnChange}></textarea>
                <div className='btns'>
                    <button type='button' onClick={() => setModal(false)} className='cancle'>Cancle</button>
                    <button className='send'>Send</button>
                </div>
            </div>
            
        </form>
    </div>
</div>
  ) : <h1 style={{marginTop: "150px", backgroundColor: "white", textAlign: "center"}}>Product not found..</h1>
}

export default Product
