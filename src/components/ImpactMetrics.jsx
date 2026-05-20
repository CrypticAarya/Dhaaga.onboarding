import React from 'react';

const metrics = [
  { value: "100+", label: "Homegrown Brands" },
  { value: "25+", label: "Cities" },
  { value: "Same-Day", label: "Fulfillment" },
  { value: "Built for", label: "Indian Commerce" },
];

const ImpactMetrics = () => {
  return (
    <section className="border-y border-dhaaga-border py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-dhaaga-border">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center px-4">
              <p className="font-heading text-3xl text-dhaaga-primary mb-2">{metric.value}</p>
              <p className="text-sm font-medium uppercase tracking-widest text-dhaaga-muted">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
