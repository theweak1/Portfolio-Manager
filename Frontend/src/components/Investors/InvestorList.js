import React from 'react';
import Investor from './Investor';

const InvestorList = ({ investors, onDelete }) => {
	return (
		<ul>
			{investors.map((user) => (
				<Investor key={user.id} investor={user} />
			))}
		</ul>
	);
};

export default InvestorList;
