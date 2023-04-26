import React from 'react'
import loginImg from '../assets/City.jpg'
import {useState} from 'react'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      console.log(email, password)
    }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='hidden sm:block'>
            <img className='w-full h-full object-cover' src={loginImg} alt="" />
        </div>

        <div className='bg-darkGrey flex flex-col justify-center'>
            <form className='max-w-[400px] w-full mx-auto rounded-lg bg-darkGrey p-8 px-8' onSubmit={handleSubmit}>
                <h2 className='text-4xl dark:text-white font-bold text-center'>SIGN IN</h2>
                
                <div className='flex flex-col text-white py-2'>
                    <label>Email</label>
                    <input className='rounded-lg bg-grey mt-2 p-2  focus:outline-none' 
                    type="Email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    />
                </div>

                <div className='flex flex-col text-white py-2'>
                    <label>Password</label>
                    <input className='p-2 rounded-lg bg-grey mt-2  focus:outline-none' 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                    />
                </div>

                <div className='flex justify-between text-white py-2'>
                    <p className='flex items-center accent-yellow'><input className='mr-2' type="checkbox" /> Remember Me</p>
                    <p >Forgot Password</p>
                </div>

                <button className='w-full my-5 py-2 bg-yellow shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/40 text-black font-semibold rounded-lg'>SIGNIN</button>
            </form>
        </div>
        
    </div>

    
  )
}
