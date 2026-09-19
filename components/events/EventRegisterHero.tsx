import { CalendarDays, Clock, MapPin } from "lucide-react";

export function EventRegisterHero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm font-semibold tracking-[0.18em] text-slate-400 uppercase">
          Community meetup
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
          build2learn.
          <span className="block text-slate-500">
            where innovation meets community
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Register for Build2Learn #38 and spend a Saturday building with
          students, mentors, and working professionals.
        </p>

        <div className="mt-8 grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
              Event
            </p>
            <p className="mt-2 font-semibold text-slate-950">
              Build2Learn #38 Meetup
            </p>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Saturday, September 19, 2026
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              9:30 AM - 2:00 PM IST
            </p>
          </div>
          <p className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="h-4 w-4" />
            Ideas2IT Technologies
          </p>
        </div>
      </div>
    </section>
  );
}
