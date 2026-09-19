import { NextResponse } from "next/server";
import { reviews } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() ?? "";
  const category = searchParams.get("category");

  const filtered = reviews.filter((review) => {
    const matchesQuery =
      !query ||
      review.author.toLowerCase().includes(query) ||
      review.body.toLowerCase().includes(query);
    const matchesCategory = !category || category === "all" || review.category === category;
    return matchesQuery && matchesCategory;
  });

  return NextResponse.json({
    reviews: filtered,
    total: filtered.length,
  });
}
