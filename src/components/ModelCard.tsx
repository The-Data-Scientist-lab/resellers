import React from 'react';
import { Link } from 'react-router-dom';
import { ModelProfile } from '../data/models';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ModelCardProps {
  model: ModelProfile;
}

const ModelCard = ({ model }: ModelCardProps) => {
  return (
    <Link 
      to={`/model/${model.slug}`}
      className="group"
    >
      <div className="bg-secondary rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow pricing-card">
        <div className="relative aspect-[3/4]">
          <img 
            src={model.image} 
            alt={model.name} 
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 gradient-overlay flex flex-col justify-end p-4">
            <h3 className="text-xl font-bold text-white mb-1">{model.name}</h3>
            <div className="flex items-center text-yellow-400 mb-2">
              <Star className="w-4 h-4 fill-current" />
              <span className="ml-1 text-sm">{model.stats.rating}</span>
              <span className="mx-2 text-white text-xs">•</span>
              <span className="text-white text-xs">
                {model.stats.recentOrders} orders
              </span>
            </div>
            {model.specialTheme && (
              <Badge className="bg-model-primary hover:bg-model-primary/90 text-white w-fit">{model.specialTheme}</Badge>
            )}
          </div>
        </div>
        <div className="p-4 bg-card">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-400">From</span>
              <span className="font-semibold text-lg">
                {model.pricingPlans[0].currencySymbol}{model.pricingPlans[0].price}
              </span>
            </div>
            <span className="text-model-primary text-sm font-semibold group-hover:underline">
              View Profile
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ModelCard;
