import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Users, Calendar, Package, ThumbsUp, DollarSign, Zap, Shield } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-purple-900">
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-green-400" />
            <span className="text-green-400 font-semibold">Trusted Reseller Since 2021</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Premium Model Content at Unbeatable Prices
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Get instant access to high-quality nude videos at a fraction of the original cost. 
            Official reseller with thousands of satisfied customers.
          </p>
          <div className="flex justify-center">
            <Link 
              to="/models" 
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-8 py-3 transition-colors"
            >
              View Models
            </Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-3">
              <BadgeCheck className="w-6 h-6 text-green-400" />
              <div>
                <span className="text-white font-medium block">Verified Reseller</span>
                <span className="text-gray-300 text-sm">Official & Trusted Content Provider</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-400" />
              <div>
                <span className="text-white font-medium block">Established in 2021</span>
                <span className="text-gray-300 text-sm">3+ Years of Reliable Service</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-400" />
              <div>
                <span className="text-white font-medium block">10,000+ Happy Customers</span>
                <span className="text-gray-300 text-sm">Consistently High Satisfaction</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-yellow-400" />
              <div>
                <span className="text-white font-medium block">Massive Savings</span>
                <span className="text-gray-300 text-sm">Save Over 90% vs Original Prices</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-red-400" />
              <div>
                <span className="text-white font-medium block">Instant Access</span>
                <span className="text-gray-300 text-sm">Immediate Delivery via Google Drive</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-3">
              <ThumbsUp className="w-6 h-6 text-pink-400" />
              <div>
                <span className="text-white font-medium block">Trusted by Thousands</span>
                <span className="text-gray-300 text-sm">Satisfied Customers Since 2021</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
