import React from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

const BusinessDetails = ({ data, errors, onChange }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
        <h2 className="font-heading text-4xl text-dhaaga-primary mb-4">Business Details</h2>
        <p className="text-dhaaga-muted text-lg">We need a few administrative details to set up your commerce infrastructure.</p>
      </div>
      
      <div className="space-y-2">
        <Input 
          label="GST Number" 
          id="gstNumber" 
          value={data.gstNumber}
          onChange={(e) => onChange('gstNumber', e.target.value)}
          error={errors.gstNumber}
          placeholder="Enter 15-digit GSTIN" 
        />
        <Select 
          label="Business Type" 
          id="businessType" 
          value={data.businessType}
          onChange={(e) => onChange('businessType', e.target.value)}
          error={errors.businessType}
          options={[
            { value: 'proprietorship', label: 'Sole Proprietorship' },
            { value: 'partnership', label: 'Partnership / LLP' },
            { value: 'private-limited', label: 'Private Limited Company' },
          ]} 
        />
        <Select 
          label="Manufacturing Scale" 
          id="mfgScale" 
          value={data.mfgScale}
          onChange={(e) => onChange('mfgScale', e.target.value)}
          error={errors.mfgScale}
          options={[
            { value: 'small', label: 'Small Batch / Artisanal' },
            { value: 'medium', label: 'Medium Scale Production' },
            { value: 'large', label: 'Large Scale Manufacturing' },
          ]} 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <Input 
            label="City" 
            id="city" 
            value={data.city}
            onChange={(e) => onChange('city', e.target.value)}
            error={errors.city}
            placeholder="e.g. Jaipur" 
          />
          <Input 
            label="State" 
            id="state" 
            value={data.state}
            onChange={(e) => onChange('state', e.target.value)}
            error={errors.state}
            placeholder="e.g. Rajasthan" 
          />
        </div>
        <Input 
          label="Primary Warehouse / Studio Address" 
          id="address" 
          value={data.address}
          onChange={(e) => onChange('address', e.target.value)}
          error={errors.address}
          placeholder="Complete address for pickup operations" 
        />
      </div>
    </div>
  );
};

export default BusinessDetails;
