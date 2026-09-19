"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#community", label: "Community" },
  { href: "/reviews", label: "Reviews" },
  { href: "/events", label: "Events" },
  { href: "/learn", label: "Learn" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isReveal = pathname.startsWith("/security-demo") || pathname.startsWith("/admin");

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md",
        isReveal
          ? "border-amber-500/20 bg-zinc-950/90"
          : "border-white/10 bg-slate-950/85",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-white">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-sm text-white">
            B2
          </span>
          Build2Learn
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm text-slate-300 transition-colors hover:text-white",
                pathname === item.href && "text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="inline-flex h-11 items-center rounded-xl px-5 text-sm font-semibold text-slate-200 hover:bg-white/10"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="inline-flex h-11 items-center rounded-xl bg-orange-500 px-5 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Join Community
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="rounded-xl px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              Sign In
            </Link>
            <Link href="/register" onClick={() => setOpen(false)}>
              <Button className="w-full">Join Community</Button>
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
