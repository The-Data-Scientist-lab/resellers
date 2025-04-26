import React from 'react';
import { getAllModels } from '../data/models';
import ModelCard from '../components/ModelCard';
import PremiumFeatures from '../components/PremiumFeatures';

const ModelsPage = () => {
  const models = getAllModels();

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold contrast-text mb-4 text-shadow">
            Our <span className="text-model-primary">Premium</span> Models
          </h1>
          <p className="text-lg contrast-text-light">
            Discover our carefully selected professional models with high-quality content and multiple pricing options
          </p>
        </div>
        
        <div className="model-grid mb-16">
          {models.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>

        <PremiumFeatures />
      </div>
    </div>
  );
};

export default ModelsPage;
