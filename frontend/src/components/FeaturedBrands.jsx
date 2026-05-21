import React from 'react';

const brands = [
  {
    id: 1,
    name: 'Ananda',
    category: 'Skincare',
    location: 'Jaipur',
    image: '/brand_skincare.png',
  },
  {
    id: 2,
    name: 'Mitti',
    category: 'Ceramics',
    location: 'New Delhi',
    image: '/brand_ceramics.png',
  },
  {
    id: 3,
    name: 'Vanya',
    category: 'Textiles',
    location: 'Varanasi',
    image: '/brand_textile.png',
  },
  {
    id: 4,
    name: 'Amara',
    category: 'Jewelry',
    location: 'Hyderabad',
    image: '/brand_jewelry.png',
  },
  {
    id: 5,
    name: 'Oviya',
    category: 'Handcrafted Fashion',
    location: 'Mumbai',
    image: '/brand_fashion.png',
  }
];

const FeaturedBrands = () => {
  return (
    <section className="bg-transparent py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-20">
          <div>
            <h2 className="font-heading text-4xl text-dhaaga-primary mb-4">Featured Brands</h2>
            <p className="text-dhaaga-muted max-w-lg text-lg">Discover the emerging independent labels shaping modern Indian luxury through heritage and craftsmanship.</p>
          </div>
          <a href="#" className="hidden sm:inline-block text-sm font-medium text-dhaaga-accent border-b border-dhaaga-accent pb-1 hover:opacity-80 transition-opacity">
            View All Brands
          </a>
        </div>
        
        {/* Editorial Layout: First 2 cards larger, next 3 cards slightly smaller */}
        <div className="grid grid-cols-12 gap-8">
          {brands.map((brand, index) => {
            // Layout logic: First 2 cards take 6 cols (half), next 3 take 4 cols (third) on large screens
            const isTopRow = index < 2;
            const spanClass = isTopRow ? 'col-span-12 md:col-span-6' : 'col-span-12 md:col-span-4';
            const aspectClass = isTopRow ? 'aspect-[4/3]' : 'aspect-[4/5]';
            
            return (
              <div key={brand.id} className={`group cursor-pointer ${spanClass}`}>
                <div className={`relative ${aspectClass} rounded-2xl overflow-hidden mb-6 bg-dhaaga-cards border border-dhaaga-border/50 shadow-sm group-hover:shadow-lg transition-shadow duration-500`}>
                  <img 
                    src={brand.image} 
                    alt={brand.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-heading text-2xl text-dhaaga-primary group-hover:text-dhaaga-accent transition-colors">{brand.name}</h3>
                    <p className="text-xs font-medium uppercase tracking-widest text-dhaaga-muted mt-2">{brand.category}</p>
                  </div>
                  <span className="text-xs text-dhaaga-muted font-medium">{brand.location}</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center sm:hidden">
          <a href="#" className="inline-block text-sm font-medium text-dhaaga-accent border-b border-dhaaga-accent pb-1">
            View All Brands
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;
