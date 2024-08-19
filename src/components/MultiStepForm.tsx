'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PersonalAndPropertyInfo, { PersonalAndPropertyData, validatePersonalAndPropertyInfo } from './steps/PersonalAndPropertyInfo';

const CommercialForm = dynamic(() => import('./steps/CommercialForm'), { ssr: false });
const ResidentialForm = dynamic(() => import('./steps/ResidentialForm'), { ssr: false });

const steps = ['Bike and size', 'Groupset', 'Components', 'Services'];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PersonalAndPropertyData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    propertyType: '' as 'Residential' | 'Commercial',
    purpose: '' as 'Primary' | 'Investment' | 'Vacation Home' | 'Family Home',
    action: '' as 'Buy' | 'Sell' | 'Rent',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PersonalAndPropertyData, string>>>({});
  const [isValid, setIsValid] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const newErrors = validatePersonalAndPropertyInfo(formData);
    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [formData]);

  const handleNext = () => {
    if (isValid) {
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
        return <PersonalAndPropertyInfo formData={formData} handleInputChange={handleInputChange} />;
      case 1:
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
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">What can we help with?</h2>
        <div className="mb-8 flex justify-between">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              {index < currentStep && (
                <span className="mr-2 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
              <span
                className={`font-medium ${
                  index === currentStep ? 'text-black' : index < currentStep ? 'text-green-500' : 'text-gray-400'
                }`}
              >
                {index + 1}. {step}
              </span>
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
            Cancel
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1 || !isValid}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
