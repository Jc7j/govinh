'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PersonalInfo from './steps/PersonalInfo';
import PropertyInfo from './steps/PropertyInfo';
import ThankYouStep from './steps/ThankYouStep';

const CommercialForm = dynamic(() => import('./steps/CommercialForm'), { ssr: false });
const ResidentialForm = dynamic(() => import('./steps/ResidentialForm'), { ssr: false });

const steps = ['Personal Info', 'Property Info', 'Additional Info', 'Thank You'];

type PropertyType = 'Residential' | 'Commercial' | '';
type Purpose = 'Primary' | 'Investment' | 'Vacation Home' | 'Family Home' | '';
type Action = 'Buy' | 'Sell' | 'Rent' | '';

interface FormData {
  // Personal Info
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;

  // Property Info
  propertyType: PropertyType;
  purpose: Purpose;
  action: Action;

  // Residential Info
  area?: string;
  bedrooms?: string;
  bathrooms?: string;
  stories?: string;
  garages?: string;
  streetAddress?: string;
  reasonForSelling?: string;
  timelineToSell?: string;

  // Commercial Info
  typeOfBusiness?: string;
  propertyGoals?: string;
  location?: string;

  // Common fields for both Residential and Commercial
  priceRange?: string;
  sqft?: string;
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
    area: '',
    bedrooms: '',
    bathrooms: '',
    stories: '',
    garages: '',
    streetAddress: '',
    reasonForSelling: '',
    timelineToSell: '',
    typeOfBusiness: '',
    propertyGoals: '',
    location: '',
    priceRange: '',
    sqft: '',
  });
  const [stepValidity, setStepValidity] = useState({
    0: false,
    1: false,
    2: false,
  });
  const [isClient, setIsClient] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const validateAdditionalInfo = () => {
    if (formData.propertyType === 'Residential') {
      if (formData.action === 'Sell') {
        return formData.streetAddress !== '' && formData.reasonForSelling !== '' && formData.timelineToSell !== '';
      } else {
        return formData.area !== '' && formData.priceRange !== '' && formData.bedrooms !== '' && formData.bathrooms !== '' && formData.sqft !== '';
      }
    } else if (formData.propertyType === 'Commercial') {
      return formData.typeOfBusiness !== '' && formData.propertyGoals !== '' && formData.priceRange !== '' && formData.sqft !== '' && formData.location !== '';
    }
    return false;
  };

  useEffect(() => {
    if (currentStep === 0) {
      setStepValidity(prev => ({ ...prev, 0: validatePersonalInfo() }));
    } else if (currentStep === 1) {
      setStepValidity(prev => ({ ...prev, 1: validatePropertyInfo() }));
    } else if (currentStep === 2) {
      setStepValidity(prev => ({ ...prev, 2: validateAdditionalInfo() }));
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
      case 3:
        return <ThankYouStep />;
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    setSubmitStatus('submitting');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitStatus('success');
        setCurrentStep(3); // Move to the Thank You step
      } else {
        const errorData = await response.json();
        console.error('Form submission failed:', errorData);
        setSubmitStatus('error');
        setErrorMessage(errorData.message || 'An error occurred while submitting the form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again.');
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
            </div>
          ))}
        </div>
        {renderStep()}
        
        {submitStatus === 'error' && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            {errorMessage || 'An error occurred. Please try again.'}
          </div>
        )}

        {currentStep < 3 && (
          <div className="mt-8 flex justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0 || submitStatus === 'submitting'}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={currentStep === steps.length - 2 ? handleSubmit : handleNext}
              disabled={!stepValidity[currentStep as keyof typeof stepValidity] || submitStatus === 'submitting'}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              {currentStep === steps.length - 2 
                ? (submitStatus === 'submitting' ? 'Submitting...' : 'Submit') 
                : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
