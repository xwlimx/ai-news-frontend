'use client';

import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Processing...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <div className="absolute inset-0 rounded-full border-2 border-blue-200 animate-pulse"></div>
      </div>
      <div className="text-center">
        <p className="text-lg font-medium text-gray-900 mb-1">{message}</p>
        <p className="text-sm text-gray-500">
          This may take a few moments as our AI analyzes your content
        </p>
      </div>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
}