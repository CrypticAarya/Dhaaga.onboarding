import React from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';

const DeliveryOperations = ({ data, errors, onChange }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
        <h2 className="font-heading text-4xl text-dhaaga-primary mb-4">Delivery & Operations</h2>
        <p className="text-dhaaga-muted text-lg">Define how your luxury products reach your customers.</p>
      </div>
      
      <div className="space-y-2">
        <Select 
          label="Current Delivery Zones" 
          id="deliveryZones" 
          value={data.deliveryZones}
          onChange={(e) => onChange('deliveryZones', e.target.value)}
          error={errors.deliveryZones}
          options={[
            { value: 'local', label: 'Local City Only' },
            { value: 'state', label: 'Statewide' },
            { value: 'national', label: 'Pan-India' },
            { value: 'international', label: 'Global Shipping' },
          ]} 
        />
        
        <div className="mb-8 relative">
          <label className="block font-heading text-lg text-dhaaga-primary mb-4">Same-Day Delivery Capability</label>
          <div className="flex gap-4">
            <label className="flex-1 cursor-pointer">
              <input 
                type="radio" 
                name="sameday" 
                className="peer sr-only" 
                value="yes" 
                checked={data.sameday === 'yes'}
                onChange={(e) => onChange('sameday', e.target.value)}
              />
              <div className="p-4 border border-dhaaga-border rounded-xl text-center peer-checked:border-dhaaga-accent peer-checked:bg-dhaaga-accent/5 text-dhaaga-muted peer-checked:text-dhaaga-primary transition-all">
                Yes, currently offering
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input 
                type="radio" 
                name="sameday" 
                className="peer sr-only" 
                value="no" 
                checked={data.sameday === 'no'}
                onChange={(e) => onChange('sameday', e.target.value)}
              />
              <div className="p-4 border border-dhaaga-border rounded-xl text-center peer-checked:border-dhaaga-accent peer-checked:bg-dhaaga-accent/5 text-dhaaga-muted peer-checked:text-dhaaga-primary transition-all">
                No, need Dhaaga's network
              </div>
            </label>
          </div>
          {errors.sameday && <p className="absolute -bottom-5 left-0 text-xs text-red-500 font-medium">{errors.sameday}</p>}
        </div>

        <Input 
          label="Packaging Preferences" 
          id="packaging" 
          value={data.packaging}
          onChange={(e) => onChange('packaging', e.target.value)}
          error={errors.packaging}
          placeholder="e.g. Eco-friendly, Custom branded boxes" 
        />
        <Textarea 
          label="Standard Return Policy" 
          id="returnPolicy" 
          value={data.returnPolicy}
          onChange={(e) => onChange('returnPolicy', e.target.value)}
          error={errors.returnPolicy}
          placeholder="Briefly describe your policy for returns and exchanges." 
        />
      </div>
    </div>
  );
};

export default DeliveryOperations;
