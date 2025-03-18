
import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  
  // Simulate page transition effect
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [location.pathname]);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className={`flex-1 container px-4 py-8 md:py-12 transition-opacity duration-400 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="animate-slide-up">{children}</div>
      </main>
    </div>
  );
};
