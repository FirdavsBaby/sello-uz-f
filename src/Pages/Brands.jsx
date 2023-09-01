import React, { useEffect, useState } from 'react'
import "../styles/brands.scss"
import axios from 'axios'
import { ReactLoading } from 'react-loading';
import { Link } from 'react-router-dom';

const Brands = () => {
    const [letter, setLetter] = useState("all")
    const [data,setData] = useState(null)
    const alphebets = [
        { uppercase: 'ALL', lowercase: 'all'},
        { uppercase: 'A', lowercase: 'a' },
        { uppercase: 'B', lowercase: 'b' },
        { uppercase: 'C', lowercase: 'c' },
        { uppercase: 'D', lowercase: 'd' },
        { uppercase: 'E', lowercase: 'e' },
        { uppercase: 'F', lowercase: 'f' },
        { uppercase: 'G', lowercase: 'g' },
        { uppercase: 'H', lowercase: 'h' },
        { uppercase: 'I', lowercase: 'i' },
        { uppercase: 'J', lowercase: 'j' },
        { uppercase: 'K', lowercase: 'k' },
        { uppercase: 'L', lowercase: 'l' },
        { uppercase: 'M', lowercase: 'm' },
        { uppercase: 'N', lowercase: 'n' },
        { uppercase: 'O', lowercase: 'o' },
        { uppercase: 'P', lowercase: 'p' },
        { uppercase: 'Q', lowercase: 'q' },
        { uppercase: 'R', lowercase: 'r' },
        { uppercase: 'S', lowercase: 's' },
        { uppercase: 'T', lowercase: 't' },
        { uppercase: 'U', lowercase: 'u' },
        { uppercase: 'V', lowercase: 'v' },
        { uppercase: 'W', lowercase: 'w' },
        { uppercase: 'X', lowercase: 'x' },
        { uppercase: 'Y', lowercase: 'y' },
        { uppercase: 'Z', lowercase: 'z' }
      ]
      useEffect(() => {
        (async function () {
          let data = null
          if (letter === "all") {
             data = await axios.get(`/brands`)
          }else {
            data = await axios.get(`/brands?name=${letter}`)
          }
          if (data.data.length === 0) {
            data = await axios.get(`/brands?name=${letter.toLocaleLowerCase()}`)
          }
          setData(data.data)
        })()
      },[letter])
      console.log(data);
  return (
    <div id='brands'>
      <section id='section-brands'>
      <div className="brands-head">
        <h2>Brands</h2>
        <p>We represent well-known local and global brands</p>
      </div>
      <div className="brands-body">
        <ul className="brands-aside">
            {alphebets.map((l) => {
                return letter === l.lowercase ? <li key={l.lowercase}><button className='active'>{l.uppercase}</button></li>: <li key={l.lowercase}><button onClick={() => setLetter(l.lowercase)}>{l.uppercase}</button></li>
            })}
        </ul>
        <ul className="brands-content">
        {data ? data?.map((b) => {
          return  <Link to={`/filter/all/all/${b.name}/all/all`} key={b.id} className='link-btn'><img src={`https://16.171.9.25/${b.photo}`} alt="" /></Link>
        }) : <h2 className='announcement'>No Brands.</h2>}
        </ul>
      </div>
      </section>
    </div>
  )
}

export default Brands
