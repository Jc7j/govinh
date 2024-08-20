import React from 'react';

interface SelectCardProps {
  label: string;
  value: string;
  isSelected: boolean;
  onChange: (value: string) => void;
}

export default function SelectCard({ label, value, isSelected, onChange }: SelectCardProps) {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'
      }`}
      onClick={() => onChange(value)}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-900">{label}</span>
        <div
          className={`w-4 h-4 rounded-full ${
            isSelected ? 'bg-blue-500' : 'border-2 border-gray-300'
          }`}
        />
      </div>
    </div>
  );
}
