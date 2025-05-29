'use client';

import { FileText, Globe, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { AnalysisResult } from '@/types/model';

interface ResultsDisplayProps {
  results: AnalysisResult;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copiedNationalities, setCopiedNationalities] = useState(false);

  const copyToClipboard = async (text: string, type: 'summary' | 'nationalities') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'summary') {
        setCopiedSummary(true);
        setTimeout(() => setCopiedSummary(false), 2000);
      } else {
        setCopiedNationalities(true);
        setTimeout(() => setCopiedNationalities(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Summary Section */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900">Article Summary</h3>
          </div>
          <button
            onClick={() => copyToClipboard(results.summary, 'summary')}
            className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            {copiedSummary ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-green-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700">Copy</span>
              </>
            )}
          </button>
        </div>
        <div className="p-4">
          {results.summary ? (
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {results.summary}
            </p>
          ) : (
            <p className="text-gray-500 italic">No summary generated</p>
          )}
        </div>
      </div>

      {/* Nationalities Section */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Nationalities & Countries
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({results.nationalities.length} found)
              </span>
            </h3>
          </div>
          {results.nationalities.length > 0 && (
            <button
              onClick={() => copyToClipboard(results.nationalities.join(', '), 'nationalities')}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              {copiedNationalities ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-green-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-700">Copy</span>
                </>
              )}
            </button>
          )}
        </div>
        <div className="p-4">
          {results.nationalities.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {results.nationalities.map((nationality, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200"
                >
                  {nationality}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No nationalities or countries detected</p>
          )}
        </div>
      </div>
    </div>
  );
}