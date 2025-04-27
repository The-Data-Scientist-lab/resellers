import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Loader2, FileCheck, CreditCard, Shield, Lock, FileText } from 'lucide-react';

interface PaymentVerificationProcessProps {
  plan: {
    id: string;
    name: string;
    price: number;
    currencySymbol: string;
  };
  modelName: string;
  modelImage?: string;
}

const PaymentVerificationProcess: React.FC<PaymentVerificationProcessProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, modelName, modelImage } = location.state || {};
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Validating Screenshot",
      description: "Checking payment proof quality and details",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Processing Transaction",
      description: "Verifying payment details and amount",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Check",
      description: "Ensuring transaction security",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Final Verification",
      description: "Completing payment verification",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(timer);
          setTimeout(() => {
            navigate('/payment/verification-failed', {
              state: {
                plan,
                modelName,
                modelImage
              },
              replace: true
            });
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [navigate, plan, modelName, modelImage]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-4xl w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20"
      >
        {/* Header */}
        <div className="relative p-8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20"></div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
            className="relative flex justify-center mb-6"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-20 h-20 text-blue-500"
            >
              <ShieldCheck className="w-full h-full" />
            </motion.div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative text-4xl font-bold text-gray-900 mb-3"
          >
            Verifying Your Payment
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative text-gray-600 text-lg"
          >
            For {modelName} - {plan?.name}
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="relative p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Verification Steps */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className={`bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 ${
                    index === currentStep ? 'ring-2 ring-blue-500/50' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      {index === currentStep ? (
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                      ) : index < currentStep ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : (
                        <div className="w-6 h-6 text-white">{step.icon}</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${
                        index === currentStep ? 'text-blue-600' : 
                        index < currentStep ? 'text-green-600' : 'text-gray-700'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Right Column - Progress and Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Verification Progress</h2>
                <div className="space-y-4">
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 text-right">
                    Step {currentStep + 1} of {steps.length}
                  </p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Transaction Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Model</span>
                    <span className="font-medium">{modelName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan</span>
                    <span className="font-medium">{plan?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-medium">{plan?.currencySymbol}{plan?.price}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentVerificationProcess; 