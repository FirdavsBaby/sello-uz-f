import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';

const AdminDiscount = () => {
    const [data,setData] = useState(null)
    const [update,setUpdate] = useState(false)
    useEffect(() => {
        (async function() {
            setUpdate(false)
            const {data} = await axios.get('/discount')
            setData(data)
        })()
    }, [update])
    async function endDiscount(id) {
        await axios.delete(`/discount/delete/${id}`)
        toast("Discount ended successfully", {type: "info"})
        setUpdate(true)
    }
  return (
    <div id='content'>
      <div className="content-head">
        <h2>Discounts</h2>
        <Link to="/admin/new/discount" className='add-product'>NEW DISCOUNT</Link>
      </div>
        <table className='categories'>
            <tr>
                <th>Product</th>
                <th>Discount Percent</th>
                <th>end_date</th>
                <th>Action</th>
            </tr>
            {data?.map((d) => {
                return (
            <tr key={d.id}>
                <td>{d.product.title}</td>
                <td>{d.percent}%</td>
                <td>{d.end_date.split("T")[0]}</td>
                <td><button onClick={() => endDiscount(d.id)}>END</button></td>
            </tr>
                )
            })}
        </table>
    </div>
  )
}

export default AdminDiscount
