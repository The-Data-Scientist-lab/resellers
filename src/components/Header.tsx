import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          <span>Model</span>
          <span className="text-blue-500">Showcase</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 font-medium">
            Home
          </Link>
          <Link to="/models" className="text-gray-700 font-medium">
            Models
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/models" 
            className="bg-blue-500 text-white font-medium rounded px-5 py-2"
          >
            View Models
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
