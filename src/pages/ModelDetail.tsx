import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getModelBySlug, PricingPlan } from '../data/models';
import ModelGallery from '../components/ModelGallery';
import PricingCard from '../components/PricingCard';
import StatCard from '../components/StatCard';
import { Star, ShoppingBag, Clock, Heart, Share2, Download } from 'lucide-react';

const ModelDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const model = getModelBySlug(slug || '');

  if (!model) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Model Not Found</h2>
          <p className="text-gray-600 mb-6">The model you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/models')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-4 py-2"
          >
            Back to Models
          </button>
        </div>
      </div>
    );
  }

  const handleSelectPlan = (planId: string) => {
    try {
      console.log('Selected plan ID:', planId);
      const plan = model.pricingPlans.find(p => p.id === planId);
      
      if (!plan) {
        console.error('Plan not found for ID:', planId);
        return;
      }

      const state = {
        plan: {
          id: plan.id,
          name: plan.name,
          price: plan.price,
          currencySymbol: plan.currencySymbol,
          features: plan.features,
          theme: plan.theme,
          duration: plan.duration
        },
        modelName: model.name,
        modelImage: model.image
      };

      // Navigate to complete purchase page
      navigate('/complete-purchase', { 
        state,
        replace: false // This ensures the back button works correctly
      });
    } catch (error) {
      console.error('Error in handleSelectPlan:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Gallery */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <ModelGallery images={model.gallery} name={model.name} />
            <div className="flex justify-center gap-4 mt-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                <Heart className="w-5 h-5" />
                <span>Save</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Model Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{model.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1 font-medium text-gray-700">{model.stats.rating.toFixed(2)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="ml-1">{model.stats.recentOrders} orders</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span className="ml-1">Instant Video Delivery</span>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">About</h2>
                <p className="text-gray-600">{model.description}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">Orders in Last 24 Hours</h3>
                    <div className="flex items-baseline">
                      <p className="text-3xl font-bold text-gray-800">{model.stats.recentOrders}</p>
                      <span className="ml-2 text-sm text-green-600 font-medium">
                        +{Math.floor(Math.random() * (15 - 9 + 1)) + 9}% from yesterday
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                    <span>Order Trend</span>
                    <span>Last 24h</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Plans */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Pricing Plans</h2>
              <div className="flex flex-col gap-4">
                {/* Basic Plan */}
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Basic Plan</h3>
                      <div className="space-y-2 text-gray-600">
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          30 Minutes Nude Video
                        </p>
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          4K quality
                        </p>
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Basic collection access
                        </p>
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Google Drive Links
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-600">₹449</p>
                      <button 
                        onClick={() => handleSelectPlan(model.pricingPlans[0].id)}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                      >
                        Select Plan
                      </button>
                    </div>
                  </div>
                </div>

                {/* Premium Plan */}
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-yellow-400">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">Premium Plan</h3>
                        <span className="bg-yellow-400 text-gray-800 text-xs font-bold px-2 py-1 rounded">Popular</span>
                      </div>
                      <div className="space-y-2 text-gray-600">
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          2 Nude videos (45 mins each)
                        </p>
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          4K quality
                        </p>
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Premium collection
                        </p>
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          15 Nude photos Bonus
                        </p>
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Google Drive Links
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-600">₹590</p>
                      <button 
                        onClick={() => handleSelectPlan(model.pricingPlans[1].id)}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                      >
                        Select Plan
                      </button>
                    </div>
                  </div>
                </div>

                {/* VIP Plan */}
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">VIP Plan</h3>
                        <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded">
                          {model.specialTheme || 'VIP Collection'}
                        </span>
                      </div>
                      <div className="space-y-2 text-gray-600">
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          4 Nude videos (45 mins each)
                        </p>
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          {model.specialTheme || 'VIP Collection'} theme
                        </p>
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          VIP collection
                        </p>
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          25 Nude Photos Bonus
                        </p>
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Google Drive Links
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-600">₹780</p>
                      <button 
                        onClick={() => handleSelectPlan(model.pricingPlans[2].id)}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                      >
                        Select Plan
                      </button>
                    </div>
                  </div>
                </div>

                {/* Full Package */}
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">Full Package</h3>
                        <span className="bg-pink-100 text-pink-800 text-xs font-bold px-2 py-1 rounded">All Themes</span>
                      </div>
                      <div className="space-y-2 text-gray-600">
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          10+ Nude videos (30-45 Minutes Each)
                        </p>
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Complete collection
                        </p>
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          150+ bonus photos
                        </p>
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Google Drive Links
                        </p>
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          All premium content
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-600">₹1399</p>
                      <button 
                        onClick={() => handleSelectPlan(model.pricingPlans[3].id)}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                      >
                        Select Plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetail;
