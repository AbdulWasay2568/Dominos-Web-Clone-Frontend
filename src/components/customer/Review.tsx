// src/components/product/ReviewForm.tsx
import React, { useState } from 'react';

const ReviewForm: React.FC = () => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState<number>(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Write your review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <div>
        <label className="mr-2">Rating:</label>
        <select value={rating} onChange={(e) => setRating(+e.target.value)} className="border p-1 rounded">
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} Star</option>
          ))}
        </select>
      </div>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
