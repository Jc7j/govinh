import React from 'react';

interface PropertyTypeProps {
  formData: {
    propertyType: string;
    purpose: string;
    action: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function PropertyType({ formData, handleInputChange }: PropertyTypeProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Property Type</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="propertyType" className="block mb-1">Residential or Commercial?</label>
          <select
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select...</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>
        <div>
          <label htmlFor="purpose" className="block mb-1">Purpose</label>
          <select
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select...</option>
            <option value="Primary">Primary</option>
            <option value="Investment">Investment</option>
            <option value="Vacation Home">Vacation Home</option>
            <option value="Family Home">Family Home</option>
          </select>
        </div>
        <div>
          <label htmlFor="action" className="block mb-1">Buy, Sell, or Rent</label>
          <select
            id="action"
            name="action"
            value={formData.action}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select...</option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
            <option value="Rent">Rent</option>
          </select>
        </div>
      </div>
    </div>
  );
}
