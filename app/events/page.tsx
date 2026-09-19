import { CalendarDays, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { upcomingEvents } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="text-4xl font-semibold text-slate-950">Events</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Monthly gatherings for pitching, pairing, and shipping small projects
          in a room full of builders.
        </p>
        <div className="mt-8 grid gap-5">
          {upcomingEvents.map((event) => (
            <article
              key={event.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-slate-950">
                {event.title}
              </h2>
              <div className="mt-4 flex flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:gap-6">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {event.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {event.time}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {event.location}
                </span>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                {event.description}
              </p>
              <div className="mt-5">
                <Link href="/events/register">
                  <Button>Register for event</Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
