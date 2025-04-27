
import React from 'react';
import { getFeaturedModels } from '../data/models';
import ModelCard from '../components/ModelCard';

const FeaturedPage = () => {
  const featuredModels = getFeaturedModels();

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">
            <span className="text-model-primary">Featured</span> Models
          </h1>
          <p className="text-gray-400">
            Discover our most popular models with exceptional content and high ratings
          </p>
        </div>
        
        <div className="model-grid">
          {featuredModels.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPage;
