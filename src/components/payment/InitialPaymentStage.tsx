import React, { useState, useRef } from 'react';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Upload, Loader2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';

interface InitialPaymentStageProps {
  plan: {
    currencySymbol: string;
    price: number;
    name: string;
  };
  modelName: string;
  modelImage?: string;
  onVerification: () => void;
  onCancel: () => void;
  screenshotFile: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNavigateBack: () => void;
}

const InitialPaymentStage = ({
  plan,
  modelName,
  modelImage,
  onVerification,
  screenshotFile,
  onFileChange,
  handleNavigateBack
}: InitialPaymentStageProps) => {
  const paymentAmount = `${plan.currencySymbol}${plan.price}`;
  const paymentDetails = `Payment for ${modelName} - ${plan.name} (${paymentAmount})`;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsUploading(true);
      setUploadProgress(0);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <CardContent className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">{modelName}</h2>
        <p>Selected Plan: {plan.name}</p>
        <p className="text-xl font-semibold mt-2">{paymentAmount}</p>
      </div>

      <div className="mb-6">
        <div className="flex flex-col items-center justify-center">
          <QRCodeSVG 
            value={`upi://pay?pa=merchant@upi&pn=${encodeURIComponent(modelName)}&am=${plan.price}&cu=INR&tn=${encodeURIComponent(paymentDetails)}`}
            size={200}
            level="H"
            includeMargin={true}
          />
          <p className="mt-4">Scan QR code to make payment</p>
        </div>
      </div>

      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
        >
          <Upload className="w-8 h-8 text-white" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold text-gray-900 mb-2"
        >
          Upload Payment Proof
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-600 mb-4"
        >
          Please upload a screenshot of your payment confirmation
        </motion.p>
      </div>

      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col items-center">
            {previewUrl ? (
              <div className="w-full max-w-xs">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl blur-sm group-hover:blur-md transition-all duration-300" />
                  <div className="relative bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-start space-x-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden ring-1 ring-gray-100">
                        <img
                          src={previewUrl}
                          alt="Payment proof preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {selectedFile?.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {(selectedFile?.size || 0) / 1024 / 1024 > 1
                            ? `${((selectedFile?.size || 0) / 1024 / 1024).toFixed(1)} MB`
                            : `${((selectedFile?.size || 0) / 1024).toFixed(1)} KB`}
                        </p>
                        <div className="mt-2 flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs text-gray-500">Ready to upload</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-xs">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl blur-sm group-hover:blur-md transition-all duration-300" />
                  <div className="relative bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                      <Upload className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-500 text-center">
                      Drop your payment proof here
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      or click to browse
                    </p>
                  </div>
                </div>
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <button
              onClick={handleUploadClick}
              disabled={isUploading}
              className={`w-full max-w-xs px-6 py-3 rounded-lg font-medium text-white transition-all ${
                isUploading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
              }`}
            >
              {isUploading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Uploading...</span>
                </div>
              ) : (
                'Choose File'
              )}
            </button>

            {isUploading && (
              <div className="w-full max-w-xs">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span>Upload Progress</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <CardFooter className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={handleNavigateBack}
        >
          Back
        </Button>
        <Button
          onClick={onVerification}
          disabled={!selectedFile}
        >
          Verify Payment
        </Button>
      </CardFooter>
    </CardContent>
  );
};

export default InitialPaymentStage;
