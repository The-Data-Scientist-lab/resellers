import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getModelBySlug, PricingPlan } from '../data/models';
import ModelGallery from '../components/ModelGallery';
import PricingCard from '../components/PricingCard';
import StatCard from '../components/StatCard';
import { Star, ShoppingBag, Clock, Heart, Share2, Download, CheckCircle2, TrendingUp, Award, Shield, Users, Eye, BarChart2, ThumbsUp, MessageSquare, Calendar, UserCheck, Crown, Diamond } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const ModelDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const model = getModelBySlug(slug || '');

  // Get model-specific statistics
  const getModelStats = () => {
    switch (model?.name) {
      case "Miss Pinky (Sana)":
        return {
          popularityRank: "#2",
          totalViews: "1.32M",
          viewsIncrease: "0.15M",
          memberSince: "2023",
          memberDuration: "1 year",
          totalOrders: "25.7K",
          ordersIncrease: "2.1K",
          activeUsers: "9.23K",
          usersIncrease: "1.1K"
        };
      case "Sassy Poonam":
        return {
          popularityRank: "#3",
          totalViews: "63.2M",
          viewsIncrease: "5.2M",
          memberSince: "2022",
          memberDuration: "2 years",
          totalOrders: "98.4K",
          ordersIncrease: "8.2K",
          activeUsers: "46.9K",
          usersIncrease: "4.1K"
        };
      case "Lucky Rajor":
        return {
          popularityRank: "#4",
          totalViews: "1.13M",
          viewsIncrease: "0.12M",
          memberSince: "2024",
          memberDuration: "New",
          totalOrders: "33.23K",
          ordersIncrease: "2.5K",
          activeUsers: "12.4K",
          usersIncrease: "1.2K"
        };
      case "Shanaya Katiyan":
        return {
          popularityRank: "#1",
          totalViews: "2.45M",
          viewsIncrease: "0.25M",
          memberSince: "2024",
          memberDuration: "New",
          totalOrders: "56.23K",
          ordersIncrease: "3.2K",
          activeUsers: "23K",
          usersIncrease: "2.1K"
        };
      case "Model 3":
        return {
          popularityRank: "#5",
          totalViews: "0.78M",
          viewsIncrease: "0.08M",
          memberSince: "2022",
          memberDuration: "2 years",
          totalOrders: "18.9K",
          ordersIncrease: "1.5K",
          activeUsers: "7.2K",
          usersIncrease: "0.9K"
        };
      case "Model 4":
        return {
          popularityRank: "#8",
          totalViews: "0.54M",
          viewsIncrease: "0.06M",
          memberSince: "2021",
          memberDuration: "3 years",
          totalOrders: "15.3K",
          ordersIncrease: "1.2K",
          activeUsers: "5.8K",
          usersIncrease: "0.7K"
        };
      default:
        return {
          popularityRank: "#10",
          totalViews: "0.32M",
          viewsIncrease: "0.04M",
          memberSince: "2023",
          memberDuration: "1 year",
          totalOrders: "9.8K",
          ordersIncrease: "0.8K",
          activeUsers: "4.2K",
          usersIncrease: "0.5K"
        };
    }
  };

  const modelStats = getModelStats();

  // Sample data for the charts (you can replace this with real data)
  const orderData = [
    { month: 'Jan', orders: 45 },
    { month: 'Feb', orders: 52 },
    { month: 'Mar', orders: 48 },
    { month: 'Apr', orders: 60 },
    { month: 'May', orders: 55 },
    { month: 'Jun', orders: 65 },
  ];

  const ratingData = [
    { name: '5 Stars', value: 80 },
    { name: '4 Stars', value: 15 },
    { name: '3 Stars', value: 3 },
    { name: '2 Stars', value: 1 },
    { name: '1 Star', value: 1 },
  ];

  const COLORS = ['#4F46E5', '#7C3AED', '#A855F7', '#C084FC', '#D8B4FE'];

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Gallery and Stats */}
          <div>
            <ModelGallery images={model.gallery} name={model.name} />
            
            {/* Enhanced Stats Section */}
            <div className="mt-8 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Model Performance</h2>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Popularity Rank */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                      </div>
                      <p className="text-sm sm:text-base font-medium text-gray-600">Popularity Rank</p>
                    </div>
                    <div className="flex items-baseline justify-between mt-auto">
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">{modelStats.popularityRank}</p>
                    </div>
                  </div>
                </div>

                {/* Success Rate */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                      </div>
                      <p className="text-sm sm:text-base font-medium text-gray-600">Success Rate</p>
                    </div>
                    <div className="flex items-baseline justify-between mt-auto">
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">{model.stats.successRate}%</p>
                    </div>
                  </div>
                </div>

                {/* Total Views */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                      </div>
                      <p className="text-sm sm:text-base font-medium text-gray-600">Total Views</p>
                    </div>
                    <div className="flex items-baseline justify-between mt-auto">
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">{modelStats.totalViews}</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <p className="text-sm text-green-600">{modelStats.viewsIncrease}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Member Since */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                      </div>
                      <p className="text-sm sm:text-base font-medium text-gray-600">Member Since</p>
                    </div>
                    <div className="flex items-baseline justify-between mt-auto">
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">{modelStats.memberSince}</p>
                      <p className="text-sm text-gray-500">{modelStats.memberDuration}</p>
                    </div>
                  </div>
                </div>

                {/* Total Orders */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />
                      </div>
                      <p className="text-sm sm:text-base font-medium text-gray-600">Total Orders</p>
                    </div>
                    <div className="flex items-baseline justify-between mt-auto">
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">{modelStats.totalOrders}</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <p className="text-sm text-green-600">{modelStats.ordersIncrease}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Active Users */}
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-full flex items-center justify-center">
                        <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500" />
                      </div>
                      <p className="text-sm sm:text-base font-medium text-gray-600">Active Users</p>
                    </div>
                    <div className="flex items-baseline justify-between mt-auto">
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">{modelStats.activeUsers}</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <p className="text-sm text-green-600">{modelStats.usersIncrease}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing Plans */}
          <div>
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

            {/* Pricing Plans */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Pricing Plans</h2>
              <div className="flex flex-col gap-8">
                {/* Basic Plan */}
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Star className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Basic Plan</h3>
                      </div>
                      <div className="space-y-3 text-gray-600">
                        <p className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <span className="text-sm sm:text-base">30 Minutes Nude Video</span>
                        </p>
                        <p className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <span className="text-sm sm:text-base">4K quality</span>
                        </p>
                        <p className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <span className="text-sm sm:text-base">Basic collection access</span>
                        </p>
                        <p className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <span className="text-sm sm:text-base">Google Drive Links</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-center sm:text-right">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                        <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">₹449</p>
                        <p className="text-xs sm:text-sm text-gray-500">One-time payment</p>
                      </div>
                      <button 
                        onClick={() => handleSelectPlan(model.pricingPlans[0].id)}
                        className="mt-4 sm:mt-6 w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                      >
                        Select Plan
                      </button>
                    </div>
                  </div>
                </div>

                {/* Premium Plan */}
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-yellow-400 relative">
                  <div className="absolute -top-3 right-4 sm:right-8 bg-yellow-400 text-gray-800 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 rounded-full">
                    Popular Choice
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Premium Plan</h3>
                      </div>
                      <div className="space-y-3 text-gray-600">
                        <p className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <span className="text-sm sm:text-base">2 Nude videos (45 mins each)</span>
                        </p>
                        <p className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <span className="text-sm sm:text-base">4K quality</span>
                        </p>
                        <p className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <span className="text-sm sm:text-base">Premium collection</span>
                        </p>
                        <p className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <span className="text-sm sm:text-base">15 Nude photos Bonus</span>
                        </p>
                        <p className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <span className="text-sm sm:text-base">Google Drive Links</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-center sm:text-right">
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4">
                        <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">₹590</p>
                        <p className="text-xs sm:text-sm text-gray-500">One-time payment</p>
                      </div>
                      <button 
                        onClick={() => handleSelectPlan(model.pricingPlans[1].id)}
                        className="mt-4 sm:mt-6 w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-full text-white bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200 transform hover:scale-105"
                      >
                        Select Plan
                      </button>
                    </div>
                  </div>
                </div>

                {/* VIP Plan */}
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">VIP Plan</h3>
                          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full">
                            {model.specialTheme || 'VIP Collection'}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3 text-gray-600">
                        <p className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <span className="text-sm sm:text-base">4 Nude videos (45 mins each)</span>
                        </p>
                        <p className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <span className="text-sm sm:text-base">{model.specialTheme || 'VIP Collection'} theme</span>
                        </p>
                        <p className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <span className="text-sm sm:text-base">Full collection access</span>
                        </p>
                        <p className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <span className="text-sm sm:text-base">30 Nude photos Bonus</span>
                        </p>
                        <p className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <span className="text-sm sm:text-base">Google Drive Links</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-center sm:text-right">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                        <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">₹999</p>
                        <p className="text-xs sm:text-sm text-gray-500">One-time payment</p>
                      </div>
                      <button 
                        onClick={() => handleSelectPlan(model.pricingPlans[2].id)}
                        className="mt-4 sm:mt-6 w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105"
                      >
                        Select Plan
                      </button>
                    </div>
                  </div>
                </div>

                {/* Ultimate Plan */}
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-purple-500 relative">
                  <div className="absolute -top-3 right-4 sm:right-8 bg-purple-500 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 rounded-full">
                    Best Value
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Diamond className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Ultimate Plan</h3>
                      </div>
                      <div className="space-y-3 text-gray-600">
                        <p className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <span className="text-sm sm:text-base">10+ Nude videos (35-45 mins each)</span>
                        </p>
                        <p className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <span className="text-sm sm:text-base">Every dress included</span>
                        </p>
                        <p className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <span className="text-sm sm:text-base">Full collection access</span>
                        </p>
                        <p className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <span className="text-sm sm:text-base">250+ Nude photos Bonus</span>
                        </p>
                        <p className="flex items-center gap-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                          </div>
                          <span className="text-sm sm:text-base">Google Drive Links</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-center sm:text-right">
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
                        <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">₹1499</p>
                        <p className="text-xs sm:text-sm text-gray-500">One-time payment</p>
                      </div>
                      <button 
                        onClick={() => handleSelectPlan(model.pricingPlans[3].id)}
                        className="mt-4 sm:mt-6 w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
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
