import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, ArrowLeft, Camera, CheckCircle2, AlertCircle, ArrowRight, Receipt, ShieldAlert, ShieldX, HelpCircle, Clock, MessageSquare, Sparkles } from 'lucide-react';

const PaymentVerificationFailed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan, modelName, modelImage } = location.state || {};

  const steps = [
    {
      icon: <Camera className="w-6 h-6" />,
      text: "Check if money has been debited from your account",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      text: "Verify your transaction ID and amount",
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      text: "Take a clear screenshot of your payment",
      color: "from-blue-700 to-blue-800"
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      text: "Make sure all payment details are visible",
      color: "from-blue-800 to-blue-900"
    }
  ];

  const handleTryAgain = () => {
    navigate('/payment/qr-code', {
      state: {
        plan,
        modelName,
        modelImage
      }
    });
  };

  const handleRefund = () => {
    navigate('/refund/request', {
      state: {
        plan,
        modelName,
        modelImage
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-200/20 to-white/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-white/20 to-blue-200/20 rounded-full blur-3xl"
        />
      </div>

      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-6xl w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20"
      >
        {/* Header */}
        <div className="relative p-8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-800/10"></div>
          
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
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-24 h-24"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <ShieldX className="w-12 h-12 text-white" />
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -right-1 -top-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <XCircle className="w-4 h-4 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-3"
          >
            Payment Verification Failed
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative text-gray-600 max-w-2xl mx-auto"
          >
            We couldn't verify your payment. Let's fix this together.
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="relative p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Instructions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-blue-100 shadow-lg"
              >
                <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">Follow these steps</h2>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="group flex items-start gap-3 bg-white/80 p-4 rounded-xl border border-blue-100 backdrop-blur-sm hover:bg-white transition-all duration-300"
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className={`p-2 rounded-lg bg-gradient-to-br ${step.color} text-white group-hover:scale-110 transition-transform duration-300`}
                      >
                        {step.icon}
                      </motion.div>
                      <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{step.text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-blue-100 shadow-lg"
              >
                <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">What would you like to do?</h2>
                
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleTryAgain}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl px-6 py-4 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30"
                  >
                    <motion.div
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </motion.div>
                    Try Again
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleRefund}
                    className="w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-medium rounded-xl px-6 py-4 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Receipt className="w-5 h-5" />
                    </motion.div>
                    Get Refund
                  </motion.button>
                </div>
              </motion.div>

              {/* Support Message */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 p-6 rounded-2xl border border-blue-100 shadow-lg"
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </motion.div>
                  <motion.div
                    animate={{
                      scale: [1.1, 1, 1.1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white"
                  >
                    <Clock className="w-5 h-5" />
                  </motion.div>
                </div>
                <p className="text-gray-600 text-center">
                  For inquiry and support, please fill out the refund form. Our team will contact you as soon as possible.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="block text-center"
              >
                <Link
                  to="/"
                  className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-900 font-medium flex items-center justify-center gap-2 py-2 transition-colors duration-300"
                >
                  <motion.span
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    Return to Home
                  </motion.span>
                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentVerificationFailed; 