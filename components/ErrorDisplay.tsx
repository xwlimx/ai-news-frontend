'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-lg font-medium text-red-900 mb-2">
            Analysis Failed
          </h3>
          <p className="text-red-800 mb-4">
            {message}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center space-x-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}