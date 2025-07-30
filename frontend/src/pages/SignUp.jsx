import React, { useContext , useState ,useRef} from 'react'
import dp from "../assets/dp.webp"
import { dataContext } from '../context/UserContext'
import axios from "axios"
import {useNavigate} from "react-router-dom"
function SignUp() {
let {serverUrl,userData , setUserData,getUserData} =  useContext(dataContext)
let navigate = useNavigate()
    let[firstName, setFirstName] = useState(null)
    let[lastName, setLastName] = useState(null)
    let[userName, setUserName] = useState(null)
    let[email, setEmail] = useState(null)
    let[password, setPassword] = useState(null)
    let file = useRef(null)

    const handleSignUP = async (e)=>{
         e.preventDefault()
         try {
          let formdata = new FormData()
          formdata.append("firstName",firstName)
          formdata.append("lastName",lastName)
          formdata.append("userName",userName)
          formdata.append("email",email)
          formdata.append("password",password)
          if(backendImage){
            formdata.append("profileImage",backendImage)
          }
            let {data} = await axios.post(serverUrl + "/api/signup",formdata,{withCredentials:true,
              headers:{"Content-Type":"multipart/form-data"}
            })
            await getUserData()
            setUserData(data.user)
           navigate("/")
         } catch (error) {
            console.log(error.message);
         }
    }
let [frontendImage, setFrontendImage] = useState(dp)
let [backendImage, setBackendImage] = useState(null)
    function handleImage(e){
      let file = e.target.files[0]
      setBackendImage(file)
      let image = URL.createObjectURL(file)

      setFrontendImage(image)
    }

  return (
    <div className='w-full h-[100vh] bg-black flex justify-center items-center'>
      <div className='w-[90%] max-w-[500px] h-[600px] bg-[#141f1f] rounded flex flex-col justify-center items-center gap-[20px] '>
        <h1 className='text-white text-[24px] font-semibold '>Sign Up</h1>
        <form className='w-[100%] flex flex-col items-center justify-center gap-[20px]' onSubmit={handleSignUP}>
          <input type='file' hidden ref={file} onChange={handleImage}/>
            <div className='w-[100px] h-[100px] rounded-full bg-white overflow-hidden relative border-2 border-white'>
             <img src={frontendImage} alt='' className='w-[100%] h-[100%]' />
             <div className=' w-[100%] h-[100%] bg-black top-0 absolute opacity-0 hover:opacity-50  flex justify-center items-center text-white text-[20px] font-semibold cursor-pointer' onClick={()=>{file.current.click()}}>+</div>
            </div>
            <div className='w-[80%] h-[50px] flex justify-center items-center gap-[10px]'>
                <input type="text" placeholder='first name' className='w-[50%] h-[100%] bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                <input type="text" placeholder='last name' className='w-[50%] h-[100%] bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
            </div>
            <input type='text' placeholder='username' className='w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'value={userName} onChange={(e)=>setUserName(e.target.value)}/>
            <input type='email' placeholder='email' className='w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' placeholder='password' className='w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-[10px] py-[5px]'value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className='bg-[#07c7e4] text-black px-[10px] py-[5px] rounded-lg'>Sign Up</button>
            <p className='text-white cursor-pointer' onClick={()=>navigate("/login")}>Already have an account ? <span className='text-[#0ed3e1]'>Login</span></p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
