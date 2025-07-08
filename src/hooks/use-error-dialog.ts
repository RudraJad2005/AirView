'use client';

import { useContext } from 'react';
import { ErrorDialogContext } from '@/components/layout/error-dialog-provider';

export const useErrorDialog = () => {
  const context = useContext(ErrorDialogContext);
  if (context === undefined) {
    throw new Error('useErrorDialog must be used within an ErrorDialogProvider');
  }
  return context;
};
