import React, { useEffect, useState } from 'react'
import "../styles/profile.scss"
import User from '../../public/default-user.png'
import { Navigate } from 'react-router-dom';
import ProfileNav from './../Components/NavBars/ProfileNav';
import axios from 'axios'
import { toast } from 'react-toastify';


const Profile = () => { 
    const [me,setMe] = useState(null)
    const [modalActive,setActiveModal] = useState(false)
    const [gender, setGender] = useState(null)
    const [values,  setValues] = useState({
      username: "",
      last_name: "",
      email: "",
      first_name: "",
      number: "",
      birth: "",
      language: "",
      gender: "",
      photo: ""
    })
    const [update,setUpdate] = useState(false)
    const [file,setFile] = useState(null)
    const token = localStorage.getItem("token")
    const handleInputChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }
      function upperCase(str) {
        if (str) {
          return  str[0].toUpperCase() + str.slice(1)
        }
      }
      useEffect(() => {
        (async function() {
          const {data} = await axios.get("/profile/me", {headers: {Authorization: 'Bearer ' +  token}})
          setMe(data)
          setUpdate(false)
          setGender(data.gender)
        })()
      }, [update])
      async function senData(e) {
        e.preventDefault()
        if (!file && !values.username && !values.last_name && !values.email && !values.first_name && !values.number &&  !values.birth && !values.language && !values.gender) return toast("Nothing to update", {type: "error"})
        const form = new FormData()
        form.append("file", file)
        try {
           if (file) {
            const {data: photo} = await axios.post('/file', form)
            const {data} = await axios.put("/profile/update", {...values, photo : photo.name})
            toast.success(data.message, {type: "success"})
            setActiveModal(false)
            setUpdate(true)
           }
           else {
            if (gender) {
            const {data} = await axios.put("/profile/update", {...values, gender})
            toast.success(data.message, {type: "success"})
            setActiveModal(false)
            setUpdate(true)
            } else {
            const {data} = await axios.put("/profile/update", values)
            toast.success(data.message, {type: "success"})
            setActiveModal(false)
            setUpdate(true)
            }
           }
        } catch (error) {
          toast(error.response.data.message, {type: "error"})
        }
      }
  return me?.isVerified ? (
    <section id='profile-all'>
      <section id='profile'>
      <ProfileNav activePage={"Profile"}/>
      <div id='data'>
        <div className='data-head'>
          <h3>
          Personal Information
          </h3>
          <p>
          This is where your personal information is stored. Click "Edit" if you want to change your information.
          </p>
        </div>
        <div className="data-body">
          <img src={me?.photo ? `https://16.171.9.25/${me?.photo}` : User} alt="" />
          <div id='info'>
          <ul>
            <li>
              <span>FullName</span>
              {me?.first_name} {me?.last_name}
            </li>
            <li>
              <span>Phone number</span>
              +{me?.number}
            </li>
          </ul>
          <ul>
            <li>
              <span>Email</span>
              {me?.email}
            </li>
            <li>
              <span>Language of communication with Sello</span>
              {upperCase(me?.language)}
            </li>
          </ul>
          <ul className='with-edit'>
            <li>
              <span>Gender</span>
              {upperCase(me?.gender)}
            </li>
            <li className='edit'>
              <button onClick={() => {
                setActiveModal(true)
              }}>
              Edit
              </button>
            </li>
          </ul>
          </div>
        </div>
      </div>
      </section>
      { modalActive ? 
        <div id='profile-edit-modal'>
        <div className='modal'>
          <div className="modal-head">
          <div className='text'>
          <h2>Edit data</h2>
          <p>You can only change certain information here</p>
          </div>
          <button type='button' onClick={() => {
            setActiveModal(false)
          }}>
            <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <form className='modal-body' onSubmit={senData}>
            <div className='form-body'>
              <div className="table">
                  <img src={me?.photo ? `https://16.171.9.25/${me?.photo}` : User} alt="" />
                  <label htmlFor="file_inp" id='file_lable'>
                    Edit photo
                  </label>
                  <input type="file" name="photo" onChange={(e) => {
                    setFile(e.target.files[0])
                  }} id="file_inp" hidden/>
              </div>
              <div className="table input-table">
                <div className='inp-label'>
                    <label htmlFor="username">Username</label>
                    <input onChange={handleInputChange} value={values.username}  type="text" name="username" defaultValue={me?.username} id="username" placeholder={me?.username}/>
                </div>
                <div className='inp-label'>
                    <label htmlFor="last_name">Last-name</label>
                    <input onChange={handleInputChange} value={values.last_name}  type="text" name="last_name" id="last_name" defaultValue={me?.last_name} placeholder={me?.last_name}/>
                </div>
                <div className='inp-label'>
                    <label htmlFor="email">Email</label>
                    <input onChange={handleInputChange} value={values.email} defaultValue={me?.email}  type="email" name="email" id="email" placeholder={me?.email}/>
                </div>
                <div className='inp-label'>
                    <label htmlFor="gender">Gender</label>
                    <div className='inputs'>
                    <div className='radio-label'>
                        {me?.gender === 'male' ? <input onChange={() => {
                          setGender("male")
                          setValues({...values, gender: "male"})
                        }} value={values.gender}  type="radio" name="gender" id="" checked/> : <input onChange={() => {
                          setGender("male")
                          setValues({...values, gender: "male"})
                        }} value={values.gender}  type="radio" name="gender"  id=""/>}
                        <label htmlFor="">Male</label>
                        </div>
                        <div className='radio-label'>
                        {me?.gender === 'female' ? <input onChange={() => {
                          setGender("female")
                          setValues({...values, gender: "female"})
                        }} value={values.gender}  type="radio" name="gender"  id="" checked/> : <input onChange={() => {
                          setGender("female")
                          setValues({...values, gender: "female"})
                        }} value={values.gender}  type="radio" name="gender"  id=""/>}
                        <label htmlFor="">Female</label>
                        </div>
                    </div>
                </div>
              </div>
              <div className="table input-table">
              <div className='inp-label'>
                    <label htmlFor="firs_name">First-name</label>
                    <input onChange={handleInputChange} value={values.first_name}  type="text" name="first_name" id="firs_name" placeholder={me?.first_name}/>
                </div>
                <div className='inp-label'>
                    <label htmlFor="number">Phone number</label>
                    <input onChange={handleInputChange} value={values.number}  type="number" name="number" id="number" placeholder={me?.number}/>
                </div>
                <div className='inp-label'>
                    <label htmlFor="birth">Birth</label>
                    <input onChange={handleInputChange} value={values.birth}  type="date" name="birth" id="birth" placeholder={me?.birth}/>
                </div>
                <div className='inp-label'>
                    <label htmlFor="language">Language</label>
                      {me?.language === "English" ?   
                      <select  onChange={handleInputChange} value={values.language} type="number" name="language" id="language">
                        <option value="English">English</option>
                        <option value="Russian">Russian</option>
                        <option value="Uzbek">Uzbek</option>
                    </select> : null}
                    {me?.language === "Russian" ?   
                      <select  onChange={handleInputChange} value={values.language} type="number" name="language" id="language">
                        <option value="Russian">Russian</option>
                        <option value="English">English</option>
                        <option value="Uzbek">Uzbek</option>
                    </select> : null}
                    {me?.language === "Uzbek" ?   
                      <select  onChange={handleInputChange} value={values.language} type="number" name="language" id="language">
                        <option value="Uzbek">Uzbek</option>
                        <option value="English">English</option>
                        <option value="Russian">Russian</option>
                    </select> : null}
                </div>
              </div>
            </div>
            <div className="form-footer">
              <button type='button' onClick={() => {
                setActiveModal(false)
              }}>Cancle</button>
              <button>Save</button>
            </div>
          </form>
        </div>
      </div>
        : null
      }
    </section>
  ) : null
}

export default Profile
