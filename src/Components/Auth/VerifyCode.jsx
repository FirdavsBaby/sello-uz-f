import React from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const VerifyCode = ({setAuthModal, values, setValues}) => {
  const token = localStorage.getItem("token")
  function onChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
}
  async function verifyCode(e) {
    try {
      e.preventDefault()
      const {data} = await axios.put("/auth/verify", {code: values.code}, {headers: {Authorization: 'Bearer ' + token}})
      toast(data.message,{type: "success"})
      setAuthModal('login')
    } catch (error) {
      toast(error.response.data.message,{type: "error"})
    }
  }
  return (
      <form id='verify' onSubmit={verifyCode}>
        <div className='btn-x'>
        <button type='button' onClick={() => {
          setAuthModal(false)
          localStorage.removeItem("token")
        }}>
        <i className="fa-solid fa-xmark"></i>
        </button>
        </div>
        <h3>
          Please verify your account by entering the code sent to your
          email address.
        </h3>
       <div className="data">
       <input type="number" placeholder='999999' name='code' onChange={onChange} value={values?.code}/>
        {values.code ? values.code.length === 6 ? <button>Next</button> : <button disabled>Next</button> : <button disabled>Next</button>}
       </div>
      </form>
  )
}

export default VerifyCode
