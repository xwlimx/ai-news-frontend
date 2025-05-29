'use client';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function TextInput({ value, onChange, disabled, placeholder }: TextInputProps) {
  return (
    <div className="w-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder || "Paste your news article text here..."}
        className={`
          w-full h-64 p-4 border border-gray-300 rounded-lg resize-none
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          transition-colors duration-200 box-border
          ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-white'}
        `}
        maxLength={50000}
      />
      <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
        <span>Maximum 50,000 characters</span>
        <span>{value.length.toLocaleString()} / 50,000</span>
      </div>
    </div>
  );
}