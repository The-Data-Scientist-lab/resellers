import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
};

export default PageTransition; 