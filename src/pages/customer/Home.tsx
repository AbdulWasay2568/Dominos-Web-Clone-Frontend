import React from 'react';
import HeroBanner from '../../components/customer/HeroBanner';
import FeaturedCategories from '../../components/customer/FeaturedCategories';
import ProductSection from '../../components/customer/ProductSection';

const Home: React.FC = () => {
  return (
    <div className="space-y-8">
      <HeroBanner />
      <FeaturedCategories />
      <ProductSection title="Best Sellers" />
      <ProductSection title="Trending Products" />
      {/* Add more sections if needed */}
    </div>
  );
};

export default Home;
