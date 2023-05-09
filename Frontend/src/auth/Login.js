import React from 'react'
import loginImg from '../assets/City.jpg'
import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import { useHttpClient } from '../shared/hooks/http-hook';

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

	const { error, sendRequest } = useHttpClient();

    const handleLogin = async (e) => {
        console.log(`email: ${email}, password: ${password}`);
        e.preventDefault()
        // let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`,{
        // method:'post',
        // body: JSON.stringify({email:email,password:password}),
        // headers:{
        //     'Content-Type': 'application/json'
        // }
        // });
        
        // result = await result.json();
        // console.warn(result)
        // if(result.email)
        // {
        //     localStorage.setItem("user", JSON.stringify(result));
        //     navigate("/")
        // }
        // else{
        //     alert("Please connection details")
        // }

		const responseData = await sendRequest(
			`${process.env.REACT_APP_BACKEND_URL}/auth/login`,
			'POST',
			JSON.stringify({ email, password }),
			{
				'content-type': 'application/json',
			}
		);

		if (responseData.email) {
			console.log(responseData);
            localStorage.setItem("user", JSON.stringify(responseData))
			navigate('/');
		} else {
			console.log(error);
		}
    }
    
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='hidden sm:block'>
            <img className='w-full h-full object-cover' src={loginImg} alt="" />
        </div>

        <div className='bg-darkGrey flex flex-col justify-center'>
            <form className='max-w-[400px] w-full mx-auto rounded-lg bg-darkGrey p-8 px-8' onSubmit={handleLogin}>
                <h2 className='text-4xl dark:text-white font-bold text-center'>Login</h2>
                
                <div className='flex flex-col text-white py-2'>
                    <label>Email</label>
                    <input className='rounded-lg bg-grey mt-2 p-2  focus:outline-none' 
                    type="email" 
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
                <button className='w-full my-5 py-2 bg-yellow shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/40 text-black font-semibold rounded-lg'>Login</button>
                <div className='flex justify-center py-2 text-lg  text-yellow '>
                    <Link to='/forgot-password' >Forgot Password?  </Link>
                </div>
            </form>
        </div>
        
    </div>

    
  )
}
