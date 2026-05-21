import React from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { FileUpload } from '../ui/FileUpload';

const ProductInformation = ({ data, errors, onChange }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
        <h2 className="font-heading text-4xl text-dhaaga-primary mb-4">Product Showcase</h2>
        <p className="text-dhaaga-muted text-lg">Give us a glimpse of the exceptional products you create.</p>
      </div>
      
      <div className="space-y-2">
        <Input 
          label="Product Sub-categories (comma separated)" 
          id="subCategories" 
          value={data.subCategories}
          onChange={(e) => onChange('subCategories', e.target.value)}
          error={errors.subCategories}
          placeholder="e.g. Serums, Face Oils, Cleansers" 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <Select 
            label="Average Price Point" 
            id="pricePoint" 
            value={data.pricePoint}
            onChange={(e) => onChange('pricePoint', e.target.value)}
            error={errors.pricePoint}
            options={[
              { value: 'premium', label: 'Premium (₹2,000 - ₹5,000)' },
              { value: 'luxury', label: 'Luxury (₹5,000 - ₹15,000)' },
              { value: 'ultra-luxury', label: 'Ultra Luxury (₹15,000+)' },
            ]} 
          />
          <Select 
            label="Average Monthly Inventory" 
            id="inventorySize" 
            value={data.inventorySize}
            onChange={(e) => onChange('inventorySize', e.target.value)}
            error={errors.inventorySize}
            options={[
              { value: '0-50', label: '0 - 50 units (Made to order)' },
              { value: '50-200', label: '50 - 200 units' },
              { value: '200+', label: '200+ units' },
            ]} 
          />
        </div>
        <Input 
          label="Names of 3 Sample Products" 
          id="sampleProducts" 
          value={data.sampleProducts}
          onChange={(e) => onChange('sampleProducts', e.target.value)}
          error={errors.sampleProducts}
          placeholder="e.g. Kumkumadi Tailam, Rose Water, Sandalwood Cream" 
        />
        <FileUpload 
          label="Product Lookbook or Imagery" 
          id="productImages" 
          value={data.productImages}
          onChange={(files) => onChange('productImages', files)}
          error={errors.productImages}
          accept="image/*, application/pdf" 
          multiple={true} 
        />
      </div>
    </div>
  );
};

export default ProductInformation;
