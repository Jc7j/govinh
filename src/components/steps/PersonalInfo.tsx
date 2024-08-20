import React from 'react';

interface PersonalInfoProps {
  formData: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PersonalInfo({ formData, handleInputChange }: PersonalInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">Personal Information</h2>
      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Please provide your details so we can reach out to you.</p>
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
      </div>
    </div>
  );
}
