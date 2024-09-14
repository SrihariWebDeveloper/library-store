import React, { useState, useContext } from 'react'
import './login.css'
import Cross from '../../assets/Forntend/cross.jpg'
import axios from "axios"
import { StoreContext } from '../Context.js'

import { toast } from 'react-toastify'

const Login = ({ setShowLogin }) => {

  const {url,setToken} = useContext(StoreContext)
  const [state, setState] = useState("Login")

  const [data,setData] = useState({
    "name":"",
    "email":"",
    "password":""
  })

  const onchaneHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onLogin = async (event) =>{
    event.preventDefault()
    const newUrl = url;

    if(state==="Login"){
      const response = await axios.post(`${newUrl}/login`,data);
      if(response.data.sucess){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false);
        toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }

    }else{
      const response = await axios.post(`${newUrl}/signup`,data);
      if(response.data.sucess){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false);
        toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }
    }
  }
  return (
    <div className='login'>
      <form onSubmit={onLogin} className='form-filds'>
        <div className="heading">
          <div className="filds">
            <h2>{state}</h2>
            <img src={Cross} alt="" onClick={() => setShowLogin(false)} />
          </div>
        </div>
        <div className="input-fileds">
          {state === "Sign Up" ? <input type="text" name="name" onChange={onchaneHandler} value={data.name} placeholder='Name' autoComplete='off'/> : <></>}
          <input type="email" name="email" onChange={onchaneHandler} value={data.email} placeholder='Email' autoComplete='off' />
          <input type="password" name="password" onChange={onchaneHandler} value={data.password} placeholder='Password' autoComplete='off'/>
          <div className="conditions">
            <input type="checkbox" name="" id="" />
            <p>I agree the above information is true</p>
          </div>
        </div>
        <div className="btns">
          <button type='submit'>{state === "Sign Up" ? "SignIn" : "LogIn"}</button>
        </div>
        <div className="anuthor">
          {state === "Sign Up"
            ? <p>Already have an account? <span onClick={() => setState("Login")}>Click Here</span></p>
            : <p>Create an account? <span onClick={() => setState("Sign Up")}>Click Here</span></p>
          }
        </div>
      </form>
    </div>
  )
}

export default Login
