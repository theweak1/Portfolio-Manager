import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

export default function Navbar() {
	const auth = useContext(AuthContext);
	return (
		<div className="sticky top-0 bg-[#ffffff]">
			<nav className="flex justify-between items-center p-4 bg-yellow-500 shadow-md h-20">
				<h1 className="text-2xl font-bold">Portfolio Manager</h1>
				<div className="ml-auto space-x-2">
					{!auth.isLoggedIn && (
						<Link
							to="/login"
							className="font-bold px-4 py-2 rounded-md text-black bg-yellow hover:bg-yellow-600"
						>
							Login
						</Link>
					)}
					{!auth.isLoggedIn && (
						<Link
							to="/signup"
							className="font-bold px-4 py-2 rounded-md text-black border border-yellow hover:text-black hover:bg-yellow"
						>
							Signup
						</Link>
					)}
					{auth.isLoggedIn && (
						<button
							onClick={auth.logout}
							className="font-bold px-4 py-2 rounded-md text-black border border-yellow hover:text-black hover:bg-yellow"
						>
							Logout
						</button>
					)}
				</div>
			</nav>
		</div>
	);
}
