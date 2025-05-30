'use client';

import { useState } from 'react';
import { FileText, Globe } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import TextInput from '@/components/TextInput';
import LoadingSpinner from '@/components/LoadingSpinner';
import ResultsDisplay from '@/components/ResultsDisplay';
import ErrorDisplay from '@/components/ErrorDisplay';
import { ApiService } from '@/services/api';
import { AnalysisResult, ApiError } from '@/types/model';

type InputMode = 'text' | 'file';

export default function HomePage() {
  const [inputMode, setInputMode] = useState<InputMode>('text');
  const [textInput, setTextInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setResults(null);
    setIsLoading(true);

    try {
      let analysisResults: AnalysisResult;
      
      if (inputMode === 'file' && selectedFile) {
        analysisResults = await ApiService.analyzeArticle(undefined, selectedFile);
      } else if (inputMode === 'text') {
		const trimmedText = textInput.trim();
		if (trimmedText.length < 50) {
			throw new Error('Text input must be at least 50 characters long.');
		}
        analysisResults = await ApiService.analyzeArticle(textInput.trim());
      } else {
        throw new Error('Please provide either text input or select a file');
      }

      setResults(analysisResults);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const canSubmit = () => {
    if (inputMode === 'text') {
      return textInput.trim().length > 0;
    }
    return selectedFile !== null;
  };

  const resetForm = () => {
    setTextInput('');
    setSelectedFile(null);
    setResults(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            News Article Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your news articles to get AI-powered summaries and <br />
			extract mentions of different nationalities and countries.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          {/* Input Mode Toggle */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setInputMode('text')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                inputMode === 'text'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Text Input
            </button>
            <button
              onClick={() => setInputMode('file')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                inputMode === 'file'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              File Upload
            </button>
          </div>

          {/* Input Section */}
          <div className="mb-6">
            {inputMode === 'text' ? (
              <TextInput
                value={textInput}
                onChange={setTextInput}
                disabled={isLoading}
                placeholder="Paste your news article text here..."
              />
            ) : (
              <FileUpload
                onFileSelect={setSelectedFile}
                selectedFile={selectedFile}
                disabled={isLoading}
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleSubmit}
              disabled={!canSubmit() || isLoading}
              className={`
                px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200
                ${canSubmit() && !isLoading
                  ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg'
                  : 'bg-gray-400 cursor-not-allowed'
                }
              `}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Article'}
            </button>
          </div>

          {/* Results Section */}
          <div className="mt-8">
            {isLoading && (
              <LoadingSpinner message="Analyzing your article..." />
            )}

            {error && (
              <ErrorDisplay 
                message={error} 
                onRetry={handleSubmit}
              />
            )}

            {results && !isLoading && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Analysis Results</h2>
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                  >
                    Analyze Another
                  </button>
                </div>
                <ResultsDisplay results={results} />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Powered by OpenAI GPT • Built with Next.js and FastAPI</p>
        </div>
      </div>
    </div>
  );
}