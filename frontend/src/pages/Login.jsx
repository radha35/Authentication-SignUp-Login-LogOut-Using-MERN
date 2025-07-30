import React, { useContext, useState } from 'react'
import { dataContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  let { serverUrl,userData,setUserData,getUserData} = useContext(dataContext)
  let [email, setEmail] = useState("")
  let navigate = useNavigate()
  let [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      let {data} = await axios.post(
        serverUrl + "/api/login",
        {
          email,
          password,
        },
        { withCredentials: true })
      
       setUserData(data.user)
      await getUserData()
      
      if(userData){
              navigate("/")
            }
    } catch (error) {
      
      alert(error.response.data.message)
    }
  }

  return (
    <div className='w-full h-[100vh] bg-black flex justify-center items-center'>
      <div className='w-[90%] max-w-[500px] h-[600px] bg-[#141f1f] rounded flex flex-col justify-center items-center gap-[20px]'>
        <h1 className='text-white text-[24px] font-semibold'>Login</h1>
        <form
          className='w-[100%] flex flex-col items-center justify-center gap-[20px]'
          onSubmit={handleLogin}
          
        >
          <input
            type='email'
            placeholder='email'
            className='w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            className='w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='bg-[#07c7e4] text-black px-[10px] py-[5px] rounded-lg'>
            Login
          </button>
          <p className='text-white cursor-pointer' onClick={()=>navigate("/signup")}>Want to Create new account ? <span className='text-[#0ed3e1]'>Sign Up</span></p>
        </form>
      </div>
    </div>
  )
}

export default Login
