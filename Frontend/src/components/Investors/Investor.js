import React from 'react';

const Investor = ({ investor }) => {
	return (
		<React.Fragment> 
		<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 ">
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-bold text-gray-800'>Investor Information</h2>
            </div>
            <ul className='text-lg '>
                <li className="flex  py-2">
                    <span className="font-medium text-gray-700 mr-2">Name:  </span>
                    <span className="font-light text-gray-600">{investor.name}</span>
                </li>
                <li className="flex  py-2">
                    <span className="font-medium text-gray-700 mr-2">Email:  </span>
                    <span className="font-light text-gray-600">{investor.email}</span>
                </li>
            </ul>
        </div>
		</React.Fragment>
	);
};

export default Investor;
