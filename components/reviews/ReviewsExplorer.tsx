"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Star } from "lucide-react";
import { reviews, ratingSummary } from "@/lib/data";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ReviewCategory } from "@/types";

const pageSize = 6;

const categories: Array<{ value: "all" | ReviewCategory; label: string }> = [
  { value: "all", label: "All" },
  { value: "community", label: "Community" },
  { value: "events", label: "Events" },
  { value: "mentorship", label: "Mentorship" },
  { value: "projects", label: "Projects" },
];

export function ReviewsExplorer() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]["value"]>(
    "all",
  );
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const next = reviews.filter((review) => {
      const matchesQuery =
        review.author.toLowerCase().includes(query.toLowerCase()) ||
        review.body.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "all" || review.category === category;
      return matchesQuery && matchesCategory;
    });

    next.sort((a, b) => {
      if (sort === "highest") return b.rating - a.rating;
      if (sort === "lowest") return a.rating - b.rating;
      return a.createdAt < b.createdAt ? 1 : -1;
    });

    return next;
  }, [query, category, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-slate-950">
            Community Reviews
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-slate-600">
            <span className="inline-flex items-center gap-1 text-orange-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" />
              ))}
            </span>
            <span className="font-semibold text-slate-950">
              {ratingSummary.average}
            </span>
            <span>{ratingSummary.total.toLocaleString()} reviews</span>
          </div>
          <p className="mt-3 text-slate-600">
            What our community members are saying
          </p>
        </div>
        <Button onClick={() => router.push("/login?redirect=/reviews/write")}>
          Write a Review
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-slate-950">
            Rating distribution
          </p>
          <div className="mt-4 space-y-3">
            {ratingSummary.distribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-2 text-xs">
                <span className="w-8 text-slate-500">{item.stars}★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-orange-500"
                    style={{
                      width: `${(item.count / ratingSummary.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="space-y-5">
          <div className="grid gap-3 md:grid-cols-[1fr_160px_160px]">
            <div className="relative">
              <Search className="pointer-events-none absolute top-3.5 left-3 h-4 w-4 text-slate-400" />
              <Input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="Search reviews"
                aria-label="Search reviews"
                className="pl-9"
              />
            </div>
            <select
              aria-label="Filter by category"
              value={category}
              onChange={(event) => {
                setCategory(event.target.value as typeof category);
                setPage(1);
              }}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm"
            >
              {categories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            <select
              aria-label="Sort reviews"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm"
            >
              <option value="newest">Newest</option>
              <option value="highest">Highest rated</option>
              <option value="lowest">Lowest rated</option>
            </select>
          </div>

          {visible.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              No reviews match that search.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {visible.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Page {currentPage} of {pageCount}
            </p>
            <div className="flex gap-2">
              <Button
                variant="dark"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
              >
                Previous
              </Button>
              <Button
                variant="dark"
                size="sm"
                disabled={currentPage === pageCount}
                onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
