import Image from "next/image";

const Reviews = async ({ productId }: { productId: string }) => {
  const reviewRes = await fetch(
    `https://api.fera.ai/v3/public/reviews?product.id=${productId}&public_key=${process.env.NEXT_PUBLIC_FERA_ID}`
  );

  if (!reviewRes.ok) return <p>Failed to load reviews.</p>;

  const reviews = await reviewRes.json();

  if (!reviews?.data || reviews.data.length === 0)
    return <p>No reviews available.</p>;

  return (
    <div className="flex flex-col gap-6">
      {reviews.data.map((review: any) => (
        <div className="flex flex-col gap-4" key={review.id}>
          {/* USER */}
          {review.customer && (
            <div className="flex items-center gap-4 font-medium">
              <Image
                src={review.customer.avatar_url || "/default-avatar.png"}
                alt={review.customer.display_name || "User Avatar"}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>{review.customer.display_name || "Anonymous"}</span>
            </div>
          )}
          {/* STARS */}
          <div className="flex gap-2">
            {Array.from({ length: review.rating || 0 }).map((_, index) => (
              <Image
                src="/star.png"
                alt="Star"
                key={index}
                width={16}
                height={16}
              />
            ))}
          </div>
          {/* DESC */}
          {review.heading && <p>{review.heading}</p>}
          {review.body && <p>{review.body}</p>}
          {/* MEDIA */}
          {review.media?.length > 0 && (
            <div className="flex gap-2">
              {review.media.map((media: any) => (
                <Image
                  src={media.url}
                  key={media.id}
                  alt="Review media"
                  width={100}
                  height={50}
                  className="object-cover"
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Reviews;
