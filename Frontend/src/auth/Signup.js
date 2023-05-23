import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpImg from '../assets/pic2.jpg';

import Button from '../shared/components/FormElements/Button';
import Input from '../shared/components/FormElements/input';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE
} from '../shared/util/validators';

export default function Signup() {
	const [optionValue, setOptionValue] = useState('');
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/auth/signup/${role}`,
				'POST',
				JSON.stringify({
					email: formState.inputs.email.value,
					password: formState.inputs.password.value,
					role,
					companyName: formState.inputs.roleName.value
				}),
				{
					'content-type': 'application/json'
				}
			);

			if (responseData.email) {
				navigate('/cfo');
			} else {}
		} else {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/auth/signup/${role}`,
				'POST',
				JSON.stringify({
					email: formState.inputs.email.value,
					password: formState.inputs.password.value,
					role,
					name: formState.inputs.roleName.value
				}),
				{
					'content-type': 'application/json'
				}
			);

			if (responseData.email) {
				navigate('/updates');
			} else {}
		}
	};

	const handleLoginClick = () => {
		navigate('/login');
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <LoadingSpinner asOverlay />}
			<div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
				<div className="hidden sm:block">
					<img
						className="w-full h-screen object-cover "
						src={SignUpImg}
						alt=""
					/>
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
							<label className="font-bold mb-2">
								Are you an investor or a startup?
							</label>
							<select
								className="border p-2 rounded-lg bg-grey mt-2  focus:outline-none"
								onChange={handleSelectChange}
							>
								<option value="">Select Option</option>
								<option value="1">Startup</option>
								<option value="2">Investor</option>
							</select>
						</div>

						<div className="flex flex-col text-white py-2">
							<Input
								element="input"
								id="roleName"
								type="text"
								label={optionValue === '1' ? 'Company Name' : 'Name'}
								validators={[VALIDATOR_REQUIRE()]}
								errorText="Please enter a name."
								onInput={inputHandler}
							/>
						</div>

						<div className="flex flex-col text-white py-2">
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

						<Button type="submit" disabled={!formState.isValid}>
							SIGNUP
						</Button>
					</form>
					<div className="text-white text-center mt-4">
						<span>Already have an account? </span>
						<span
							className="cursor-pointer text-blue-500"
							onClick={handleLoginClick}
						>
							Log in
						</span>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
