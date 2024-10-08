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

const ResidentialForm: React.FC<ResidentialFormProps> = ({ formData, handleInputChange }) => {
  const handleSelectChange = (field: string) => (value: string) => {
    handleInputChange({ target: { name: field, value } } as React.ChangeEvent<HTMLInputElement>);
  };

  const areaOptions = ['Henderson', 'Summerlin', 'West', 'Southwest', 'South', 'North', 'Northwest', 'North East', 'Other'];
  const storiesOptions = ['1', '2', '3'];
  const garagesOptions = ['1', '2', '3'];

  const renderBuyingOrRentingFields = () => (
    <>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Area <span className="text-red-500">*</span></label>
        <div className="grid md:grid-cols-3 gap-2">
          {areaOptions.map((area) => (
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
        <label htmlFor="priceRange" className="block mb-1 text-sm font-medium text-gray-700">
          {formData.action === 'Rent/Lease' ? 'Monthly Rent' : 'Price Range'} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="priceRange"
          name="priceRange"
          value={formData.priceRange || ''}
          onChange={handleInputChange}
          placeholder={formData.action === 'Rent/Lease' ? 'e.g., $1,500 per month' : 'e.g., $200,000 - $300,000'}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          required
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="bedrooms" className="block mb-1 text-sm font-medium text-gray-700">
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
          <label htmlFor="bathrooms" className="block mb-1 text-sm font-medium text-gray-700">
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
        <label htmlFor="sqft" className="block mb-1 text-sm font-medium text-gray-700">
          Square Feet <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="sqft"
          name="sqft"
          value={formData.sqft || ''}
          onChange={handleInputChange}
          placeholder="Property size in square feet"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">How Many Stories <span className="text-red-500">*</span></label>
        <div className="grid md:grid-cols-3 gap-2">
          {storiesOptions.map((story) => (
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
        <label className="block mb-2 text-sm font-medium text-gray-700">How Many Garages <span className="text-red-500">*</span></label>
        <div className="grid md:grid-cols-3 gap-2">
          {garagesOptions.map((garage) => (
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
        <label htmlFor="streetAddress" className="block mb-1 text-sm font-medium text-gray-700">
          Street Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="streetAddress"
          name="streetAddress"
          value={formData.streetAddress || ''}
          onChange={handleInputChange}
          placeholder="Enter your address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Reason for Selling <span className="text-red-500">*</span></label>
        <div className="grid md:grid-cols-2 gap-2">
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
        <label className="block mb-2 text-sm font-medium text-gray-700">Timeline to Sell <span className="text-red-500">*</span></label>
        <div className="grid md:grid-cols-2 gap-2">
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
    <div className="space-y-8">
      <div className="space-y-2">
      <h2 className="text-2xl font-bold text-gray-900">
        {formData.action === 'Sell' && 'Residential Selling Details'}
        {formData.action === 'Buy' && 'Residential Buying Details'}
        {formData.action === 'Rent' && 'Residential Renting Details'}
      </h2>
      {formData.action === 'Sell' && (
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
          Help us understand your property and your reasons for selling.
        </p>
      )}
      {formData.action === 'Buy' && (
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
          Help us find the perfect home for you by specifying your preferences.
        </p>
      )}
      {formData.action === 'Rent' && (
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
          Help us find the perfect rental property for you by specifying your preferences.
        </p>
      )}
      </div>
      {formData.action === 'Sell' ? renderSellingFields() : renderBuyingOrRentingFields()}
    </div>
  );
};

export default ResidentialForm;
