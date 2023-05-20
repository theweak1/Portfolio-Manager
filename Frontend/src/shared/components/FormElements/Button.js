import React from 'react';
import { Link } from 'react-router-dom';

const Button = (props) => {
	if (props.href) {
		return (
			<a
				className={`w-full my-5 py-2 bg-yellow shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/40 text-black font-semibold rounded-lg ${
					props.inverse ? 'text-white' : 'text-black'
				}`}
				href={props.href}
			>
				{props.children}
			</a>
		);
	}
	if (props.to) {
		return (
			<Link
				to={props.to}
				exact={props.exact}
				className={`w-full my-5 py-2 bg-yellow shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/40 text-black font-semibold rounded-lg ${
					props.inverse ? 'text-white' : 'text-black'
				}`}
			>
				{props.children}
			</Link>
		);
	}
	return (
		<button
			className={`cursor-pointer w-full my-5 py-2 bg-yellow shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/40 text-black font-semibold rounded-lg ${
				props.inverse ? 'text-white' : 'text-black'
			}`}
			type={props.type}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};

export default Button;
