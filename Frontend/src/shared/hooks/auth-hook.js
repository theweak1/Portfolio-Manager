import { useCallback, useEffect, useState } from 'react';

let logoutTimer;

export const useAuth = () => {
	const [token, setToken] = useState(false);
	const [userRole, setUserRole] = useState(false);
	const [expiration, setExpiration] = useState(null);
	const [userId, setUserId] = useState(false);
	const [tokenExpirationDate, setTokenExpirationDate] = useState();

	const login = useCallback(
		(role, token, expirationDate, uid) => {
			setToken(token);
			setUserRole(role);
			setExpiration(expiration);
			setUserId(uid);
			const tokenExpirationDate =
				new Date(expirationDate) || new Date(new Date(expiration).getTime());
			setTokenExpirationDate(tokenExpirationDate);
			localStorage.setItem(
				'userData',
				JSON.stringify({
					userRole: role,
					token: token,
					expiration: tokenExpirationDate.toISOString(),
					userId: uid
				})
			);
		},
		[expiration]
	);

	const logout = useCallback(() => {
		setToken(null);
		setUserRole(null);
		setTokenExpirationDate(null);
		setExpiration(null);
		setUserId(null);
		localStorage.removeItem('userData');
	}, []);

	useEffect(() => {
		if (token && tokenExpirationDate) {
			const remainingTime =
				tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpirationDate]);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData'));
		if (
			storedData &&
			storedData.token &&
			new Date(storedData.expiration) > new Date()
		) {
			login(
				storedData.userRole,
				storedData.token,
				new Date(storedData.expiration),
				storedData.userId
			);
		}
	}, [login]);
	return { token, login, logout, userRole, expiration ,userId};
};
