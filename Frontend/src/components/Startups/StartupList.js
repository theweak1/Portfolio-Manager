import React from 'react';

import StartupItem from './StartupItem';

const StartupList = (props) => {
	if (props.items.length === 0 || props.items == null) {
		return (
			<div className="center">
				<h2>No startups found</h2>
			</div>
		);
	}

	return (
		<select>
			{props.items.map((startup) => (
				<StartupItem
					key={startup.id}
					id={startup.id}
					companyName={startup.companyName}
				/>
			))}
		</select>
	);
};

export default StartupList;
