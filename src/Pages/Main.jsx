import React, { useEffect, useState } from 'react'
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import axios from 'axios'
import { Link, useOutletContext } from 'react-router-dom';
import '../styles/main.scss'
import Card from '../Components/Card';
import ReactLoading from 'react-loading'
import zayavka1 from "../../public/zayavka1.png";
import zayavka2 from "../../public/zayavka2.png";

const Main = () => {
  const [setUpdate, me] = useOutletContext()
  const [data, setData] = useState([])
  const [discount, setDiscount] = useState(null)
  const [products, setProducts] = useState(null)
  const [newest, setNewest] = useState(null)
  const [categories, setCategories] = useState(null)
  const [brands, setBrands] = useState(null)
  useEffect(()=> {
    (async function() {
      const {data} = await axios.get("/discount")
      const {data : all_products} = await axios.get(`/products?count=18`)
      const {data : categories} = await axios.get(`/categories`)
      const {data : all_brands} = await axios.get('/brands')
      
      const products = data?.slice(0, 8)
      const brands = all_brands?.slice(0,15)
      const mappedProducts = products?.map((p) => {
        return (
          <Link className='link' to={`/product/${p.product.id}`}><img src={`https://16.171.9.25/${p.product.photo}`} alt="" /></Link>
        )
      })
      const slisedCategories = categories.slice(0, 12)
      function compareDates(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      
      const sortedObjects = all_products.products.sort(compareDates);
      

      const fiveObjects = sortedObjects.slice(0, 10);
      setBrands(brands)
      setNewest(fiveObjects)
      setDiscount(data)
      setCategories(slisedCategories)
      setData(mappedProducts)
      setProducts(all_products.products)
    })()
  },[])
  return (
    <section id='main-section'>
     <div className='carousel-link'>
     <AliceCarousel mouseTracking items={data ? data : ""} autoPlay autoPlayInterval={4000} infinite/>
     <img src={zayavka1} alt="" />
     </div>
      <section id='products'>
      <h2>All Products</h2>
        <div className='cards'>
        {products ? products.length ? products?.map((p) => {
          return <Card  price={p.price} title={p.title} image={p.photo} discount={p.discount} key={p.id} id={p.id}/> 
        })   : <h2 className='announcement'>No Products.</h2> : <ReactLoading className= "loading" type="spinningBubbles" color="#00b3a8" height={300} width={300} />}
        </div>
        <h2>Novelties</h2>
        <div className='cards'>
        {newest ? newest.length ? newest?.map((p) => {
          return <Card  price={p.price} title={p.title} image={p.photo} discount={p.discount} key={p.id} id={p.id}/>
        })   : <h2 className='announcement'>No Products.</h2> : <ReactLoading className= "loading" type="spinningBubbles" color="#00b3a8" height={300} width={300} />}
        </div>
        <h2>Discount</h2>
        <div className='cards'>
        {discount ? discount.length ? discount?.map((p) => {
          return <Card  price={p.product.price} title={p.product.title} image={p.product.photo} id={p.product.id} discount={p} key={p.id}/>
        })   : <h2 className='announcement'>No Products.</h2> : <ReactLoading className= "loading" type="spinningBubbles" color="#00b3a8" height={300} width={300} />}
        </div>
      </section>
      <section id='categories'>
          <h4>We have selected for you the most popular categories on Sello</h4>
          <ul className="links">
          {categories ? categories.length ? categories?.map((c) => {
          return <Link key={c.id} to={`/filter/all/${c.name}/all/all/all`} className='link-btn'>{c.name}</Link>
        }) : <h2 className='announcement'>No Categories.</h2>  :  <ReactLoading className= "loading" type="spinningBubbles" color="#00b3a8" height={300} width={300} />}
          </ul>
      </section>
      <section id='partners-link'>
        <img src={zayavka2} alt="" />
        <div className="partners">
        <h2>Our partners</h2>
        <p>By cooperating with us, you can increase the sales of your store.</p>
      <div className='cards'>
      <ul className="links">
          {brands ? brands.length ? brands?.map((b) => {
          return  <Link to={`/filter/all/all/${b.name}/all/all`} key={b.id} className='link-btn'><img src={`https://16.171.9.25/${b.photo}`} alt="" /></Link>
        }) : <h2 className='announcement'>No Brands.</h2>  :  <ReactLoading className= "loading" type="spinningBubbles" color="#00b3a8" height={300} width={300} />}
          </ul>
      </div>
        </div>
      </section>
    </section>
  )
}

export default Main
