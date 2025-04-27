
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Upload } from 'lucide-react';

interface RefundFormProps {
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
}

const RefundForm = ({
  phoneNumber,
  email,
  whatsappNumber,
  screenshotFile,
  onPhoneChange,
  onEmailChange,
  onWhatsappChange,
  onFileChange,
  onSubmit,
  onCancel
}: RefundFormProps) => {
  return (
    <form onSubmit={onSubmit} className="pt-4 border-t border-gray-200">
      <h3 className="text-gray-800 font-semibold mb-4">Refund Request Form</h3>
      
      <div className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="phone" className="text-gray-700 flex items-center">
            <Phone className="inline mr-2 h-4 w-4 text-model-primary" /> Phone Number
          </Label>
          <Input 
            id="phone" 
            type="tel" 
            placeholder="Enter your phone number"
            className="bg-white text-gray-800 border-gray-300 focus:border-model-primary"
            value={phoneNumber}
            onChange={onPhoneChange}
            required
          />
        </div>
        
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email" className="text-gray-700 flex items-center">
            <Mail className="inline mr-2 h-4 w-4 text-model-primary" /> Email Address
          </Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="Enter your email address"
            className="bg-white text-gray-800 border-gray-300 focus:border-model-primary"
            value={email}
            onChange={onEmailChange}
            required
          />
        </div>
        
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="whatsapp" className="text-gray-700 flex items-center">
            <Phone className="inline mr-2 h-4 w-4 text-model-primary" /> WhatsApp Number
          </Label>
          <Input 
            id="whatsapp" 
            type="tel" 
            placeholder="Enter your WhatsApp number"
            className="bg-white text-gray-800 border-gray-300 focus:border-model-primary"
            value={whatsappNumber}
            onChange={onWhatsappChange}
            required
          />
        </div>
        
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="refundScreenshot" className="text-gray-700 flex items-center">
            <Upload className="inline mr-2 h-4 w-4 text-model-primary" /> Payment Screenshot
          </Label>
          <Input 
            id="refundScreenshot" 
            type="file" 
            accept="image/*"
            className="bg-white text-gray-800 border-gray-300 focus:border-model-primary"
            onChange={onFileChange}
            required={!screenshotFile}
          />
        </div>

        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-model-primary to-model-secondary hover:shadow-md rounded-full"
          >
            Submit Refund Request
          </Button>
          <Button 
            type="button"
            variant="outline" 
            className="w-full mt-3 text-gray-700 rounded-full"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RefundForm;
