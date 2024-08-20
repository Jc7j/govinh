'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PersonalInfo from './steps/PersonalInfo';
import PropertyInfo from './steps/PropertyInfo';

const CommercialForm = dynamic(() => import('./steps/CommercialForm'), { ssr: false });
const ResidentialForm = dynamic(() => import('./steps/ResidentialForm'), { ssr: false });

const steps = ['Personal Info', 'Property Info', 'Additional Info'];

type PropertyType = 'Residential' | 'Commercial' | '';
type Purpose = 'Primary' | 'Investment' | 'Vacation Home' | 'Family Home' | '';
type Action = 'Buy' | 'Sell' | 'Rent' | '';

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  propertyType: PropertyType;
  purpose: Purpose;
  action: Action;
}

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    propertyType: '',
    purpose: '',
    action: '',
  });
  const [stepValidity, setStepValidity] = useState({
    0: false,
    1: false,
    2: true, // Assuming the last step doesn't need validation
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const validatePersonalInfo = () => {
    const { firstName, lastName, phoneNumber, email } = formData;
    return firstName.trim() !== '' && lastName.trim() !== '' && phoneNumber.trim() !== '' && email.trim() !== '';
  };

  const validatePropertyInfo = () => {
    const { propertyType, purpose, action } = formData;
    return propertyType !== '' && purpose !== '' && action !== '';
  };

  useEffect(() => {
    if (currentStep === 0) {
      setStepValidity(prev => ({ ...prev, 0: validatePersonalInfo() }));
    } else if (currentStep === 1) {
      setStepValidity(prev => ({ ...prev, 1: validatePropertyInfo() }));
    }
  }, [formData, currentStep]);

  const handleNext = () => {
    if (stepValidity[currentStep as keyof typeof stepValidity]) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderStep = () => {
    if (!isClient) return null;

    switch (currentStep) {
      case 0:
        return <PersonalInfo formData={formData} handleInputChange={handleInputChange} />;
      case 1:
        return <PropertyInfo formData={formData} handleInputChange={handleInputChange} />;
      case 2:
        return formData.propertyType === 'Residential' ? (
          <ResidentialForm formData={formData} handleInputChange={handleInputChange} />
        ) : (
          <CommercialForm formData={formData} handleInputChange={handleInputChange} />
        );
      default:
        return null;
    }
  };

  if (!isClient) return null;

  return (
    <div className="md:w-[640px] max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 sm:p-6">
        <h2 className="text-md text-center font-semibold mb-4 text-gray-800">What can we help with?</h2>
        <hr className="mb-4" />
        <div className="mb-8 flex justify-center space-x-4">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-4 h-4 rounded-full ${
                  index === currentStep ? 'bg-blue-500' : index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
              {/* <span className="text-xs mt-1 text-gray-500">{step}</span> */}
            </div>
          ))}
        </div>
        {renderStep()}
        <div className="mt-8 flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1 || !stepValidity[currentStep as keyof typeof stepValidity]}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
