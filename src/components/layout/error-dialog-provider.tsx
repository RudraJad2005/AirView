'use client';

import { useState, useCallback, createContext, ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertTriangle } from 'lucide-react';

interface ErrorDialogContextType {
  showError: (title: string, description: string) => void;
}

export const ErrorDialogContext = createContext<ErrorDialogContextType | undefined>(undefined);

interface ErrorDialogProviderProps {
  children: ReactNode;
}

export function ErrorDialogProvider({ children }: ErrorDialogProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorInfo, setErrorInfo] = useState({ title: '', description: '' });

  const showError = useCallback((title: string, description: string) => {
    setErrorInfo({ title, description });
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <ErrorDialogContext.Provider value={{ showError }}>
      {children}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              {errorInfo.title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {errorInfo.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleClose}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ErrorDialogContext.Provider>
  );
}
