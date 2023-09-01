import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import "../styles/updateProduct.scss"
import { toast } from 'react-toastify';

const NewProduct = () => {
    const [categories, setCategories] = useState(null)
    const [brands, setBrands] = useState(null)
    const [values, setValues] = useState({
        title: "",
        description: "",
        price: "",
        photo: "",
        info_key: "",
        info_value: "",
        info: "",
        category: "",
        brand: ""
    })
    const [info,setInfo] = useState([])
    const [file, setFile] = useState(null)
    function handleOnchange(e) {
        setValues((v) => ({...v, [e.target.name]: e.target.value}))
    }
    function infoAdd(info_key, info_value) {
        if (!info_key &&  !info_value) return toast("Info is not completed", {type: "error"})
        info.push({key: info_key, value: info_value})
        setValues((v) => ({...v, info_key: "", info_value: ""}))
    }
    const navigate = useNavigate()
    async function create(e) {
        e.preventDefault()
        if (!values.title || !values.description || !values.category || !values.brand || !file || !info.length || !values.price) return toast("Please field all the field", {type: "error"})
        try {
            const obj = info.reduce((result, item) => {
                result[item.key] = item.value;
                return result;
              }, {});
                const form = new FormData()
                form.append('file', file)
                let {data:photo} = await axios.post('/file', form) 
                await axios.post(`/products/new`, {...values, photo: photo.name, info: obj, price: +values.price})
            toast("Product added successfully", {type: "success"})
            navigate('/admin/products')
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        (async function() {
            const {data:brands} = await axios.get('/brands')
            const {data:categories} = await axios.get('/categories')
            setBrands(brands);
            setCategories(categories);
        })()
    },[])
  return (
    <div id='content'>
       <form onSubmit={create}>
            <div className="label-inp">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={values.title} onChange={handleOnchange} id="title" />
            </div>
            <div className="label-inp">
            <label htmlFor="description">Description</label>
            <textarea type="text" name="description" value={values.description} onChange={handleOnchange} id="description" />
            </div>
            <div className="label-inp">
            <label htmlFor="price">Price</label>
            <input type="number" name="price" value={values.price} onChange={handleOnchange} id="price" />
            </div>
            <div className="label-inp">
            <label htmlFor="brand">Brand</label>
                <select onChange={handleOnchange} name="brand" id="brand">
                <option selected disabled>Brand</option>
            {brands?.map((b) => {
                return <option value={b.id}>{b.name}</option>
            })}
                </select>
            </div>
            <div className="label-inp">
            <label htmlFor="category">Category</label>
            <select onChange={handleOnchange} name="category" id="category">
                <option selected disabled>Category</option>
            {categories?.map((c) => {
                return <option value={c.id}>{c.name}</option>
            })}
            </select>
            </div>
            <div className="label-inp">
            <label htmlFor="photo">Photo</label>
            <input type="file" name="photo" id="photo" onChange={(e) => {
                setFile(e.target.files[0])
            }}/>
            </div>
            <div className="label-inp">
            <label htmlFor="photo">Info</label>
            <div className="add-btn">
            <input type="text" name="info_key" onChange={handleOnchange} value={values.info_key} id="info" placeholder='Key'/>
            <input type="text" name="info_value" onChange={handleOnchange} value={values.info_value} id="info" placeholder='Value'/>
            <button type='button' onClick={() => infoAdd(values.info_key, values.info_value)}>+</button>
            </div>
            </div>
            <ul className="info">
                {info?.map((i) => {
                    return (
                        <li key={i.key}>
                        <span>{i.key}</span>: <span>{i.value}</span><button type='button' onClick={() => setInfo((v) => v.filter(item => item.key !== i.key))}>-</button>
                         </li>
                    )
                })}
            </ul>
                <button>CREATE</button>
        </form> 
    </div>
  )
}

export default NewProduct
