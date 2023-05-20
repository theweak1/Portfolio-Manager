import React from 'react';

const Investor = ({ investor }) => {
	return (
		<li>
			<div>
				<span>{investor.name}</span>
				<span>{investor.email}</span>
			</div>
		</li>
	);
};

export default Investor;
