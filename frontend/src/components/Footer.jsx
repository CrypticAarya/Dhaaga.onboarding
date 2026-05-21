import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#15130F] text-dhaaga-cards py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16">
          <div className="md:col-span-5 pr-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                <span className="text-white font-heading text-xl italic">D</span>
              </div>
              <span className="font-heading text-3xl font-semibold tracking-wide text-white">Dhaaga</span>
            </div>
            <p className="text-white/60 text-base leading-relaxed max-w-sm mb-8 font-light">
              India’s modern luxury commerce platform for homegrown brands. Elevating craftsmanship with visibility and premium fulfillment infrastructure.
            </p>
          </div>
          
          <div className="md:col-span-2 md:col-start-8">
            <h4 className="font-heading text-lg mb-6 text-white/90">Platform</h4>
            <ul className="space-y-4 text-sm text-white/50 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Start Onboarding</a></li>
              <li><a href="#" className="hover:text-white transition-colors">For Brands</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="font-heading text-lg mb-6 text-white/90">Company</h4>
            <ul className="space-y-4 text-sm text-white/50 font-light">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/40 font-light">
          <p>&copy; {new Date().getFullYear()} Dhaaga Technologies. All rights reserved.</p>
          <div className="flex gap-8 mt-6 md:mt-0 uppercase tracking-widest text-[10px]">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
