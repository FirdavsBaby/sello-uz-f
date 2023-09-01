import React, { useState } from 'react'
import "../styles/register.scss"
import Logo from '../../public/sello-logo.svg'
import Phone from '../../public/iphone.svg'
import AuthWindow from './Auth/AuthWindow';
import VerifyCode from './Auth/VerifyCode';
import Login from './Auth/Login';

const Auth = ({setAuthModal, authModal, setUpdate}) => {
  const [values, setValues] = useState({
    email: "",
    code: "",
    password: ""
})
  return (
    <div id='auth' className={authModal ? 'active' : ""}>
      <div className='block'>
        <div className='start_auth'>
          <img src={Logo} className='img_head' alt="" />
          <h3>
          New super app Sello!
          </h3>
          <p>
          Sign in in a minute to register in three applications at once.
          </p>
          <img src={Phone} className='img_footer' alt=""/>
        </div>
        <div className='end_auth'>
        {authModal === "sendCode" ? <AuthWindow setAuthModal={setAuthModal} setValues={setValues} values={values}/> : null}
        {authModal === "verifyCode" ? <VerifyCode setAuthModal={setAuthModal} setValues={setValues} values={values}/> : null}
        {authModal === "login" ? <Login setAuthModal={setAuthModal} values={values} setValues={setValues} setUpdate={setUpdate}/> : null}
        </div>
      </div>
    </div>
  )
}

export default Auth
