import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InvestorList from '../components/Investors/InvestorList';
import Button from '../shared/components/FormElements/Button';
import Input from '../shared/components/FormElements/input';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../shared/context/auth-context';
import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../shared/util/validators';

const dummyUsers = [
	{
		id: 1,
		name: 'John Doe',
		email: 'john@example.com'
	},
	{
		id: 2,
		name: 'Jane Smith',
		email: 'jane@example.com'
	},
	{
		id: 3,
		name: 'Alice Johnson',
		email: 'alice@example.com'
	}
];

const Investors = () => {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();

	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [investors, setInvestors] = useState([]);
	const [formState, inputHandler] = useForm(
		{
			name: {
				value: '',
				isValid: false
			},
			email: {
				value: '',
				isValid: false
			}
		},
		false
	);

	const handleAddData = (event) => {
		event.preventDefault();
		const investor = {
			name: formState.inputs.name.value,
			email: formState.inputs.email.value,
			id: dummyUsers.length + 1
		};

		setInvestors((prevData) => [...prevData, investor]);
		dummyUsers.push(investor);

		// Clear the form inputs
		// inputHandler('name', '', false);
		// inputHandler('email', '', false);
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/startup/investors`,
				'POST',
				JSON.stringify({
					investors: investors
				}),
				{
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token
				}
			);
			navigate('/investors');
		} catch (error) {}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <LoadingSpinner asOverlay />}
			<div>
				<InvestorList investors={dummyUsers} />
				<form onSubmit={handleFormSubmit}>
					<Input
						element="input"
						id="name"
						type="text"
						label={'Name'}
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please enter a name."
						onInput={inputHandler}
					/>
					<Input
						element="input"
						id="email"
						type="email"
						label="E-Mail"
						validators={[VALIDATOR_EMAIL()]}
						errorText="Please enter a valid email address."
						onInput={inputHandler}
					/>
					<Button
						type="button"
						onClick={handleAddData}
						disabled={!formState.isValid}
					>
						Add User
					</Button>
				</form>
				<Button
					type="button"
					onClick={handleFormSubmit}
					disabled={!formState.isValid}
				>
					Save Investors
				</Button>
			</div>
		</React.Fragment>
	);
};

export default Investors;
