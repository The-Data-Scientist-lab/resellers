import React from 'react';
import { Shield } from 'lucide-react';

interface TrustBadgeProps {
  className?: string;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full">
        <Shield className="w-4 h-4 mr-1" />
        <span className="text-sm font-medium">Trusted Reseller</span>
      </div>
      <div className="h-4 w-px bg-gray-300" />
      <span className="text-sm text-gray-600">Est. 2021</span>
      <div className="h-4 w-px bg-gray-300" />
      <span className="text-sm text-gray-600">10,000+ Customers</span>
    </div>
  );
};

export default TrustBadge; 