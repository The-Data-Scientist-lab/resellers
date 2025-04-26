import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
}

const StatCard = ({ label, value, icon, prefix, suffix }: StatCardProps) => {
  return (
    <div className="bg-secondary rounded-lg p-5 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-700 text-sm font-medium">{label}</p>
        {icon && <div className="text-model-primary">{icon}</div>}
      </div>
      <div className="flex items-baseline">
        {prefix && <span className="text-gray-600 mr-1">{prefix}</span>}
        <p className="text-2xl font-bold text-gray-900 animate-pulse-soft">{value}</p>
        {suffix && <span className="text-gray-600 ml-1">{suffix}</span>}
      </div>
    </div>
  );
};

export default StatCard;
