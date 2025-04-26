import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PricingPlan, ModelProfile } from '@/data/models';
import { toast } from 'sonner';
import { CheckCircle, CreditCard } from 'lucide-react';

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: PricingPlan | null;
  model: ModelProfile;
}

const PaymentModal = ({ open, onOpenChange, plan, model }: PaymentModalProps) => {
  const navigate = useNavigate();
  
  const handlePayment = () => {
    if (plan && model) {
      navigate('/payment/qr-code', { 
        state: { 
          plan,
          modelName: model.name,
          modelImage: model.image
        }
      });
      onOpenChange(false);
    } else {
      toast.error("Plan information is missing. Please try again.");
    }
  };

  if (!plan || !model) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text text-center">
            Complete Your Purchase
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            You're purchasing the {plan.name} for {model.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {model.image && (
            <div className="flex justify-center">
              <img 
                src={model.image} 
                alt={model.name}
                className="h-32 w-32 object-cover rounded-full border-2 border-model-primary/20 shadow-lg"
              />
            </div>
          )}
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 shadow-sm">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-indigo-100">
              <span className="contrast-text-light">Selected Plan</span>
              <span className="font-semibold contrast-text">{plan.name}</span>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <span className="contrast-text-light">Price</span>
              <span className="text-3xl font-bold gradient-text">
                {plan.currencySymbol}{plan.price}
              </span>
            </div>
            
            <div className="space-y-3">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 contrast-text-light">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={handlePayment}
            className="w-full bg-gradient-to-r from-model-primary to-model-secondary hover:from-model-primary/90 hover:to-model-secondary/90 text-white"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Proceed to Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
