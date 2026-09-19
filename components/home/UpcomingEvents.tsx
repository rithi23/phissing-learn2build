import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { upcomingEvents } from "@/lib/data";

export function UpcomingEvents() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
          Upcoming Events
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">
          Next gatherings
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {upcomingEvents.map((event) => (
            <article
              key={event.id}
              className="rounded-2xl border border-slate-200 p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-950">{event.title}</h3>
              <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <CalendarDays className="h-4 w-4" />
                {event.date}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4" />
                {event.location}
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {event.description}
              </p>
            </article>
          ))}
        </div>
        <Link
          href="/events"
          className="mt-6 inline-block text-sm font-semibold text-orange-600"
        >
          Browse all events
        </Link>
      </div>
    </section>
  );
}
