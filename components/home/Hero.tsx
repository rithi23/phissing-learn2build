import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_32%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <Link
          href="/events/register"
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
        >
          <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
            Upcoming
          </span>
          Build2Learn #38 Meetup · September 19 · Register
        </Link>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Build. Learn.
          <br />
          Collaborate.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          A community for developers, builders and learners who want to turn
          ideas into real-world projects.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/register">
            <Button size="lg" className="w-full sm:w-auto">
              Join the Community
            </Button>
          </Link>
          <Link href="/reviews">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Explore Reviews
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
