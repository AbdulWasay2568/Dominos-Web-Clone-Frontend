import React from 'react';

const ProductImageGallery: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <div>
      <img src={images[0]} alt="Main" className="w-full h-96 object-cover rounded-lg" />
      <div className="flex mt-4 gap-3">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx}`}
            className="w-20 h-20 object-cover rounded-md border hover:border-indigo-500"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
