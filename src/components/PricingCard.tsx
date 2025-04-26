import React from 'react';
import { PricingPlan } from '../data/models';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: (planId: string) => void;
}

const PricingCard = ({ plan, onSelect }: PricingCardProps) => {
  return (
    <div className={`bg-secondary rounded-lg overflow-hidden shadow-lg border ${plan.popular ? 'border-model-primary' : 'border-transparent'} pricing-card`}>
      {plan.popular && (
        <div className="bg-model-primary text-white text-center py-1 text-xs font-semibold">
          MOST POPULAR
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        
        {plan.theme && (
          <Badge variant="outline" className="mb-3 bg-secondary text-gray-700 border-gray-400">
            {plan.theme} Theme
          </Badge>
        )}
        
        <div className="flex items-baseline mb-5">
          <span className="text-3xl font-extrabold text-gray-900">{plan.currencySymbol}{plan.price}</span>
        </div>
        
        <ul className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-model-primary shrink-0 mt-0.5" />
              <span className="ml-2 text-gray-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={() => onSelect(plan.id)} 
          className={`w-full ${
            plan.popular 
              ? 'bg-model-primary hover:bg-model-primary/90 text-white' 
              : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300'
          } font-medium py-2.5`}
        >
          Select Plan
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
