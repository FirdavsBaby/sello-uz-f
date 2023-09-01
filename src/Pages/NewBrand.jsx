import React, { useState } from 'react'
import "../styles/newBrand.scss"
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const NewBrand = () => {
    const [values,setValues] = useState({
        name: "",
    })
    const [file, setFile] = useState(null)
    function handleOnchange(e) {
        setValues((v) => ({...v, [e.target.name]: e.target.value}))
    }
    const navigate = useNavigate()
    async function newBrand(e) {
        e.preventDefault()
        if(!file || !values.name) return toast("Please field all the fields", {type: "error"})
        try {
            const form = new FormData()
            form.append('file', file)
            const {data} = await axios.post('/file', form)
            await axios.post('/brands/new', {...values, photo:data.name})
            toast("Brand added successfully", {type: "success"})
            navigate('/admin/brands')
        } catch (error) {
        }
    }
  return (
    <div id='content'>
      <form onSubmit={newBrand}>
        <h2>New Brand</h2>
        <input type="text" onChange={handleOnchange} value={values.name} name="name" id="" placeholder='Brand name'/>
        <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} id=""/>
        <button>CREATE</button>
      </form>
    </div>
  )
}

export default NewBrand
