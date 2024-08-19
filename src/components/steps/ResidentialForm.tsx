import React from 'react';

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
  const renderBuyingFields = () => (
    <>
      <div>
        <label htmlFor="area" className="block mb-1 text-sm font-medium text-gray-700">Area</label>
        <select
          id="area"
          name="area"
          value={formData.area || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          required
        >
          <option value="">Select area</option>
          <option value="Henderson">Henderson</option>
          <option value="Summerlin">Summerlin</option>
          <option value="West">West</option>
          <option value="Southwest">Southwest</option>
          <option value="South">South</option>
          <option value="North">North</option>
          <option value="Northwest">Northwest</option>
          <option value="North East">North East</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="priceRange" className="block mb-1 text-sm font-medium text-gray-700">Price Range</label>
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
      <div>
        <label htmlFor="bedrooms" className="block mb-1 text-sm font-medium text-gray-700">Bedrooms</label>
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
        <label htmlFor="bathrooms" className="block mb-1 text-sm font-medium text-gray-700">Bathrooms</label>
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
      <div>
        <label htmlFor="sqft" className="block mb-1 text-sm font-medium text-gray-700">Square Feet</label>
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
        <label htmlFor="stories" className="block mb-1 text-sm font-medium text-gray-700">Number of Stories</label>
        <select
          id="stories"
          name="stories"
          value={formData.stories || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          required
        >
          <option value="">Select number of stories</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div>
        <label htmlFor="garages" className="block mb-1 text-sm font-medium text-gray-700">Number of Garages</label>
        <select
          id="garages"
          name="garages"
          value={formData.garages || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          required
        >
          <option value="">Select number of garages</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
    </>
  );

  const renderSellingFields = () => (
    <>
      <div>
        <label htmlFor="streetAddress" className="block mb-1 text-sm font-medium text-gray-700">Street Address</label>
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
        <label htmlFor="reasonForSelling" className="block mb-1 text-sm font-medium text-gray-700">Reason for Selling</label>
        <select
          id="reasonForSelling"
          name="reasonForSelling"
          value={formData.reasonForSelling || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          required
        >
          <option value="">Select reason for selling</option>
          <option value="Buying Another home">Buying Another home</option>
          <option value="Relocating to another city">Relocating to another city</option>
          <option value="Selling to get out of the market">Selling to get out of the market</option>
          <option value="Selling to upgrade investment">Selling to upgrade investment</option>
        </select>
      </div>
      <div>
        <label htmlFor="timelineToSell" className="block mb-1 text-sm font-medium text-gray-700">Timeline to Sell</label>
        <select
          id="timelineToSell"
          name="timelineToSell"
          value={formData.timelineToSell || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          required
        >
          <option value="">Select timeline to sell</option>
          <option value="ASAP">ASAP</option>
          <option value="Within 1-2 months">Within 1-2 months</option>
          <option value="3-4 months">3-4 months</option>
          <option value="5-6 months">5-6 months</option>
          <option value="Long-Term Plan">Long-Term Plan</option>
        </select>
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
