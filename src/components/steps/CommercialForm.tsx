import React from 'react';
import SelectCard from '../SelectCard';

interface CommercialFormProps {
  formData: {
    typeOfBusiness?: string;
    propertyGoals?: string;
    purpose?: string;
    priceRange?: string;
    sqft?: string;
    location?: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function CommercialForm({ formData, handleInputChange }: CommercialFormProps) {
  const handleSelectChange = (field: string) => (value: string) => {
    handleInputChange({ target: { name: field, value } } as React.ChangeEvent<HTMLSelectElement>);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Commercial Property Details</h2>
      <p className="text-gray-600 mb-6">Please provide details about the commercial property.</p>
      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Type of Business <span className="text-red-500">*</span>
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            {['Restaurant', 'Office', 'Retail', 'Warehouse', 'Land', 'Multifamily', 'Other'].map((type) => (
              <SelectCard
                key={type}
                label={type}
                value={type}
                isSelected={formData.typeOfBusiness === type}
                onChange={handleSelectChange('typeOfBusiness')}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Property Goals <span className="text-red-500">*</span>
          </label>
          <div className="grid md:grid-cols-3 gap-4">
            {['Buy', 'Sell', 'Lease'].map((goal) => (
              <SelectCard
                key={goal}
                label={goal}
                value={goal}
                isSelected={formData.propertyGoals === goal}
                onChange={handleSelectChange('propertyGoals')}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Purpose <span className="text-red-500">*</span>
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            {['Personal Business', 'Investment'].map((purpose) => (
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
          <label htmlFor="priceRange" className="block mb-2 text-sm font-medium text-gray-700">
            Price Range <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="priceRange"
            name="priceRange"
            value={formData.priceRange || ''}
            onChange={handleInputChange}
            placeholder="e.g. $500,000 - $1,000,000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            required
          />
        </div>
        <div>
          <label htmlFor="sqft" className="block mb-2 text-sm font-medium text-gray-700">
            Square Feet <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="sqft"
            name="sqft"
            value={formData.sqft || ''}
            onChange={handleInputChange}
            placeholder="Total square feet"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Location <span className="text-red-500">*</span>
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            {['Summerlin', 'Henderson', 'North', 'West', 'South', 'East', 'Southwest', 'Northwest'].map((location) => (
              <SelectCard
                key={location}
                label={location}
                value={location}
                isSelected={formData.location === location}
                onChange={handleSelectChange('location')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
