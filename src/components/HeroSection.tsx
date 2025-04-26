import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, Users, Calendar, Package, ThumbsUp, DollarSign, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative bg-model-dark">
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7')] bg-cover bg-center"></div>
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center gap-3">
            <BadgeCheck className="w-5 h-5 text-model-primary" />
            <div>
              <span className="text-white font-medium block">Verified Reseller</span>
              <span className="text-gray-400 text-sm">Official & Trusted Content Provider</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-model-primary" />
            <div>
              <span className="text-white font-medium block">Established in 2021</span>
              <span className="text-gray-400 text-sm">3+ Years of Reliable Service</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-model-primary" />
            <div>
              <span className="text-white font-medium block">10,000+ Happy Customers</span>
              <span className="text-gray-400 text-sm">Consistently High Satisfaction</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-model-primary" />
            <div>
              <span className="text-white font-medium block">Massive Savings</span>
              <span className="text-gray-400 text-sm">Save Over 90% vs Original Prices</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-model-primary" />
            <div>
              <span className="text-white font-medium block">Instant Access</span>
              <span className="text-gray-400 text-sm">Immediate Delivery via Google Drive</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThumbsUp className="w-5 h-5 text-model-primary" />
            <div>
              <span className="text-white font-medium block">Trusted by Thousands</span>
              <span className="text-gray-400 text-sm">Satisfied Customers Since 2021</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Premium <span className="text-model-primary">Model</span> Showcase Platform
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Get premium model content at affordable prices! We're official resellers offering the same high-quality Nude videos at a fraction of the original cost
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/models" 
              className="bg-model-primary hover:bg-opacity-90 text-white font-semibold rounded-lg px-8 py-3 shadow-lg transition-colors"
            >
              Browse Models
            </Link>
            <Link 
              to="/featured" 
              className="bg-transparent border-2 border-white hover:border-model-primary text-white hover:text-model-primary font-semibold rounded-lg px-8 py-3 transition-colors"
            >
              View Featured
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
