"use client";

import { useState, useEffect } from 'react';
import { AppLoader } from './app-loader';

export function AppLoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate app loading for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <AppLoader />}
      {/* Render children with opacity transition to prevent flash of content */}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
        {children}
      </div>
    </>
  );
}
