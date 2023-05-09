import { useCallback, useEffect, useRef, useState } from 'react';

export const useHttpClient = () => {
	const [error, setError] = useState();

	const activeHttpRequests = useRef([]);

	const sendRequest = useCallback(
		async (url, method = 'GET', body = null, headers = {}) => {
			const httpAbortCtrl = new AbortController();
			activeHttpRequests.current.push(httpAbortCtrl);

			try {
				const response = await fetch(url, {
					method,
					body,
					headers,
					signal: httpAbortCtrl.signal,
				});

				const responseData = await response.json();

				activeHttpRequests.current = activeHttpRequests.current.filter(
					(reqCtrl) => reqCtrl !== httpAbortCtrl
				);

				if (!response.ok) {
					console.log(responseData);
					throw new Error(responseData.error.errorMessage);
				}
				return responseData;
			} catch (err) {
				setError(err.errorMessage);
				throw err;
			}
		},
		[]
	);

	const clearError = () => {
		setError(null);
	};

	useEffect(() => {
		return () => {
			activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
		};
	}, []);

	return { error, sendRequest, clearError };
};
