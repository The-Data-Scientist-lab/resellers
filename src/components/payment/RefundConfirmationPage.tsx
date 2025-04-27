import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, MessageSquare, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const RefundConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-model-primary/5 to-model-secondary/5 flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="glass-card border-model-primary/20 shadow-lg rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <CheckCircle2 className="w-24 h-24 text-green-500" />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full bg-green-500/20"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Refund Request Received</h1>
              <p className="text-gray-600">Your refund request has been submitted successfully</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              {/* What's Next Section */}
              <div className="bg-gradient-to-r from-model-primary/5 to-model-secondary/5 rounded-xl p-6 border border-model-primary/20">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>
                
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email Confirmation</p>
                      <p className="text-sm text-gray-600 mt-1">
                        We'll send you an email confirmation with your refund details
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">WhatsApp Confirmation</p>
                      <p className="text-sm text-gray-600 mt-1">
                        You'll receive a WhatsApp message confirming your refund request
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Processing Time</p>
                      <p className="text-sm text-gray-600 mt-1">
                        The amount will be credited back to your original payment method within 3-7 business days
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button
                  onClick={() => navigate('/')}
                  className="w-full sm:w-auto bg-gradient-to-r from-model-primary to-model-secondary hover:from-model-primary/90 hover:to-model-secondary/90"
                >
                  Back to Home
                </Button>
                <Button
                  onClick={() => navigate('/models')}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Browse Models
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RefundConfirmationPage; 