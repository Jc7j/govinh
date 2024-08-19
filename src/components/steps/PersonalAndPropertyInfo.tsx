import React from 'react';
import { z } from 'zod';

const personalAndPropertySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  propertyType: z.enum(["Residential", "Commercial"], { required_error: "Property type is required" }),
  purpose: z.enum(["Primary", "Investment", "Vacation Home", "Family Home"], { required_error: "Purpose is required" }),
  action: z.enum(["Buy", "Sell", "Rent"], { required_error: "Action is required" }),
});

export type PersonalAndPropertyData = z.infer<typeof personalAndPropertySchema>;

interface PersonalAndPropertyInfoProps {
  formData: PersonalAndPropertyData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function validatePersonalAndPropertyInfo(data: PersonalAndPropertyData) {
  try {
    personalAndPropertySchema.parse(data);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.flatten().fieldErrors;
    }
    return {};
  }
}

export default function PersonalAndPropertyInfo({ formData, handleInputChange }: PersonalAndPropertyInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Personal Information</h2>
      <p className="text-gray-600 mb-6">Please provide your personal details so we can reach out to you.</p>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block mb-1 text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="John"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-1 text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="(123) 456-7890"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="johndoe@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            required
          />
        </div>
        <div>
          <label htmlFor="propertyType" className="block mb-1 text-sm font-medium text-gray-700">Residential or Commercial?</label>
          <select
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            required
          >
            <option value="">Select property type</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>
        <div>
          <label htmlFor="purpose" className="block mb-1 text-sm font-medium text-gray-700">Purpose</label>
          <select
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            required
          >
            <option value="">Select purpose</option>
            <option value="Primary">Primary</option>
            <option value="Investment">Investment</option>
            <option value="Vacation Home">Vacation Home</option>
            <option value="Family Home">Family Home</option>
          </select>
        </div>
        <div>
          <label htmlFor="action" className="block mb-1 text-sm font-medium text-gray-700">Buy, Sell, or Rent</label>
          <select
            id="action"
            name="action"
            value={formData.action}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            required
          >
            <option value="">Select action</option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
            <option value="Rent">Rent</option>
          </select>
        </div>
      </div>
    </div>
  );
}
