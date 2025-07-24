interface VendorReviewCardProps {
  review: {
    reviewer: string;
    rating: number;
    comment: string;
    date: string;
  };
}

export const VendorReviewCard = ({ review }: VendorReviewCardProps) => {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <div className="flex justify-between">
        <h3 className="font-semibold">{review.reviewer}</h3>
        <span className="text-sm text-gray-500">{review.date}</span>
      </div>
      <div className="text-yellow-500 mb-1">
        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
};
