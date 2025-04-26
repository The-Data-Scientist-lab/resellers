import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border text-gray-700 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Model<span className="text-model-primary">Showcase</span></h3>
            <p className="text-gray-600 mb-4">
              Get premium model content at affordable prices! We're official resellers offering the same high-quality Nude videos at a fraction of the original cost
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-model-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/models" className="text-gray-600 hover:text-model-primary transition-colors">
                  Models
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <p className="text-gray-600">
              For inquiries and support, please contact us:
            </p>
            <p className="text-model-primary mt-2">support@modelshowcase.com</p>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ModelShowcase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
