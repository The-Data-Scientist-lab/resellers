import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Modern background pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      {/* Content wrapper with glass effect */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
          <Header />
        </header>
        
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        
        <footer className="mt-auto">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default Layout;
