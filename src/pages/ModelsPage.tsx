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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Models</h1>
          <p className="text-xl text-gray-600 mb-8">
            Get premium model content at affordable prices! We're official resellers offering the same high-quality Nude videos at a fraction of the original cost
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
