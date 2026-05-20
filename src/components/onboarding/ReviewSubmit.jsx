import React from 'react';

const ReviewSubmit = ({ data, onEditStep }) => {
  const formatValue = (val) => val || <span className="text-dhaaga-muted/50 italic">Not provided</span>;

  const sections = [
    { 
      title: 'Brand Identity', 
      step: 1, 
      fields: { 
        'Brand Name': formatValue(data.brandName), 
        'Founder Name': formatValue(data.founderName),
        'Category': formatValue(data.brandCategory) 
      } 
    },
    { 
      title: 'Business Details', 
      step: 2, 
      fields: { 
        'GST Number': formatValue(data.gstNumber),
        'Business Type': formatValue(data.businessType), 
        'Location': (data.city || data.state) ? `${data.city}, ${data.state}` : formatValue('') 
      } 
    },
    { 
      title: 'Product Information', 
      step: 3, 
      fields: { 
        'Avg Price Point': formatValue(data.pricePoint), 
        'Inventory': formatValue(data.inventorySize) 
      } 
    },
    { 
      title: 'Delivery & Operations', 
      step: 4, 
      fields: { 
        'Delivery Zones': formatValue(data.deliveryZones), 
        'Same-Day': data.sameday === 'yes' ? 'Yes, offering' : 'Needs Dhaaga Network' 
      } 
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
        <h2 className="font-heading text-4xl text-dhaaga-primary mb-4">Review Application</h2>
        <p className="text-dhaaga-muted text-lg">Please ensure all details are correct before submitting your partnership request.</p>
      </div>

      <div className="space-y-8 mb-12">
        {sections.map((section, index) => (
          <div key={index} className="pb-8 border-b border-dhaaga-border last:border-0 last:pb-0">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading text-xl text-dhaaga-primary">{section.title}</h3>
              <button 
                onClick={() => onEditStep(section.step)} 
                className="text-sm font-medium text-dhaaga-accent border-b border-transparent hover:border-dhaaga-accent transition-colors"
              >
                Edit Details
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              {Object.entries(section.fields).map(([key, value]) => (
                <div key={key}>
                  <p className="text-xs uppercase tracking-widest text-dhaaga-muted mb-1">{key}</p>
                  <p className="text-dhaaga-primary font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-dhaaga-cards p-8 rounded-xl border border-dhaaga-border text-center">
        <h4 className="font-heading text-xl text-dhaaga-primary mb-3">Ready to shape the future of modern commerce?</h4>
        <p className="text-dhaaga-muted text-sm mb-6 max-w-md mx-auto">
          By submitting this application, our curation team will review your brand and reach out within 48 hours.
        </p>
        <button className="px-8 py-4 w-full sm:w-auto bg-dhaaga-accent text-dhaaga-cards font-medium rounded-full hover:bg-dhaaga-accent/90 transition-all shadow-md hover:shadow-lg">
          Submit Application
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmit;
