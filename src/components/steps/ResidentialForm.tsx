import React from 'react';
import SelectCard from '../SelectCard';

interface ResidentialFormProps {
  formData: {
    action: string;
    area?: string;
    priceRange?: string;
    bedrooms?: string;
    bathrooms?: string;
    sqft?: string;
    stories?: string;
    garages?: string;
    streetAddress?: string;
    reasonForSelling?: string;
    timelineToSell?: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function ResidentialForm({ formData, handleInputChange }: ResidentialFormProps) {
  const handleSelectChange = (field: string) => (value: string) => {
    handleInputChange({ target: { name: field, value } } as React.ChangeEvent<HTMLSelectElement>);
  };

  const renderBuyingFields = () => (
    <>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Area <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['Henderson', 'Summerlin', 'West', 'Southwest', 'South', 'North', 'Northwest', 'North East', 'Other'].map((area) => (
            <SelectCard
              key={area}
              label={area}
              value={area}
              isSelected={formData.area === area}
              onChange={handleSelectChange('area')}
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
          placeholder="e.g. $200,000 - $300,000"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="bedrooms" className="block mb-2 text-sm font-medium text-gray-700">
            Bedrooms <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms || ''}
            onChange={handleInputChange}
            placeholder="Number of bedrooms"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            required
          />
        </div>
        <div>
          <label htmlFor="bathrooms" className="block mb-2 text-sm font-medium text-gray-700">
            Bathrooms <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms || ''}
            onChange={handleInputChange}
            placeholder="Number of bathrooms"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            required
          />
        </div>
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
          Number of Stories <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-4">
          {['1', '2', '3'].map((story) => (
            <SelectCard
              key={story}
              label={story}
              value={story}
              isSelected={formData.stories === story}
              onChange={handleSelectChange('stories')}
            />
          ))}
        </div>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Number of Garages <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-4">
          {['1', '2', '3'].map((garage) => (
            <SelectCard
              key={garage}
              label={garage}
              value={garage}
              isSelected={formData.garages === garage}
              onChange={handleSelectChange('garages')}
            />
          ))}
        </div>
      </div>
    </>
  );

  const renderSellingFields = () => (
    <>
      <div>
        <label htmlFor="streetAddress" className="block mb-2 text-sm font-medium text-gray-700">
          Street Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="streetAddress"
          name="streetAddress"
          value={formData.streetAddress || ''}
          onChange={handleInputChange}
          placeholder="Enter your street address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Reason for Selling <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['Buying Another home', 'Relocating to another city', 'Selling to get out of the market', 'Selling to upgrade investment'].map((reason) => (
            <SelectCard
              key={reason}
              label={reason}
              value={reason}
              isSelected={formData.reasonForSelling === reason}
              onChange={handleSelectChange('reasonForSelling')}
            />
          ))}
        </div>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Timeline to Sell <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          {['ASAP', 'Within 1-2 months', '3-4 months', '5-6 months', 'Long-Term Plan'].map((timeline) => (
            <SelectCard
              key={timeline}
              label={timeline}
              value={timeline}
              isSelected={formData.timelineToSell === timeline}
              onChange={handleSelectChange('timelineToSell')}
            />
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Residential Property Details</h2>
      <p className="text-gray-600 mb-6">Please provide details about the residential property.</p>
      <div className="space-y-6">
        {formData.action === 'Buy' && renderBuyingFields()}
        {formData.action === 'Sell' && renderSellingFields()}
        {formData.action === 'Rent' && renderBuyingFields()}
      </div>
    </div>
  );
}
