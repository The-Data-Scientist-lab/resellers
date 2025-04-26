import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { BadgeAlert } from 'lucide-react';

interface FailedPaymentStageProps {
  onRetry: () => void;
  showRefundForm: boolean;
  onShowRefundForm: () => void;
  refundFormProps: {
    phoneNumber: string;
    email: string;
    whatsappNumber: string;
    screenshotFile: File | null;
    onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onWhatsappChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
  };
}

const FailedPaymentStage = ({ 
  onRetry, 
  showRefundForm, 
  onShowRefundForm,
  refundFormProps 
}: FailedPaymentStageProps) => {
  const navigate = useNavigate();

  const handleRefundSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refundFormProps.onSubmit(e);
    navigate('/refund-confirmation');
  };

  return (
    <CardContent className="pt-6">
      <div className="bg-red-50 p-5 rounded-xl mb-6 border border-red-100">
        <div className="flex items-center justify-center mb-3">
          <BadgeAlert className="h-8 w-8 text-red-500" />
        </div>
        <p className="text-red-600 text-center font-medium mb-3">
          Your payment could not be verified
        </p>
        <ul className="text-gray-700 space-y-2">
          <li className="flex items-baseline gap-2">
            <span className="text-red-500">•</span>
            <span>Please try again with a clear screenshot</span>
          </li>
          <li className="flex items-baseline gap-2">
            <span className="text-model-primary">•</span>
            <span>Make sure the transaction details are visible</span>
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-gray-800 font-medium border-b border-gray-200 pb-3 mb-4">
            What to do next?
          </h3>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-center gap-3">
              <span className="bg-gradient-to-r from-model-primary to-model-secondary text-white rounded-full w-7 h-7 flex items-center justify-center text-xs shrink-0">1</span>
              <span>Take a clear screenshot of your payment</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-gradient-to-r from-model-primary to-model-secondary text-white rounded-full w-7 h-7 flex items-center justify-center text-xs shrink-0">2</span>
              <span>Make sure transaction ID is visible</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-gradient-to-r from-model-primary to-model-secondary text-white rounded-full w-7 h-7 flex items-center justify-center text-xs shrink-0">3</span>
              <span>Send the screenshot again</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-gradient-to-r from-model-primary to-model-secondary text-white rounded-full w-7 h-7 flex items-center justify-center text-xs shrink-0">4</span>
              <span>We'll verify it within seconds</span>
            </li>
          </ol>
        </div>

        {!showRefundForm ? (
          <div className="flex flex-col space-y-3 pt-4">
            <Button 
              className="w-full bg-model-primary hover:bg-model-primary/90 rounded-full"
              onClick={onRetry}
            >
              Try Again
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-red-300 text-red-600 hover:bg-red-50 rounded-full"
              onClick={onShowRefundForm}
            >
              Request Refund
            </Button>
          </div>
        ) : (
          <form onSubmit={handleRefundSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={refundFormProps.phoneNumber}
                onChange={refundFormProps.onPhoneChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-model-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={refundFormProps.email}
                onChange={refundFormProps.onEmailChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-model-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">WhatsApp Number</label>
              <input
                type="tel"
                value={refundFormProps.whatsappNumber}
                onChange={refundFormProps.onWhatsappChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-model-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Transaction Screenshot</label>
              <input
                type="file"
                onChange={refundFormProps.onFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-model-primary"
                accept="image/*"
                required
              />
            </div>
            <div className="flex space-x-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-model-primary hover:bg-model-primary/90"
              >
                Submit Refund Request
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={refundFormProps.onCancel}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </CardContent>
  );
};

export default FailedPaymentStage;
