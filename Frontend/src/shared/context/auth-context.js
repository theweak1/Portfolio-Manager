import { createContext } from 'react';

export const AuthContext = createContext({
	isLoggedIn: false,
	userRole: null,
	token: null,
	expiration: null,
	userId: null,
	login: () => {},
	logout: () => {}
});
