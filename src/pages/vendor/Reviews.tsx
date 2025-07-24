import { VendorReviewCard } from '@/components/vendor/VendorReviewCard';

const Reviews = () => {
  const reviews = [
    { id: 1, reviewer: 'Ali', rating: 4, comment: 'Great product!', date: '2025-07-15' },
    { id: 2, reviewer: 'Sara', rating: 5, comment: 'Loved it!', date: '2025-07-14' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Reviews</h1>
      <div className="space-y-4">
        {reviews.map((review) => (
          <VendorReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
