import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  QrCode, 
  Upload, 
  Loader2, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  XCircle, 
  Clock,
  Info,
  AlertCircle,
  CreditCard,
  Sparkles,
  Smartphone,
  Shield,
  Lock,
  ChevronRight
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';

interface LocationState {
  plan: {
    id: string;
    name: string;
    price: number;
    currencySymbol: string;
    theme?: string;
    description?: string;
    features?: string[];
    duration?: string;
  };
  modelName: string;
  modelImage?: string;
}

// Test data to use when accessed directly
const testData = {
  plan: {
    id: "test-basic",
    name: "Basic Plan",
    price: 449,
    currencySymbol: "₹",
    features: [
      "30 Minutes Nude Video",
      "4K quality",
      "Basic collection access",
      "Google Drive Links"
    ]
  },
  modelName: "Test Model",
  modelImage: "https://example.com/test-image.jpg"
};

const gradientStyle = {
  backgroundSize: '200% 200%',
  animation: 'gradient 8s ease infinite',
  '@keyframes gradient': {
    '0%, 100%': {
      backgroundPosition: '0% 50%'
    },
    '50%': {
      backgroundPosition: '100% 50%'
    }
  }
};

const QRCodePaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(120);

  if (!location.state) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Invalid Payment</h2>
          <p className="text-gray-600 mb-6">Please select a plan and complete the purchase process.</p>
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

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      setError(null);
      setScreenshotFile(file);
      setIsUploading(true);
      setUploadProgress(0);
      
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

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSubmit = () => {
    if (!screenshotFile) {
      setError('Please upload a payment screenshot');
      return;
    }

    navigate('/payment/verification-process', {
      state: {
        plan,
        modelName,
        modelImage,
        screenshotFile
      }
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <Button
            onClick={handleGoBack}
            variant="ghost"
            className="text-gray-600 hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
              <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
              <p className="text-blue-100">Follow the steps below to complete your payment</p>
            </div>

            <div className="p-8">
              {/* Model and Plan Info */}
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                {/* Model Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    {modelImage && (
                      <img 
                        src={modelImage} 
                        alt={modelName}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                    )}
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{modelName}</h2>
                      <p className="text-gray-600">Selected Plan: {plan.name}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Plan Price</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {plan.currencySymbol}{plan.price}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {plan.features?.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timer and QR Code */}
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="w-6 h-6" />
                        <span className="text-sm">Time Remaining</span>
                      </div>
                      <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
                    </div>
                  </div>
                  <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-6">
                    <div className="flex flex-col items-center">
                      <div className="p-4 bg-gray-50 rounded-xl mb-4">
                        <QRCodeSVG 
                          value={`upi://pay?pa=resellers@airtel&pn=${encodeURIComponent(modelName)}&am=${plan.price}&cu=INR`}
                          size={200}
                          level="H"
                          includeMargin={true}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Smartphone className="w-5 h-5" />
                        <span>Scan with any UPI app</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Upload className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Upload Payment Screenshot</h3>
                </div>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6">
                  <div className="flex flex-col items-center">
                    {!screenshotFile ? (
                      <>
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                          <Upload className="w-8 h-8 text-blue-600" />
                        </div>
                        <p className="text-gray-600 mb-4 text-center text-sm">
                          Click to upload your payment screenshot
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="screenshot-upload"
                        />
                        <label
                          htmlFor="screenshot-upload"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl cursor-pointer transition-all hover:scale-105 text-sm font-medium shadow-lg hover:shadow-xl"
                        >
                          Choose File
                        </label>
                      </>
                    ) : (
                      <div className="w-full">
                        <div className="flex items-center gap-4 mb-4">
                          {previewUrl && (
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
                              <img
                                src={previewUrl}
                                alt="Payment screenshot preview"
                                className="object-cover w-full h-full"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 text-sm truncate">
                              {screenshotFile.name}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {(screenshotFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setScreenshotFile(null);
                              if (previewUrl) {
                                URL.revokeObjectURL(previewUrl);
                                setPreviewUrl(null);
                              }
                            }}
                            className="text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-red-50"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>

                        {isUploading ? (
                          <div className="space-y-2">
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                              <motion.div
                                className="bg-blue-600 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${uploadProgress}%` }}
                                transition={{ duration: 0.2 }}
                              />
                            </div>
                            <div className="flex items-center justify-between text-gray-500 text-xs">
                              <span>Uploading...</span>
                              <span>{uploadProgress}%</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2 text-green-500 bg-green-50 p-3 rounded-xl">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="text-sm">File uploaded successfully</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {error && (
                  <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-xl mt-3">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <Button
                  onClick={handleSubmit}
                  disabled={!screenshotFile || isUploading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5 mr-2" />
                      Start Verifying
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodePaymentPage;

