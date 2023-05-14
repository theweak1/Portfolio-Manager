import React from 'react';
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes
} from 'react-router-dom';
import Home from './Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Signup from './components/Signup';
import './index.css';
import CFO from './routes/CFO';
import CapTable from './routes/CapTable';
import Updates from './routes/Updates';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

function App() {
	const { token, login, logout, userRole, expiration } = useAuth();

	let routes;

	if (!token) {
		routes = (
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		);
	} else {
		if (userRole === 'Startup') {
			routes = (
				<Routes>
					<Route path="/captable" element={<CapTable />} />
					<Route path="/cfo" element={<CFO />} />
					<Route path="/updates" element={<Updates />} />
					<Route path="*" element={<Navigate to="/cfo" />} />
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
				<Navbar />
				{token && <Sidebar />}
				<main>{routes}</main>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
