import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-3xl font-semibold text-white">
          Ready to build something?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-300">
          Join the community.
        </p>
        <div className="mt-6">
          <Link href="/register">
            <Button size="lg">Join Build2Learn</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
