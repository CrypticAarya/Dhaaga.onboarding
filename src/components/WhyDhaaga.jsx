import React from 'react';
import { Sparkles, Package, Building2, Globe2 } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="w-5 h-5 text-dhaaga-accent" strokeWidth={1.5} />,
    title: 'Preserve Craftsmanship',
    description: 'We handle the commerce infrastructure so you can focus entirely on preserving your brand identity and heritage craftsmanship.',
  },
  {
    icon: <Building2 className="w-5 h-5 text-dhaaga-accent" strokeWidth={1.5} />,
    title: 'Build Brand Identity',
    description: 'Elegant, customizable storefronts that reflect the true luxury positioning of your products, free from cluttered templates.',
  },
  {
    icon: <Globe2 className="w-5 h-5 text-dhaaga-accent" strokeWidth={1.5} />,
    title: 'Nationwide Reach',
    description: 'Curated visibility that connects your local artisanal products with a premium, high-intent audience across India.',
  },
  {
    icon: <Package className="w-5 h-5 text-dhaaga-accent" strokeWidth={1.5} />,
    title: 'Commerce Infrastructure',
    description: 'Frictionless checkout, premium packaging integrations, and a logistics network optimized for high-value goods.',
  }
];

const WhyDhaaga = () => {
  return (
    <section className="py-32 max-w-7xl mx-auto px-6">
      <div className="text-center mb-24 max-w-2xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl text-dhaaga-primary mb-6">Built for Excellence</h2>
        <p className="text-dhaaga-muted text-lg leading-relaxed">
          The end-to-end modern infrastructure designed exclusively for the unique needs of homegrown luxury brands.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {features.map((feature, index) => (
          <div key={index} className="flex gap-6 group">
            <div className="shrink-0 w-12 h-12 rounded-full border border-dhaaga-border flex items-center justify-center bg-dhaaga-cards group-hover:border-dhaaga-accent/30 transition-colors duration-500">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-heading text-2xl text-dhaaga-primary mb-3">{feature.title}</h3>
              <p className="text-base text-dhaaga-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyDhaaga;
