import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import FeaturedModels from '../components/FeaturedModels';
import { Link } from 'react-router-dom';
import { Star, User, Video } from 'lucide-react';

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
      className="min-h-screen bg-background"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <HeroSection />
      <FeaturedModels />
      
      <motion.section 
        className="py-16 bg-model-dark"
        variants={itemVariants}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Why Choose <span className="text-model-primary">Our Platform</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-secondary rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-14 h-14 bg-model-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-7 w-7 text-model-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Premium Quality</h3>
              <p className="text-gray-800">
                Experience professional 4K content with exceptional production quality and attention to detail.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-secondary rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-14 h-14 bg-model-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-7 w-7 text-model-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Models</h3>
              <p className="text-gray-800">
                Our models are carefully selected professionals with exceptional talent and consistent high ratings.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-secondary rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-14 h-14 bg-model-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="h-7 w-7 text-model-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Access</h3>
              <p className="text-gray-800">
                Get immediate access to content after payment with our secure and efficient delivery system.
              </p>
            </motion.div>
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              to="/models" 
              className="inline-flex items-center justify-center bg-model-primary hover:bg-opacity-90 text-white font-medium rounded-lg px-6 py-3 transition-colors"
            >
              Explore All Models
            </Link>
          </div>
        </div>
      </motion.section>
      
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to <span className="text-model-primary">Get Started?</span>
            </h2>
            <p className="text-gray-800 mb-8">
              Browse our collection of premium models and choose from a variety of pricing plans that suit your preferences.
            </p>
            <Link 
              to="/models" 
              className="inline-flex items-center justify-center bg-model-primary hover:bg-opacity-90 text-white font-medium rounded-lg px-8 py-3 transition-colors"
            >
              View All Models
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Index;
