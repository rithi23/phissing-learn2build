import { Star } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import type { Review } from "@/types";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-1 text-orange-500" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${index < review.rating ? "fill-current" : "text-slate-200"}`}
          />
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-700">“{review.body}”</p>
      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-950">{review.author}</p>
        <p className="text-xs text-slate-500">{review.role}</p>
        <p className="mt-1 text-xs text-slate-400">
          {formatRelativeTime(review.createdAt)}
        </p>
      </div>
    </article>
  );
}
