import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getModelBySlug, PricingPlan } from '../data/models';
import ModelGallery from '../components/ModelGallery';
import PricingCard from '../components/PricingCard';
import StatCard from '../components/StatCard';
import { Star, ShoppingBag, Clock, Heart, Share2, Download, CheckCircle2, TrendingUp, Award, Shield } from 'lucide-react';

const ModelDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const model = getModelBySlug(slug || '');

  if (!model) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Model Not Found</h2>
          <p className="text-gray-600 mb-8">The model you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/models')}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
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

      navigate('/complete-purchase', { 
        state,
        replace: false
      });
    } catch (error) {
      console.error('Error in handleSelectPlan:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Gallery */}
          <div className="bg-white rounded-2xl shadow-xl p-6 backdrop-blur-sm">
            <ModelGallery images={model.gallery} name={model.name} />
            <div className="flex justify-center gap-4 mt-6">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-xl hover:from-indigo-100 hover:to-purple-100 transition-all duration-200">
                <Heart className="w-5 h-5" />
                <span className="font-medium">Save</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 rounded-xl hover:from-purple-100 hover:to-indigo-100 transition-all duration-200">
                <Share2 className="w-5 h-5" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Model Info */}
            <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{model.name}</h1>
                <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-medium text-indigo-700">{model.stats.rating.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-600">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="font-medium">{model.stats.recentOrders} orders</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Instant Video Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Verified Model</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed">{model.description}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">Orders in Last 24 Hours</h3>
                    <div className="flex items-baseline">
                      <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{model.stats.recentOrders}</p>
                      <span className="ml-2 text-sm text-green-600 font-medium flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +{Math.floor(Math.random() * (15 - 9 + 1)) + 9}% from yesterday
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span>Order Trend</span>
                    <span>Last 24h</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Plans */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Pricing Plans</h2>
              <div className="flex flex-col gap-6">
                {/* Basic Plan */}
                <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Basic Plan</h3>
                      <div className="space-y-3 text-gray-600">
                        <p className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                          30 Minutes Nude Video
                        </p>
                        <p className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                          4K quality
                        </p>
                        <p className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                          Basic collection access
                        </p>
                        <p className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                          Google Drive Links
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">₹449</p>
                      <button 
                        onClick={() => handleSelectPlan(model.pricingPlans[0].id)}
                        className="mt-6 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                      >
                        Select Plan
                      </button>
                    </div>
                  </div>
                </div>

                {/* Premium Plan */}
                <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-yellow-400 relative">
                  <div className="absolute -top-3 right-8 bg-yellow-400 text-gray-800 text-sm font-bold px-4 py-1 rounded-full">
                    Popular Choice
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Premium Plan</h3>
                      <div className="space-y-3 text-gray-600">
                        <p className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                          2 Nude videos (45 mins each)
                        </p>
                        <p className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                          4K quality
                        </p>
                        <p className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                          Premium collection
                        </p>
                        <p className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                          15 Nude photos Bonus
                        </p>
                        <p className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                          Google Drive Links
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">₹590</p>
                      <button 
                        onClick={() => handleSelectPlan(model.pricingPlans[1].id)}
                        className="mt-6 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                      >
                        Select Plan
                      </button>
                    </div>
                  </div>
                </div>

                {/* VIP Plan */}
                <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-2xl font-semibold text-gray-800">VIP Plan</h3>
                        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                          {model.specialTheme || 'VIP Collection'}
                        </span>
                      </div>
                      <div className="space-y-3 text-gray-600">
                        <p className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                          4 Nude videos (45 mins each)
                        </p>
                        <p className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                          {model.specialTheme || 'VIP Collection'} theme
                        </p>
                        <p className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                          Full collection access
                        </p>
                        <p className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                          30 Nude photos Bonus
                        </p>
                        <p className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                          Google Drive Links
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">₹999</p>
                      <button 
                        onClick={() => handleSelectPlan(model.pricingPlans[2].id)}
                        className="mt-6 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
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
