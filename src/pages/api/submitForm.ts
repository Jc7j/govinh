import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID is not set');
    }

    const properties: any = {
      // Personal Info
      Name: {
        title: [{ text: { content: `${formData.firstName} ${formData.lastName}` } }],
      },
      'Phone Number': { phone_number: formData.phoneNumber },
      Email: { email: formData.email },

      // Property Info
      'Property Type': formData.propertyType ? { select: { name: formData.propertyType } } : undefined,
      Purpose: formData.purpose ? { select: { name: formData.purpose } } : undefined,
      Action: formData.action ? { select: { name: formData.action } } : undefined,

      // Common fields
      'Price Range': formData.priceRange ? { rich_text: [{ text: { content: formData.priceRange } }] } : undefined,
      'Square Feet': formData.sqft ? { number: parseInt(formData.sqft) } : undefined,
    };

    if (formData.propertyType === 'Residential') {
      if (formData.action === 'Sell') {
        if (formData.streetAddress) properties['Street Address'] = { rich_text: [{ text: { content: formData.streetAddress } }] };
        if (formData.reasonForSelling) properties['Reason for Selling'] = { select: { name: formData.reasonForSelling } };
        if (formData.timelineToSell) properties['Timeline to Sell'] = { select: { name: formData.timelineToSell } };
      } else {
        // This covers both 'Buy' and 'Rent/Lease' actions
        if (formData.area) properties['Area'] = { select: { name: formData.area } };
        if (formData.bedrooms) properties['Bedrooms'] = { number: parseInt(formData.bedrooms) };
        if (formData.bathrooms) properties['Bathrooms'] = { number: parseInt(formData.bathrooms) };
        if (formData.stories) properties['Stories'] = { number: parseInt(formData.stories) };
        if (formData.garages) properties['Garages'] = { number: parseInt(formData.garages) };
        
        // Rename 'Price Range' to 'Monthly Rent' for 'Rent/Lease' action
        if (formData.action === 'Rent/Lease') {
          properties['Monthly Rent'] = properties['Price Range'];
          delete properties['Price Range'];
        }
      }
    } else if (formData.propertyType === 'Commercial') {
      if (formData.typeOfBusiness) properties['Type of Business'] = { select: { name: formData.typeOfBusiness } };
      if (formData.propertyGoals) properties['Property Goals'] = { select: { name: formData.propertyGoals } };
      if (formData.location) properties['Location'] = { select: { name: formData.location } };
      
      // Update 'Purpose' field (already exists in common fields)
      if (formData.purpose) properties['Purpose'] = { select: { name: formData.purpose } };
      
      // Ensure 'Action' field is set based on 'Property Goals'
      if (formData.propertyGoals) {
        properties['Action'] = { select: { name: formData.propertyGoals } };
      }
    }

    // Remove any undefined properties
    Object.keys(properties).forEach(key => properties[key] === undefined && delete properties[key]);


    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: properties,
    });
    
    console.log("New row created in Notion table:", response.id);
    res.status(200).json({ message: 'Form submitted successfully', response });
  } catch (error: any) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Error submitting form', error: error.message });
  }
}
