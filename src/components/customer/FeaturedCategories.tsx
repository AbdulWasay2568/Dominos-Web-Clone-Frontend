// src/components/home/FeaturedCategories.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Electronics', image: 'https://unsplash.it/400/300?random=1' },
  { name: 'Fashion', image: 'https://unsplash.it/400/300?random=2' },
  { name: 'Books', image: 'https://unsplash.it/400/300?random=3' },
];

const FeaturedCategories: React.FC = () => {
  return (
    <section className="px-6">
      <h2 className="text-2xl font-semibold mb-4">Featured Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            to={`/products/${cat.name.toLowerCase()}`}
            key={cat.name}
            className="rounded-lg overflow-hidden group"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-32 w-full object-cover group-hover:scale-105 transition"
            />
            <p className="text-center mt-2 font-medium">{cat.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
