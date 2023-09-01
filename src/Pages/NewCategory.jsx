import React, { useEffect, useState } from 'react'
import "../styles/newCategory.scss"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const NewCategory = () => {
  const [value,setValue] = useState({
    name: "",
    catalog_id: ""
  })
  const [data,setData] = useState(null)
  const navigte = useNavigate()
  async function newCategory(e) {
    e.preventDefault()
    if(!value.catalog_id || !value.name) return toast("Please all the fields", {type: "error"})
    try {
      await axios.post('/categories/new', value)
      toast("Category was created successfully", {type: "success"})
      navigte('/admin/categories')
    } catch (error) {      
    }
  }
  function handleOnchange(e) {
    setValue((v) => ({...v, [e.target.name]: e.target.value}))
  }
  useEffect(() => {
    (async function() {
      const {data} = await axios.get('/catalogs')
      setData(data)
    })()
  }, [])

  return (
    <div id='content'>
      <form onSubmit={newCategory}>
        <h2>New Category</h2>
        <input type="text" placeholder="Category Name" name='name' id='category' onChange={handleOnchange} value={value.name}/>
        <select name="catalog_id" onChange={handleOnchange}>
          <option value="" disabled selected>Select Catalog</option>
          {data?.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
        <button>CREATE</button>
      </form>
    </div>
  )
}

export default NewCategory
