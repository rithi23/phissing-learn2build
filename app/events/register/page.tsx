import { EventRegisterForm } from "@/components/events/EventRegisterForm";
import { EventRegisterHero } from "@/components/events/EventRegisterHero";

export default function EventRegisterPage() {
  return (
    <div className="bg-slate-50">
      <EventRegisterHero />

      <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
          <p className="text-sm font-semibold text-orange-600">WhatsApp group</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Build2Learn #38
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Scan to join the event group for updates, venue notes, and pairing.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https%3A%2F%2Fchat.whatsapp.com%2Fbuild2learn-demo"
            alt="QR code for the Build2Learn #38 WhatsApp group"
            width={220}
            height={220}
            className="mx-auto mt-6 rounded-2xl border border-slate-200 bg-white p-3"
          />
        </article>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <EventRegisterForm />
      </section>
    </div>
  );
}
