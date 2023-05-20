import React from 'react';
import {
	Route,
	BrowserRouter as Router,
	Routes,
	useLocation
} from 'react-router-dom';
import Home from './Home';
import Login from './auth/Login';
import Signup from './auth/Signup';
import './index.css';
import CFO from './routes/CFO';
import CapTable from './routes/CapTable';
import Updates from './routes/Updates';
import Navbar from './shared/components/Navigation/Navbar';

import UpdatePasswordPage from './auth/ResetPassword';
import ResetPasswordPage from './auth/forgot-password';
import CFOStartup from './routes/CFOStartup';
import CaptableStartup from './routes/CaptableStartup';
import CreateUpdates from './routes/CreateUpdates';

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

function NavbarWithConditionalRendering() {
	const location = useLocation();
	const isHomePage = location.pathname === '/';

	return isHomePage ? <Navbar /> : null;
}

function App() {
	const { token, login, logout, userRole, expiration } = useAuth();

	let routes;

	if (!token) {
		routes = (
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/forgot-password" element={<ResetPasswordPage />} />
				<Route path="/reset-password" element={<UpdatePasswordPage />} />
			</Routes>
		);
	} else {
		if (userRole === 'Startup') {
			routes = (
				<Routes>
					<Route path="/cfo-Startup" element={<CFOStartup />} />
					<Route path="/captable-startup" element={<CaptableStartup />} />
					<Route path="/create-updates" element={<CreateUpdates />} />
				</Routes>
			);
		} else {
			routes = (
				<Routes>
					<Route path="/cfo" element={<CFO />} />
					<Route path="/captable" element={<CapTable />} />
					<Route path="/updates" element={<Updates />} />
				</Routes>
			);
		}
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userRole: userRole,
				expiration: expiration,
				login: login,
				logout: logout
			}}
		>
			<Router>
				<div className="m-0 p-0 box-border font-serif">
					<NavbarWithConditionalRendering />
					<main>{routes}</main>
				</div>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
