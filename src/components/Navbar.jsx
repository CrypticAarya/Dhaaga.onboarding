import React from 'react';

const Navbar = () => {
  return (
    <nav className="border-b border-dhaaga-border sticky top-0 bg-dhaaga-bg/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <div className="w-8 h-8 rounded-full bg-dhaaga-accent flex items-center justify-center">
            <span className="text-dhaaga-cards font-heading text-lg italic">D</span>
          </div>
          <span className="font-heading text-2xl font-semibold tracking-wide text-dhaaga-primary">Dhaaga</span>
        </div>
        
        <div className="flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-dhaaga-muted hover:text-dhaaga-primary transition-colors">
            Login
          </a>
          <button className="px-6 py-2.5 bg-dhaaga-primary text-dhaaga-cards text-sm font-medium rounded-full hover:bg-dhaaga-primary/90 transition-all shadow-sm">
            Start Onboarding
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
