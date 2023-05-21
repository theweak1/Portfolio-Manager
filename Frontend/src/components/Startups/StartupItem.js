import React from 'react';

const StartupItem = (props) => {
	console.log(props.id);
	return <option value={props.id}>{props.companyName}</option>;
};

export default StartupItem;
