import React, { useState } from 'react';
import SignUpImg from '../assets/pic2.jpg'
import {useNavigate} from 'react-router-dom'
import { useHttpClient } from '../shared/hooks/http-hook';

export default function Signup() {
  const [optionValue, setOptionValue] = useState("");
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [roleName, setRoleName] = useState('')
  const [role, setRole] = useState('')

  const navigate = useNavigate()
  const { error, sendRequest } = useHttpClient();

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value === "" ) {
      setOptionValue("");
    } else {
      setOptionValue(value);
      setRole(value === '1' ? 'startup' : 'investor');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (role === 'startup') {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/auth/signup/${role}`,'POST',JSON.stringify({
						email,
						password,
						role,
						companyName: roleName,
					}),
					{
						'content-type': 'application/json',
					},
				
			);
			if (responseData.email) {
				console.log(responseData);

				navigate('/cfo');
			} else {
				console.log(error);
			}
		} else {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/auth/signup/${role}`,'POST',JSON.stringify({ email, password, role, name: roleName }),{
						'content-type': 'application/json',
					},
				
			);
	
			if (responseData.email) {
				console.log(responseData);

				navigate('/updates');
			} else {
				console.log(error);
			}
		}
  }
  
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>

        <div className='hidden sm:block'>
            <img className='w-full h-screen object-cover ' src={SignUpImg} alt="" />
        </div>

      <div className='bg-darkGrey flex flex-col justify-center '>
        <form className='max-w-[400px] w-full mx-auto rounded-lg bg-darkGrey p-8 px-8'  onSubmit={handleSubmit}>
            <h1 className='text-4xl dark:text-white font-bold text-center'>SIGNUP</h1>

          <div className='flex flex-col text-white py-2'>
            <label>Email</label>
            <input className='rounded-lg bg-grey mt-2 p-2  focus:outline-none' 
            type='email'
            onChange={(e) => setEmail(e.target.value)} 
            value={email} />
          </div>

          <div className='flex flex-col text-white py-2'>
            <label>Are you an investor or a startup?</label>
            <select className='rounded-lg bg-grey mt-2 p-2  focus:outline-none' onChange={handleSelectChange}>
              <option value=''>Select Option</option> 
              <option value='1'>Startup</option>
              <option value='2'>Investor</option>
            </select>
          </div>

          <div className='flex flex-col text-white py-2'>
            <label> {optionValue === "1" ? "Company Name" : "Name"}</label>
            <input className='rounded-lg bg-grey mt-2 p-2  focus:outline-none'  type='text'
            onChange={(e) => setRoleName(e.target.value)} 
            value={roleName} />
          </div>

          <div className='flex flex-col text-white py-2'>
            <label> Password</label>
            <input className='rounded-lg bg-grey mt-2 p-2  focus:outline-none'  
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} />
          </div>

          

          <button className='w-full my-5 py-2 bg-yellow shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/40 text-black font-semibold rounded-lg'>SIGNUP</button>
        </form>
      </div>
      
    </div>

  )
}
