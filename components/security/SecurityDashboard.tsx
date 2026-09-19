import Link from "next/link";
import {
  AlertTriangle,
  Globe,
  Lock,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const analysis = [
  { label: "Domain Similarity", value: "HIGH" },
  { label: "Content Similarity", value: "HIGH" },
  { label: "Login Form", value: "DETECTED" },
  { label: "Credential Collection", value: "SIMULATED" },
  { label: "External Authentication", value: "NOT CONNECTED" },
];

const indicators = [
  {
    title: "1. Look-alike domain",
    body: "Attackers register domains that resemble a trusted community or product so the address looks familiar at a glance.",
  },
  {
    title: "2. Login request",
    body: "Unexpected login prompts, especially after a simple action like writing a review, should be treated carefully.",
  },
  {
    title: "3. Page similarity",
    body: "Cloned layouts, familiar navigation, and community language can make a phishing page feel official.",
  },
  {
    title: "4. Urgency",
    body: "Attackers often add time pressure so people submit credentials before they inspect the URL or sender.",
  },
  {
    title: "5. HTTPS",
    body: "A lock icon only means the connection is encrypted. It does not prove that the website is legitimate.",
  },
];

export function SecurityDashboard() {
  return (
    <div className="bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6 sm:p-8">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300">
            <AlertTriangle className="h-4 w-4" />
            Simulation reveal
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            ⚠️ Security Awareness Simulation
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-200">
            You just interacted with a simulated phishing website.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <ShieldCheck className="mb-3 h-5 w-5 text-emerald-400" />
              <p className="font-medium">No password was stored or transmitted.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <ShieldAlert className="mb-3 h-5 w-5 text-amber-300" />
              <p className="font-medium">
                Your interaction was recorded only for this hackathon
                demonstration.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Domain Analysis</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {analysis.map((item) => (
              <article
                key={item.label}
                className="rounded-2xl border border-white/10 bg-zinc-900 p-4"
              >
                <p className="text-xs tracking-wide text-zinc-400 uppercase">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-amber-300">
                  {item.value}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Indicators</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {indicators.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-zinc-900 p-5"
              >
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/learn">
            <Button className="w-full sm:w-auto">Continue to education</Button>
          </Link>
          <Link href="/admin">
            <Button variant="outline" className="w-full sm:w-auto">
              Open admin dashboard
            </Button>
          </Link>
        </div>

        <div className="mt-8 flex items-center gap-3 text-sm text-zinc-500">
          <Globe className="h-4 w-4" />
          <Lock className="h-4 w-4" />
          Familiar branding and HTTPS can appear together on a fake site.
        </div>
      </div>
    </div>
  );
}
