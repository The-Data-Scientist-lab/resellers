import React from 'react';
import { Link } from 'react-router-dom';
import ModelCard from './ModelCard';
import { getFeaturedModels } from '../data/models';

const FeaturedModels = () => {
  const featuredModels = getFeaturedModels();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            <span className="text-model-primary">Featured</span> Models
          </h2>
          <Link 
            to="/models" 
            className="text-model-primary hover:underline font-medium"
          >
            View All Models
          </Link>
        </div>
        
        <div className="model-grid">
          {featuredModels.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedModels;
