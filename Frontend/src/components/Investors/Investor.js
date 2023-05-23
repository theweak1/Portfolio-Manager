import React from 'react';

const Investor = ({ investor }) => {
	return (
		<React.Fragment> 
		<div className='space-x-2'>
			<span>Investor Name</span>
				<span>Investor email</span>
		</div>
		<li>
			<div className='space-x-2'>
				<span>{investor.name}</span>
				<span>{investor.email}</span>
			</div>
		</li>
		</React.Fragment>
	);
};

export default Investor;
