import React, { useEffect, useState } from 'react'
import "../styles/newCategory.scss"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const NewCatalog = () => {
  const [value,setValue] = useState({
    name: "",
  })
  const navigte = useNavigate()
  async function newCategory(e) {
    e.preventDefault()
    if(!value.name) return toast("Please all the fields", {type: "error"})
    try {
      await axios.post('/catalogs/new', value)
      toast("Catalog was created successfully", {type: "success"})
      navigte('/admin/catalogs')
    } catch (error) {
    }
  }
  function handleOnchange(e) {
    setValue((v) => ({...v, [e.target.name]: e.target.value}))
  }
  return (
    <div id='content'>
      <form onSubmit={newCategory}>
        <h2>New Catalog</h2>
        <input type="text" placeholder="Catalog Name" name='name' id='catalog' onChange={handleOnchange} value={value.name}/>
        <button>CREATE</button>
      </form>
    </div>
  )
}

export default NewCatalog
