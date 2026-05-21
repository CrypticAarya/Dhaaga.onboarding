import React from 'react';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { FileUpload } from '../ui/FileUpload';

const BrandIdentity = ({ data, errors, onChange }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
        <h2 className="font-heading text-4xl text-dhaaga-primary mb-4">Brand Identity</h2>
        <p className="text-dhaaga-muted text-lg">Tell us about the heritage and vision behind your brand.</p>
      </div>
      
      <div className="space-y-2">
        <Input 
          label="Brand Name" 
          id="brandName" 
          value={data.brandName}
          onChange={(e) => onChange('brandName', e.target.value)}
          error={errors.brandName}
          placeholder="e.g. Ananda Skincare" 
        />
        <Input 
          label="Founder Name" 
          id="founderName" 
          value={data.founderName}
          onChange={(e) => onChange('founderName', e.target.value)}
          error={errors.founderName}
          placeholder="Full Name" 
        />
        <Select 
          label="Brand Category" 
          id="brandCategory" 
          value={data.brandCategory}
          onChange={(e) => onChange('brandCategory', e.target.value)}
          error={errors.brandCategory}
          options={[
            { value: 'fashion', label: 'Handcrafted Fashion' },
            { value: 'jewelry', label: 'Fine & Demi-Fine Jewelry' },
            { value: 'skincare', label: 'Luxury Skincare & Wellness' },
            { value: 'textiles', label: 'Heritage Textiles' },
            { value: 'ceramics', label: 'Ceramics & Home' },
          ]} 
        />
        <Textarea 
          label="Brand Story" 
          id="brandStory" 
          value={data.brandStory}
          onChange={(e) => onChange('brandStory', e.target.value)}
          error={errors.brandStory}
          placeholder="What inspired you to start this journey?" 
        />
        <FileUpload 
          label="Brand Logo" 
          id="brandLogo" 
          value={data.brandLogo}
          onChange={(files) => onChange('brandLogo', files)}
          error={errors.brandLogo}
          accept="image/png, image/jpeg, image/svg+xml" 
        />
      </div>
    </div>
  );
};

export default BrandIdentity;
