import React from 'react';

interface CommercialFormProps {
  formData: {
    action: string;
    purpose?: string;
    commercialType?: string;
    priceRange?: string;
    sqft?: string;
    location?: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function CommercialForm({ formData, handleInputChange }: CommercialFormProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Commercial Property Details</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="purpose" className="block mb-1">Purpose</label>
          <select
            id="purpose"
            name="purpose"
            value={formData.purpose || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select...</option>
            <option value="Personal Business">Personal Business</option>
            <option value="Investment">Investment</option>
          </select>
        </div>
        <div>
          <label htmlFor="commercialType" className="block mb-1">Commercial Type</label>
          <select
            id="commercialType"
            name="commercialType"
            value={formData.commercialType || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select...</option>
            <option value="Shopping Center">Shopping Center</option>
            <option value="Retail">Retail</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Multifamily">Multifamily</option>
            <option value="Office">Office</option>
            <option value="Warehouse">Warehouse</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="priceRange" className="block mb-1">Price Range</label>
          <input
            type="text"
            id="priceRange"
            name="priceRange"
            value={formData.priceRange || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="sqft" className="block mb-1">Square Feet</label>
          <input
            type="number"
            id="sqft"
            name="sqft"
            value={formData.sqft || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block mb-1">Location</label>
          <select
            id="location"
            name="location"
            value={formData.location || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select...</option>
            <option value="Summerlin">Summerlin</option>
            <option value="Henderson">Henderson</option>
            <option value="North">North</option>
            <option value="West">West</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="Southwest">Southwest</option>
            <option value="Northwest">Northwest</option>
          </select>
        </div>
      </div>
    </div>
  );
}
