import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import "../styles/updateProduct.scss"
import { toast } from 'react-toastify';

const UpdateProducts = () => {
    const {id} = useParams()
    const [data,setData] = useState(null)
    const [values, setValues] = useState({
        title: "",
        description: "",
        price: "",
        photo: "",
        info_key: "",
        info_value: "",
        info: ""
    })
    const [info,setInfo] = useState(null)
    const [file, setFile] = useState(null)
    function handleOnchange(e) {
        setValues((v) => ({...v, [e.target.name]: e.target.value}))
    }
    function infoAdd(info_key, info_value) {
        info.push({key: info_key, value: info_value})
        setValues((v) => ({...v, info_key: "", info_value: ""}))
    }
    useEffect(() => {
        (async function() {
            const {data} = await axios.get(`/products/${id}`)
            setData(data)
            const keys = Object.keys(data.info)
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
    },[])
    const navigate = useNavigate()
    async function update() {
        try {
            const obj = info.reduce((result, item) => {
                result[item.key] = item.value;
                return result;
              }, {});
            if (file) {
                const form = new FormData()
                form.append('file', file)
                let {data:photo} = await axios.post('/file', form) 
                await axios.put(`/products/update/${id}`, {...values, photo: photo.name, info: obj, price: +values.price})
            }
            else {
                await axios.put(`/products/update/${id}`, {...values, price: +values.price, info: obj})
            }
            toast("Product updated successfully", {type: "success"})
            navigate('/admin/products')
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div id='content'>
       <form>
            <div className="label-inp">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={values.title ? values.title : data?.title} onChange={handleOnchange} id="title" />
            </div>
            <div className="label-inp">
            <label htmlFor="description">Description</label>
            <textarea type="text" name="description" value={values.description ? values.description : data?.description} onChange={handleOnchange} id="description" />
            </div>
            <div className="label-inp">
            <label htmlFor="price">Price</label>
            <input type="number" name="price" value={values.price ? values.price : data?.price} onChange={handleOnchange} id="price" />
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
                <button type='button' onClick={() => update(data?.id)}>UPDATE</button>
        </form> 
    </div>
  )
}

export default UpdateProducts
