import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, CreditCard, ArrowLeft } from 'lucide-react';

interface LocationState {
  plan: {
    id: string;
    name: string;
    price: number;
    currencySymbol: string;
    features: string[];
    theme?: string;
    duration?: string;
  };
  modelName: string;
  modelImage?: string;
}

const CompletePurchase = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we have the required state
  if (!location.state) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Invalid Purchase</h2>
          <p className="text-gray-600 mb-6">Please select a plan from the model's page.</p>
          <Button 
            onClick={() => navigate('/models')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Back to Models
          </Button>
        </div>
      </div>
    );
  }

  const { plan, modelName, modelImage } = location.state as LocationState;

  const handleProceedToPayment = () => {
    navigate('/payment/qr-code', { 
      state: { plan, modelName, modelImage },
      replace: false
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <Button
              onClick={handleGoBack}
              variant="ghost"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Complete Your Purchase
            </h1>
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>

          <div className="space-y-8">
            {/* Model Info */}
            <div className="flex items-center gap-6">
              {modelImage && (
                <img 
                  src={modelImage} 
                  alt={modelName}
                  className="w-24 h-24 rounded-full object-cover border-2 border-blue-200"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{modelName}</h2>
                <p className="text-gray-600">Selected Plan: {plan.name}</p>
              </div>
            </div>

            {/* Plan Details */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Plan Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plan Name</span>
                  <span className="font-medium">{plan.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {plan.currencySymbol}{plan.price}
                  </span>
                </div>
                {plan.theme && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Theme</span>
                    <span className="font-medium">{plan.theme}</span>
                  </div>
                )}
                {plan.duration && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{plan.duration}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">What's Included</h3>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Proceed to Payment Button */}
            <div className="pt-6">
              <Button
                onClick={handleProceedToPayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletePurchase; 