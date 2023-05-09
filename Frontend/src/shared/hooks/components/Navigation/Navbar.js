import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="App">
      <nav className="flex justify-between items-center p-4 bg-yellow-500 shadow-md">
      <h1 className="text-2xl font-bold">Portfolio Manager</h1>
        <div className="ml-auto">
          <Link to="/login" className="font-bold px-4 py-2 rounded-md text-black bg-yellow hover:bg-yellow-600">Login </Link>
          <Link to="/signup" className="font-bold px-4 py-2 rounded-md text-black border border-yellow hover:text-black hover:bg-yellow">Signup</Link>
        </div>
      </nav>
    </div>
  );
}
