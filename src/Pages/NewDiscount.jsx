import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const NewDiscount = () => {
    const [values, setValues] = useState({
        percent: "",
        end_date: "",
        product_id: ""
    })
    const navigate = useNavigate()
    function handleOnchange(e) {
        setValues((v) => ({...v, [e.target.name]: e.target.value}))
    }
    const [data, setData] = useState(null)
    useEffect(() => {
        (async function() {
            const {data} = await axios.get('/products/without/discount')
            setData(data)
        })()
    },[])
    async function newDiscount(e) {
        e.preventDefault()
        if(!values.end_date || !values.percent || !values.product_id) return toast("Please field all the field", {type: "error"})
        try {
            await axios.post('/discount/new', {...values, percent: +values.percent})
            toast("Discount successfully started", {type: "success"})
            navigate("/admin/discount")
        } catch (error) {
        }
    }
  return (
    <div id='content'>
        <form onSubmit={newDiscount}>
            <h2>New Discount</h2>
            <input type="number" onChange={handleOnchange} value={values.percent} name="percent" id="" placeholder='Discount percent'/>
            <input type="date" onChange={handleOnchange} value={values.end_date} name="end_date" id="" />
            <select onChange={handleOnchange} value={values.product_id} name="product_id" id="">
                <option value="" selected disabled>Product</option>
                {data?.map((p) => {
                    return <option value={p.id}>{p.title}</option>
                })}
            </select>
                <button>START DISCOUNT</button>
        </form>
    </div>
  )
}

export default NewDiscount
