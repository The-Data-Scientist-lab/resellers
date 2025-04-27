import React from 'react';
import { CheckCircle2, Star, Zap } from 'lucide-react';

const PremiumFeatures = () => {
  const features = [
    {
      icon: <CheckCircle2 className="h-8 w-8 text-model-primary" />,
      title: "Premium Quality",
      description: "Experience professional 4K content with exceptional production quality and attention to detail."
    },
    {
      icon: <Star className="h-8 w-8 text-model-primary" />,
      title: "Professional Models",
      description: "Our models are carefully selected professionals with exceptional talent and consistent high ratings."
    },
    {
      icon: <Zap className="h-8 w-8 text-model-primary" />,
      title: "Instant Access",
      description: "Get immediate access to content after payment with our secure and efficient delivery system."
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-white to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-indigo-50 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 [text-shadow:_0_1px_2px_rgba(0,0,0,0.1)]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-800 leading-relaxed [text-shadow:_0_1px_2px_rgba(0,0,0,0.1)]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 [text-shadow:_0_1px_2px_rgba(0,0,0,0.1)]">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-800 max-w-2xl mx-auto mb-8 [text-shadow:_0_1px_2px_rgba(0,0,0,0.1)]">
              Browse our collection of premium models and choose from a variety of pricing plans that suit your preferences.
            </p>
            <a 
              href="/models" 
              className="inline-block bg-gradient-to-r from-model-primary to-model-secondary text-white font-medium rounded-full px-8 py-3 transition-all hover:shadow-lg hover:scale-105 button-shadow"
            >
              View Models
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumFeatures; 