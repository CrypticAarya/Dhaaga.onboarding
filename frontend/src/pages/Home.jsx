import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Mission from '../components/Mission';
import ImpactMetrics from '../components/ImpactMetrics';
import FeaturedBrands from '../components/FeaturedBrands';
import WhyDhaaga from '../components/WhyDhaaga';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <ImpactMetrics />
        <FeaturedBrands />
        <div className="border-t border-dhaaga-border/60"></div>
        <WhyDhaaga />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
