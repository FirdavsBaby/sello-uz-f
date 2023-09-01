import React, { useEffect, useState } from 'react'
import "../styles/filter.scss"
import Card from './../Components/Card';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactLoading from 'react-loading'


const Filter = () => {
  const {category, catalog, brand, discount, search} = useParams()
  const [values, setValues] = useState({
    from: 0,
    to: 3000,
    category: category !== "all" ? category : "",
    catalog: catalog !== "all" ? catalog : "",
    brand: brand !== "all" ? brand : "",
    discount: discount !== "all" ? discount :  discount === "all-discounts" ? "all" : "" ,
    search: search !== "all" ? search : ""
  })
  if(catalog !== values.catalog && catalog !== "all") {
    setValues((v) => ({...v, catalog}))
  }
  if (category !== values.category && category !== "all") {
    setValues((v) => ({...v, category}))
  }
  if (search !== values.search && search !== "all") {
    setValues((v) => ({...v, search}))
  }
  const [count,setCount] = useState(24)
  const [productCount,setProductCount] = useState(0)
  const [brands, setBrands] = useState(null)
  const [data,setData] = useState(null)
  const [catalogs,setCatalogs] = useState(null)
  const [categories, setCategories] = useState(null)
  const [discounts, setDiscounts] = useState(null)
  
  function OnChangeBrand(name) {
    if (name === values.brand) {
      return setValues((v) => ({ ...v, brand: "" }));
    }
    setValues((v) => ({ ...v, brand: name }));
  }
  function OnChangeDiscount(percent) {
    if (percent === values.discount) {
      return setValues((v) => ({ ...v, discount: "" }));
    }
    setValues((v) => ({ ...v, discount: percent}));
    console.log(values.discount);
  }
  function OnChangeCategory(name) {
    if (name === values.category) {
      return setValues((v) => ({ ...v, category: "" }));
    }
    setValues((v) => ({ ...v, category: name }));
  }

  function PriceOnChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: SomTo$(e.target.value === "" ? 3000 : e.target.value) }));
  }
  const navigate = useNavigate()
  function selectCatalogChange(e) {
    navigate(`/filter/${e.target.value}/all/all/all/all`)
  }
  function selectCategoryChange(e) {
    navigate(`/filter/all/${e.target.value}/all/all/all`)
  }
  useEffect(()=> {
    (async function() {
      const {data} = await axios.get(`/products?count=${count}&category=${values.category}&catalog=${values.catalog}&brand=${values.brand}&start_price=${values.from}&end_price=${values.to}&discount=${values.discount}&search=${values.search}`) 
      setData(data.products)
      setProductCount(data.count)
    })()
  },[count, values.from, values.to, values.category, values.catalog, values.brand, values.discount, values.search])
  useEffect(()=> {
    (async function() {
      const {data:brands} = await axios.get("/brands")
      const {data:catalogs} = await axios.get("/catalogs")
      const {data:categories} = await axios.get("/categories")
      const {data:discount} = await axios.get("/discount")
      setDiscounts(discount);
      setBrands(brands)
      setCatalogs(catalogs)
      setCategories(categories)
    })()
  }, [])
  function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function $toSom(number) {
  const exchangeRate = 10500
  const sum = number * exchangeRate
  return sum.toLocaleString()
}
function SomTo$(number) {
  const exchangeRate = 10500
  const sum = number / exchangeRate
  const round = Math.round(sum)
  return round + ""
}
  return (
    <div id='filter'>
    <aside>
    <div className="aside-head">
      <h2>
      {!values.catalog && !values.brand  && !values.category && values.from === 0 && values.to === 3000  && !values.discount && !values.search? "All Products"
      : values.catalog && !values.category && !values.search ?  capitalizeFirstLetter(values.catalog)
      : values.category && !values.search ? capitalizeFirstLetter(values.category) 
      : values.brand && !values.search ? capitalizeFirstLetter(values.brand) 
      : values.discount && !values.search && values.discount !== "all-discounts" ? `Discount ${values.discount}%`
      : values.discount === "all-discounts" ?  "All discount products" 
      : values.search ? `Search request ${values.search}` 
      : null
      }
      </h2>
      <p>There are <span>{productCount}</span> products in this section.</p>
      </div>
    <div className="sort">
        <h4>Price</h4>
        <div className='from-price'>
            <label htmlFor="inp-from">From</label>
            <input type="text" id='inp-from' name='from' onChange={PriceOnChange}  defaultValue={$toSom(values.from)} placeholder="0 so'm"/>
        </div>
        <div className='to-price'>
            <label htmlFor="inp-to">To</label>
            <input type="text" id='inp-to' name='to' onChange={PriceOnChange} defaultValue={$toSom(values.to)} placeholder="30 000 000 so'm"/>
        </div>
    </div>
    <div className="sort">
        <h4>Brand</h4>
        <ul className='sort-type'>
          {brands?.map((b) => {
            return <li key={b.id}><div className="label-inp"><input type="checkbox" name="brand" onChange={() => OnChangeBrand(b.name)} id={b.id} /><label htmlFor={b.id}>{b.name}</label></div></li>
          })}
        </ul>
    </div>
    <div className="sort">
        <h4>Category</h4>
        <ul className='sort-type'>
        {categories?.map((c) => {
          return <li key={c.id}><div className="label-inp"><input type="checkbox" name="category" onChange={() => OnChangeCategory(c.name)} id={c.id} /><label htmlFor={c.id}>{c.name}</label></div></li>
        })}
        </ul>
    </div>
    <div className="sort">
        <h4>Discount</h4>
        <ul className='sort-type'>
          {discounts?.map((d) => {
            return <li key={d.id}><div className="label-inp"><input type="checkbox" name="discount" onChange={() => OnChangeDiscount(d.percent)} id={d.id} /><label htmlFor={d.id}>{d.percent}</label></div></li>
          })}
        </ul>
    </div>
    </aside>
    <section id='section-filter'>
      <div className='section-head'>
        <select name="catalog" onChange={selectCatalogChange}>
            {catalogs ? catalogs?.map((c) => {
            return <option key={c.id}>{c.name}</option>
            }) : <option>Catalogs</option>}
        </select>
        <select name='category' onChange={selectCategoryChange}>
            {categories?.map((c) => {
              return <option key={c.id}>{c.name}</option>
            })}
        </select>
      </div>
      <div className="cards">
      {data ? data.length ? data?.map((p) => {
          return <Card  price={p.price} title={p.title} image={p.photo} id={p.id} discount={p.discount} key={p.id}/>
        })   : <h2 className='announcement'>No Products.</h2> : <ReactLoading className= "loading" type="spinningBubbles" color="#00b3a8" height={300} width={300} />}
      </div>
      <div className='section-footer'>
        <button onClick={() => setCount((v) => v * 2)}>
            Load More
        </button>
      </div>
    </section>
    </div>
  )
}

export default Filter
