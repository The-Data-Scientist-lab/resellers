import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <header className="relative z-10">
        <Header />
      </header>
      
      <main className="flex-grow relative z-10">
        {children}
      </main>
      
      <footer className="relative z-10">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
