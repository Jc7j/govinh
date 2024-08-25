import React from 'react';
import SelectCard from '../SelectCard';

type PropertyType = 'Residential' | 'Commercial' | '';
type Purpose = 'Primary' | 'Investment' | 'Vacation Home' | 'Family Home' | '';
type Action = 'Buy' | 'Sell' | 'Rent' | '';

interface PropertyInfoProps {
  formData: {
    propertyType: PropertyType;
    purpose: Purpose;
    action: Action;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function PropertyInfo({ formData, handleInputChange }: PropertyInfoProps) {
  const handleSelectChange = (field: string) => (value: string) => {
    handleInputChange({ target: { name: field, value } } as React.ChangeEvent<HTMLSelectElement>);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Property Information</h2>
      <p className="text-gray-600 mb-6">Select whether you need assistance with residential or commercial properties, specify the goals of the property, and the action you need assistance with.</p>
      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Residential or Commercial? <span className="text-red-500">*</span>
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            <SelectCard
              label="Residential"
              value="Residential"
              isSelected={formData.propertyType === 'Residential'}
              onChange={handleSelectChange('propertyType')}
            />
            <SelectCard
              label="Commercial"
              value="Commercial"
              isSelected={formData.propertyType === 'Commercial'}
              onChange={handleSelectChange('propertyType')}
            />
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Purpose <span className="text-red-500">*</span>
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            {['Primary', 'Investment', 'Vacation Home', 'Family Home'].map((purpose) => (
              <SelectCard
                key={purpose}
                label={purpose}
                value={purpose}
                isSelected={formData.purpose === purpose}
                onChange={handleSelectChange('purpose')}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Buy, Sell, or Rent <span className="text-red-500">*</span>
          </label>
          <div className="grid md:grid-cols-3 gap-4">
            {['Buy', 'Sell', 'Rent'].map((action) => (
              <SelectCard
                key={action}
                label={action}
                value={action}
                isSelected={formData.action === action}
                onChange={handleSelectChange('action')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
