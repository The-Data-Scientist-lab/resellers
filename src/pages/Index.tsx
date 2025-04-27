import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import FeaturedModels from '../components/FeaturedModels';
import { Link } from 'react-router-dom';
import { Star, User, Video, ArrowRight } from 'lucide-react';

const Index = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <HeroSection />
      <FeaturedModels />
      
      <motion.section 
        className="py-20 bg-gradient-to-b from-gray-900 to-gray-800"
        variants={itemVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Our Platform</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experience the best in professional content with our premium platform
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/10 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Premium Quality</h3>
              <p className="text-gray-300">
                Experience professional 4K content with exceptional production quality and attention to detail.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/10 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <User className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Professional Models</h3>
              <p className="text-gray-300">
                Our models are carefully selected professionals with exceptional talent and consistent high ratings.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/10 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Video className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Instant Access</h3>
              <p className="text-gray-300">
                Get immediate access to content after payment with our secure and efficient delivery system.
              </p>
            </motion.div>
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              to="/models" 
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              Explore All Models
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </motion.section>
      
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Get Started?</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Browse our collection of premium models and choose from a variety of pricing plans that suit your preferences.
            </p>
            <Link 
              to="/models" 
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              View All Models
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Index;
