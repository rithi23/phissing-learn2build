import Link from "next/link";
import { Globe, Mail, MessageCircle, Share2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <p className="text-lg font-semibold text-white">Build2Learn</p>
          <p className="max-w-sm text-sm leading-6">
            A community where people come together to build ideas, learn new
            skills, and collaborate on practical projects.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-white">Links</p>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="/reviews" className="hover:text-white">
              Reviews
            </Link>
            <Link href="/events" className="hover:text-white">
              Events
            </Link>
            <Link href="/learn" className="hover:text-white">
              Learn
            </Link>
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-white">Connect with us</p>
          <div className="flex gap-3">
            <span className="rounded-full border border-white/10 p-2" aria-hidden>
              <Globe className="h-4 w-4" />
            </span>
            <span className="rounded-full border border-white/10 p-2" aria-hidden>
              <Share2 className="h-4 w-4" />
            </span>
            <span className="rounded-full border border-white/10 p-2" aria-hidden>
              <MessageCircle className="h-4 w-4" />
            </span>
            <span className="rounded-full border border-white/10 p-2" aria-hidden>
              <Mail className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:px-6">
          <p>© 2026 Build2Learn demo. Fictional community content.</p>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">
            Security Awareness Demo
          </span>
        </div>
      </div>
    </footer>
  );
}
