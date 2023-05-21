import React from 'react';

import portfolioImg from './assets/portfoliManagerPic.png';

function Home() {
    return (
        <div className="flex flex-col bg-darkGrey min-h-screen">
            <div className="flex flex-col items-center justify-center text-white max-w-4xl mx-auto px-4 py-8 md:px-0 space-y-8 font-bold">
                <img src={portfolioImg} alt="Stock" className="w-full h-64 object-cover rounded-lg shadow-md mb-8"/>
                <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Portfolio Manager Web Application</h1>
                <p className="text-lg leading-relaxed text-center mb-4">
                    Our Portfolio Manager is meticulously designed to facilitate seamless sharing of crucial financial information between investors and startups.
                </p>
                <p className="text-lg leading-relaxed text-center mb-4">
                    This platform allows startups to create updates, manage a Captable, and enables analysis of financial data from the startup's accounting records.
                </p>
                <p className="text-lg leading-relaxed text-center">
                    Get started today! Create an account or log in to your existing one by using the buttons at the top.
                </p>
            </div>
        </div>
    );
}

export default Home;
