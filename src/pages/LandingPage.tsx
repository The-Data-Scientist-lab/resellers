import React from 'react';
import { Video, DollarSign, Zap, Award, Shield, Clock3, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-green-600" />
            <span className="text-green-600 font-semibold">Trusted Reseller Since 2021</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Premium Model Showcase Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We're making premium model content accessible to everyone at affordable prices. While original content costs ₹16,000+ per video, we offer the same high-quality content at a fraction of the price.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/models">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Browse Videos
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>

        {/* Trust Badges Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Why Choose Us?</h2>
            <p className="text-gray-600">Trusted by thousands of satisfied customers since 2021</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Clock3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">3+ Years Experience</h3>
              <p className="text-gray-600 text-sm">Established in 2021, providing reliable service</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">10,000+ Happy Customers</h3>
              <p className="text-gray-600 text-sm">Consistently high customer satisfaction</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Verified Reseller</h3>
              <p className="text-gray-600 text-sm">Official and trusted content provider</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-600" />
              <span>100% Secure Payments</span>
              <span className="mx-2">•</span>
              <span>24/7 Support</span>
              <span className="mx-2">•</span>
              <span>Money Back Guarantee</span>
            </div>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Premium Videos</h3>
            <p className="text-gray-600">High-quality model profile videos from professional shoots.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Massive Savings</h3>
            <p className="text-gray-600">Save over 90% compared to original prices of ₹16,000+.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Access</h3>
            <p className="text-gray-600">Get immediate access to all videos after purchase.</p>
          </div>
        </div>

        {/* Pricing Comparison */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-8">Incredible Value</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Original Price</h3>
              <div className="text-4xl font-bold text-gray-400 line-through mb-4">₹16,000+</div>
              <p className="text-gray-600 mb-4">Per video from official sources</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border-2 border-blue-500">
              <h3 className="text-2xl font-bold mb-4">Our Price</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">₹999</div>
              <p className="text-gray-600 mb-4">Same high-quality content</p>
            </div>
          </div>
        </div>

        {/* Featured Videos */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Featured Videos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Model Profile #{item}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500 line-through">₹16,000</span>
                    <span className="text-lg font-bold text-blue-600">₹999</span>
                  </div>
                  <Button size="sm" className="w-full">View Video</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 