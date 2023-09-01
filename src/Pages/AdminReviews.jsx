import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AdminReviews = () => {
    const [data,setData] = useState(null)
    useEffect(() => {
        (async function() {
            const {data} = await axios.get('/reviews')
            setData(data)
        })()
    },[])
  return (
    <div id='content'>
      <div className="content-head">
        <h2>Reviews</h2>
      </div>
      <table>
        <tr>
            <th>Product</th>
            <th>commentary</th>
            <th>star</th>
        </tr>
        {data?.map((r) => {
            return (
            <tr key={r.id}>
                <td>{r.product.title}</td>
                <td>{r.commentary}</td>
                <td>{r.star}</td>
            </tr>
            )
        })}
      </table>
    </div>
  )
}

export default AdminReviews
