'use client';

import { FileText, Globe, Users, Building2, MapPin, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { AnalysisResult, GeopoliticalEntities } from '@/types/model';

interface ResultsDisplayProps {
  results: AnalysisResult;
}

interface EntitySectionProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  colorClass: string;
  bgColorClass: string;
  borderColorClass: string;
  copyKey: string;
  copiedStates: Record<string, boolean>;
  onCopy: (text: string, key: string) => void;
}

function EntitySection({ 
  title, 
  items, 
  icon, 
  colorClass, 
  bgColorClass, 
  borderColorClass, 
  copyKey,
  copiedStates,
  onCopy 
}: EntitySectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({items.length} found)
            </span>
          </h3>
        </div>
        {items.length > 0 && (
          <button
            onClick={() => onCopy(items.join(', '), copyKey)}
            className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            {copiedStates[copyKey] ? (
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
        {items.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {items.map((item, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${bgColorClass} ${colorClass} ${borderColorClass} border`}
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No {title.toLowerCase()} detected</p>
        )}
      </div>
    </div>
  );
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const entitySections = [
    {
      title: 'Countries',
      items: results?.geopolitical_entities?.countries || [],
      icon: <Globe className="h-5 w-5 text-blue-500" />,
      colorClass: 'text-blue-800',
      bgColorClass: 'bg-blue-100',
      borderColorClass: 'border-blue-200',
      copyKey: 'countries'
    },
    {
      title: 'Nationalities',
      items: results?.geopolitical_entities?.nationalities || [],
      icon: <MapPin className="h-5 w-5 text-green-500" />,
      colorClass: 'text-green-800',
      bgColorClass: 'bg-green-100',
      borderColorClass: 'border-green-200',
      copyKey: 'nationalities'
    },
    {
      title: 'People',
      items: results?.geopolitical_entities?.people || [],
      icon: <Users className="h-5 w-5 text-purple-500" />,
      colorClass: 'text-purple-800',
      bgColorClass: 'bg-purple-100',
      borderColorClass: 'border-purple-200',
      copyKey: 'people'
    },
    {
      title: 'Organizations',
      items: results?.geopolitical_entities?.organizations || [],
      icon: <Building2 className="h-5 w-5 text-orange-500" />,
      colorClass: 'text-orange-800',
      bgColorClass: 'bg-orange-100',
      borderColorClass: 'border-orange-200',
      copyKey: 'organizations'
    }
  ];

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
            onClick={() => copyToClipboard(results?.summary || '', 'summary')}
            className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            {copiedStates.summary ? (
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
          {results?.summary ? (
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {results.summary}
            </p>
          ) : (
            <p className="text-gray-500 italic">No summary generated</p>
          )}
        </div>
      </div>

      {/* Geopolitical Entities Sections */}
      {entitySections.map((section) => (
        <EntitySection
          key={section.copyKey}
          title={section.title}
          items={section.items}
          icon={section.icon}
          colorClass={section.colorClass}
          bgColorClass={section.bgColorClass}
          borderColorClass={section.borderColorClass}
          copyKey={section.copyKey}
          copiedStates={copiedStates}
          onCopy={copyToClipboard}
        />
      ))}
    </div>
  );
}