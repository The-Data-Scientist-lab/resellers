import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface LocationState {
  modelName: string;
  planName: string;
  amount: string;
}

const RefundSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 blur-2xl" />
            <div className="relative p-8">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg mb-6">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-2xl font-bold text-gray-900 mb-2 text-center"
                >
                  Refund Request Received
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-gray-600 text-center mb-8"
                >
                  We have received your refund request and will process it shortly.
                </motion.p>

                <div className="w-full space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Model:</span> {state?.modelName}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Plan:</span> {state?.planName}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Amount:</span> {state?.amount}
                    </p>
                  </div>

                  <div className="flex justify-center gap-4 mt-8">
                    <Link to="/">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Return to Home
                      </Button>
                    </Link>
                    <Link to="/models">
                      <Button variant="outline">
                        Browse Models
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RefundSuccess; 