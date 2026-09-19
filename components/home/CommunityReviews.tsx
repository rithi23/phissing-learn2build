import Link from "next/link";
import { reviews } from "@/lib/data";
import { ReviewCard } from "@/components/reviews/ReviewCard";

export function CommunityReviews() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
              Community Reviews
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              What members are saying
            </h2>
          </div>
          <Link href="/reviews" className="hidden text-sm font-semibold text-orange-600 sm:block">
            View all reviews
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {reviews.slice(0, 4).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
