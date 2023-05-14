import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpImg from '../assets/pic2.jpg';

import Input from '../shared/components/FormElements/input';
import { useForm } from '../shared/hooks/form-hook';
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE
} from '../shared/util/validators';

export default function Signup() {
	const [optionValue, setOptionValue] = useState('');

	const [role, setRole] = useState('');
	const navigate = useNavigate();
	const handleSelectChange = (event) => {
		const value = event.target.value;
		if (value === '') {
			setOptionValue('');
		} else {
			setOptionValue(value);
			setRole(value === '1' ? 'startup' : 'investor');
		}
	};

	const [formState, inputHandler] = useForm(
		{
			email: {
				value: '',
				isValid: false
			},

			name: {
				value: '',
				isValid: false
			},
			password: {
				value: '',
				isValid: false
			},
			roleName: {
				value: '',
				isValid: false
			}
		},
		false
	);
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (role === 'startup') {
			let result = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/auth/signup/${role}`,
				{
					method: 'POST',
					body: JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
						role,
						companyName: formState.inputs.roleName.value
					}),
					headers: {
						'content-type': 'application/json'
					}
				}
			);
			result = await result.json();
			if (result.email) {
				console.log(result);

				navigate('/cfo');
			} else {
				console.log(result);
			}
		} else {
			let result = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/auth/signup/${role}`,
				{
					method: 'POST',
					body: JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value,
						role,
						name: formState.inputs.roleName.value
					}),
					headers: {
						'content-type': 'application/json'
					}
				}
			);
			result = await result.json();
			if (result.email) {
				console.log(result);

				navigate('/updates');
			} else {
				console.log(result);
			}
		}
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
			<div className="hidden sm:block">
				<img className="w-full h-full object-cover " src={SignUpImg} alt="" />
			</div>

			<div className="bg-darkGrey flex flex-col justify-center ">
				<form
					className="max-w-[400px] w-full mx-auto rounded-lg bg-darkGrey p-8 px-8"
					onSubmit={handleSubmit}
				>
					<h1 className="text-4xl dark:text-white font-bold text-center">
						SIGNUP
					</h1>

					<div className="flex flex-col text-white py-2">
						{/* <label>Email</label>
						<input
							className="rounded-lg bg-grey mt-2 p-2  focus:outline-none"
							type="email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/> */}
						<Input
							element="input"
							id="email"
							type="email"
							label="E-Mail"
							validators={[VALIDATOR_EMAIL()]}
							errorText="Please enter a valid email address."
							onInput={handleSubmit}
						/>
					</div>

					<div className="flex flex-col text-white py-2">
						<label className="font-bold mb-2">
							Are you an investor or a startup?
						</label>
						<select
							className="rounded-lg bg-grey mt-2 p-2  focus:outline-none"
							onChange={handleSelectChange}
						>
							<option value="">Select Option</option>
							<option value="1">Startup</option>
							<option value="2">Investor</option>
						</select>
					</div>

					<div className="flex flex-col text-white py-2">
						{/* <label> {optionValue === '1' ? 'Company Name' : 'Name'}</label> */}
						{/* <input
							className="rounded-lg bg-grey mt-2 p-2  focus:outline-none"
							type="text"
							onChange={(e) => setRoleName(e.target.value)}
							value={roleName}
						/> */}
						<Input
							element="input"
							id="name"
							type="text"
							label={optionValue === '1' ? 'Company Name' : 'Name'}
							validators={[VALIDATOR_REQUIRE()]}
							errorText="Please enter a name."
							onInput={inputHandler}
						/>
					</div>

					<div className="flex flex-col text-white py-2">
						{/* <label> Password</label>
						<input
							className="rounded-lg bg-grey mt-2 p-2  focus:outline-none"
							type="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/> */}
						<Input
							element="input"
							id="password"
							type="password"
							label="Password"
							validators={[VALIDATOR_MINLENGTH(6)]}
							errorText="Please enter a valid password, at least 6 characters."
							onInput={inputHandler}
						/>
					</div>

					<button className="w-full my-5 py-2 bg-yellow shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/40 text-black font-semibold rounded-lg">
						SIGNUP
					</button>
				</form>
			</div>
		</div>
	);
}
