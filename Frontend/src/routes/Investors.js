import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InvestorList from '../components/Investors/InvestorList';
import SidebarStartup from '../components/SidebarStartup/SidebarStartup';
import Button from '../shared/components/FormElements/Button';
import Input from '../shared/components/FormElements/input';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../shared/context/auth-context';
import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../shared/util/validators';

const Investors = () => {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();

	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedInvestors, setLoadedInvestors] = useState([]);
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

	useEffect(() => {
		const fetchInvestors = async () => {
			if (!auth.token) {
			} else {
				try {
					const responseData = await sendRequest(
						`${process.env.REACT_APP_BACKEND_URL}/startup/investors`,
						'GET',
						null,
						{
							Authorization: 'Bearer ' + auth.token
						}
					);

					setLoadedInvestors(responseData.investors);
				} catch (err) {}
			}
		};
		fetchInvestors();
	}, [sendRequest, auth.token]);

	const handleAddData = (event) => {
		event.preventDefault();
		const investor = {
			name: formState.inputs.name.value,
			email: formState.inputs.email.value,
			id: loadedInvestors.length + 1
		};

		setLoadedInvestors((prevData) => [...prevData, investor]);
	};

	const handleDeleteInvestor = async (InvestorId) => {
		setLoadedInvestors((prevState) =>
			prevState.filter((investor) => investor.id !== InvestorId)
		);
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/startup/investors`,
				'POST',
				JSON.stringify({
					investors: loadedInvestors
				}),
				{
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token
				}
			);
			navigate('/investors-list');
		} catch (error) {}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <LoadingSpinner asOverlay />}
			<div className="flex">
				<SidebarStartup />
				<div className="flex-1 p-6 ml-16">
					{!isLoading && loadedInvestors && (
						<InvestorList investors={loadedInvestors} />
					)}
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
						Save Changes
					</Button>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Investors;
