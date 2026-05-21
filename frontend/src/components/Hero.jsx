import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-24 pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-dhaaga-border mb-8">
            <span className="w-2 h-2 rounded-full bg-dhaaga-accent"></span>
            <span className="text-xs font-medium uppercase tracking-wider text-dhaaga-muted">The New Standard</span>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl leading-[1.15] text-dhaaga-primary mb-6">
            Built for Indian brands shaping the future of craftsmanship.
          </h1>
          <p className="text-lg text-dhaaga-muted leading-relaxed mb-10 max-w-md">
            Dhaaga helps homegrown brands grow with modern commerce, onboarding infrastructure, and nationwide visibility.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link to="/onboarding" className="w-full sm:w-auto px-8 py-3.5 bg-dhaaga-accent text-dhaaga-cards text-sm font-medium rounded-full hover:bg-dhaaga-accent/90 transition-all shadow-sm flex items-center justify-center gap-2">
              Start Onboarding <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-dhaaga-border text-dhaaga-primary text-sm font-medium rounded-full hover:bg-dhaaga-border/30 transition-all flex items-center justify-center">
              Explore Platform
            </button>
          </div>
        </div>

        {/* Image Preview */}
        <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src="/hero_preview.png" 
            alt="Modern Indian Luxury Fashion Editorial" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <p className="font-heading text-xl font-medium mb-1">Raw Elegance</p>
            <p className="text-sm text-white/80 font-light">Featured collection on Dhaaga</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
