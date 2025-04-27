import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { submitToSheet, getClientIP } from '@/utils/googleSheets';
import { Loader2, MessageCircle, Mail, Phone, Upload, CheckCircle2, XCircle, FileCheck, CreditCard, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { uploadImage } from '@/utils/firebaseStorage';

interface LocationState {
  plan: {
    id: string;
    name: string;
    price: number;
    currencySymbol: string;
    theme?: string;
  };
  modelName: string;
  modelImage?: string;
}

const RefundRequestForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan, modelName, modelImage } = (location.state as LocationState) || {};

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsappNumber: '',
    reason: '',
    screenshot: null as File | null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [verificationStep, setVerificationStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSubmitting) {
      interval = setInterval(() => {
        setVerificationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return Math.min(prev + 1, 100);
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadError('');
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = Math.min(prev + 10, 100);
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setFormData(prev => ({ ...prev, screenshot: file }));
            return 100;
          }
          return newProgress;
        });
      }, 200);
    }
  };

  const handleRemoveFile = () => {
    setFormData(prev => ({ ...prev, screenshot: null }));
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setVerificationStep(1);

    try {
      // Get client IP
      const ip = await getClientIP();
      console.log('Client IP:', ip);

      // Prepare data for Google Sheet
      const sheetData = {
        timestamp: new Date().toISOString(),
        ip,
        modelName,
        planName: plan.name,
        amount: `${plan.currencySymbol}${plan.price}`,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        whatsappNumber: formData.whatsappNumber,
        reason: formData.reason,
        hasScreenshot: formData.screenshot ? 'Yes' : 'No',
        status: 'Pending',
        type: 'refund' as const
      };

      console.log('Submitting form data:', sheetData);

      // Submit to Google Sheet via Apps Script
      await submitToSheet(sheetData);
      
      // Show contact information instead of navigating
      setShowContactInfo(true);
      
    } catch (err) {
      console.error('Detailed form submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit refund request. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showContactInfo) {
    return (
      <div className="container mx-auto py-12 px-4 min-h-[80vh] flex items-center justify-center">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-10 h-10 text-blue-500" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Refund Request Received
              </h2>
              
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3">Next Steps</h3>
                  <ul className="text-left space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>We have received your refund request and payment details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Our team will verify your payment confirmation within 24 hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>Once verified, your refund will be processed within 7 working days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>You will receive a confirmation email and WhatsApp message once the refund is initiated</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Your Refund Details</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Model: {modelName}</li>
                    <li>• Plan: {plan.name}</li>
                    <li>• Amount: {plan.currencySymbol}{plan.price}</li>
                    <li>• Request Date: {new Date().toLocaleDateString()}</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Important Notes</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Please keep your payment confirmation screenshot handy</li>
                    <li>• Refund processing time may vary based on your payment method</li>
                    <li>• For faster processing, please mention your refund request ID when contacting support</li>
                  </ul>
                </div>

                <Button
                  onClick={() => navigate('/')}
                  className="w-full"
                >
                  Return to Home
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 min-h-[80vh] flex items-center justify-center">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Request Refund
            </h2>
            <p className="text-gray-600">
              Please fill out the form below to request a refund
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                <Input
                  id="whatsappNumber"
                  name="whatsappNumber"
                  type="tel"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter your WhatsApp number"
                />
              </div>

              <div>
                <Label htmlFor="reason">Reason for Refund</Label>
                <Textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  placeholder="Please explain why you are requesting a refund"
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="screenshot">Payment Screenshot</Label>
                <div className="mt-2">
                  {!formData.screenshot ? (
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="screenshot"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                        </div>
                        <input
                          id="screenshot"
                          name="screenshot"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          ref={fileInputRef}
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                            {formData.screenshot.type.startsWith('image/') && (
                              <img
                                src={URL.createObjectURL(formData.screenshot)}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {formData.screenshot.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(formData.screenshot.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={handleRemoveFile}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <XCircle className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {isUploading && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Uploading...</span>
                        <span className="text-gray-600">{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}

                  {uploadError && (
                    <p className="mt-2 text-sm text-red-500">{uploadError}</p>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {isSubmitting && (
              <div className="mt-8">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Verifying Your Payment</h3>
                  <p className="text-sm text-gray-500 mt-1">Please wait while we process your request</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileCheck className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Payment Screenshot</p>
                        <p className="text-xs text-gray-500">Verifying your payment confirmation</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Transaction Details</p>
                        <p className="text-xs text-gray-500">Validating your transaction</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Processing Refund</p>
                        <p className="text-xs text-gray-500">Initiating refund process</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <span>Progress</span>
                      <span>{verificationProgress}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
                        style={{ width: `${verificationProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center mt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Payment...</span>
                  </div>
                ) : (
                  'Submit Refund Request'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RefundRequestForm; 