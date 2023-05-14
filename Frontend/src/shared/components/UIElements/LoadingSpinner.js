import React from 'react';

const LoadingSpinner = (props) => {
	return (
		<div
			className={`${
				props.asOverlay
					? 'fixed inset-0 flex items-center justify-center bg-lightGrey bg-opacity-30'
					: ''
			}`}
		>
			<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow"></div>
		</div>
	);
};

export default LoadingSpinner;
