// src/components/common/Loader.tsx
// src/components/common/LoadingSpinner.tsx
import React from 'react';
import { useLoading } from '../../contexts/LoadingContext';

const LoadingSpinner: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default LoadingSpinner;
