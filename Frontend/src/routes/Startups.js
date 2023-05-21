import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/SidebarInversionista/Sidebar';
import StartupList from '../components/Startups/StartupList';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../shared/context/auth-context';
import { useHttpClient } from '../shared/hooks/http-hook';

const Startups = () => {
	const auth = useContext(AuthContext);

	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [loadedStartups, setLoadedStartups] = useState();

	useEffect(() => {
		const fetchStartups = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/startup`,
					'GET',
					null,
					{
						Authorization: 'Bearer ' + auth.token
					}
				);
				setLoadedStartups(responseData.startups);
			} catch (err) {}
		};
		fetchStartups();
	}, [auth.token, sendRequest]);

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner asOverlay />
				</div>
			)}
			<div className="flex">
				<Sidebar />
				<div className="flex-1 p-6 ml-16">
					{!isLoading && loadedStartups && (
						<StartupList items={loadedStartups} />
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default Startups;
