import React, { useContext, useState } from 'react';

import loginImg from '../assets/City.jpg';

import Button from '../shared/components/FormElements/Button';
import Input from '../shared/components/FormElements/input';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../shared/context/auth-context';
import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH
} from '../shared/util/validators';

export default function Login() {
	const auth = useContext(AuthContext);

	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [formState, inputHandler] = useForm(
		{
			email: {
				value: '',
				isValid: false
			},
			password: {
				value: '',
				isValid: false
			}
		},
		false
	);
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/auth/login`,
				'POST',
				JSON.stringify({
					email: formState.inputs.email.value,
					password: formState.inputs.password.value
				}),
				{
					'content-type': 'application/json'
				}
			);

			auth.login(
				responseData.role,
				responseData.accessToken,
				responseData.expiresIn
			);
		} catch (err) {}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <LoadingSpinner asOverlay />}
			<div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
				<div className="hidden sm:block">
					<img className="w-full h-full object-cover" src={loginImg} alt="" />
				</div>

				<div className="bg-darkGrey flex flex-col justify-center">
					<form
						className="max-w-[400px] w-full mx-auto rounded-lg bg-darkGrey p-8 px-8"
						onSubmit={handleSubmit}
					>
						<h2 className="text-4xl dark:text-white font-bold text-center">
							SIGN IN
						</h2>

						<div className="flex flex-col text-white py-2">
							{/* <label>Email</label> */}
							{/* <input
							className="rounded-lg bg-grey mt-2 p-2  focus:outline-none"
							type="Email"
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
								onInput={inputHandler}
							/>
						</div>

						<div className="flex flex-col text-white py-2">
							{/* <label>Password</label>
						<input
						className="p-2 rounded-lg bg-grey mt-2  focus:outline-none"
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

						<div className="flex justify-between text-white py-2">
							<p>Forgot Password</p>
						</div>

						{/* <button className="w-full my-5 py-2 bg-yellow shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/40 text-black font-semibold rounded-lg">
						SIGNIN
					</button> */}

						<Button type="submit" disabled={!formState.isValid}>
							LOGIN
						</Button>
					</form>
				</div>
			</div>
		</React.Fragment>
	);
}
