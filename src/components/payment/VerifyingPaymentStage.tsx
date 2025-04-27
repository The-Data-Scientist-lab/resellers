import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ShieldCheck, FileCheck, CreditCard, CheckCircle2 } from 'lucide-react';

interface VerifyingPaymentStageProps {
  onVerificationComplete: (success: boolean) => void;
}

const VerifyingPaymentStage: React.FC<VerifyingPaymentStageProps> = ({ onVerificationComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const steps = [
    {
      title: 'Payment Screenshot',
      description: 'Verifying your payment proof',
      icon: FileCheck,
    },
    {
      title: 'Transaction Details',
      description: 'Validating payment information',
      icon: CreditCard,
    },
    {
      title: 'Security Check',
      description: 'Performing security verification',
      icon: ShieldCheck,
    },
    {
      title: 'Final Verification',
      description: 'Completing the process',
      icon: CheckCircle2,
    },
  ];

  useEffect(() => {
    const startTime = Date.now();
    const totalDuration = 25000; // 25 seconds
    const stepDuration = totalDuration / steps.length;
    let timeoutId: NodeJS.Timeout;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(currentProgress);

      const stepIndex = Math.floor(elapsed / stepDuration);
      if (stepIndex < steps.length) {
        setCurrentStep(stepIndex);
      }

      if (elapsed < totalDuration) {
        timeoutId = setTimeout(updateProgress, 100);
      } else {
        setIsComplete(true);
        // Only call onVerificationComplete when progress reaches 100%
        if (currentProgress >= 100) {
          onVerificationComplete(false);
        }
      }
    };

    updateProgress();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onVerificationComplete]);

  // Prevent premature navigation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isComplete) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
          >
            <ShieldCheck className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-bold text-gray-900 mb-2"
          >
            Payment Verification
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-600"
          >
            We're verifying your payment details
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical timeline */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
          
          {/* Progress indicator */}
          <motion.div
            className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-600"
            initial={{ height: 0 }}
            animate={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-start"
              >
                {/* Step indicator */}
                <div className="absolute left-0 w-16 flex justify-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > index
                      ? 'bg-green-500 text-white'
                      : currentStep === index
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {currentStep > index ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : currentStep === index ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>
                </div>

                {/* Step content */}
                <div className={`ml-16 p-6 rounded-xl w-full ${
                  currentStep === index
                    ? 'bg-white shadow-lg border border-blue-100'
                    : currentStep > index
                    ? 'bg-white shadow-sm border border-green-100'
                    : 'bg-gray-50 border border-gray-100'
                }`}>
                  <h3 className={`text-lg font-semibold ${
                    currentStep === index
                      ? 'text-blue-900'
                      : currentStep > index
                      ? 'text-green-900'
                      : 'text-gray-500'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm ${
                    currentStep === index
                      ? 'text-blue-700'
                      : currentStep > index
                      ? 'text-green-700'
                      : 'text-gray-400'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <span className="font-medium">Verification Progress</span>
            <span className="font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyingPaymentStage;
