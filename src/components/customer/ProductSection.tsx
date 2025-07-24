// src/components/home/ProductSection.tsx
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  image: string;
}

interface Props {
  title: string;
}

const ProductSection: React.FC<Props> = ({ title }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Mocked fetch — replace with real API
    const fetchProducts = async () => {
      const data = await fetch('/data/mock-products.json').then((res) => res.json());
      setProducts(data.slice(0, 4)); // Only 4 products for section
    };
    fetchProducts();
  }, []);

  return (
    <section className="px-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
