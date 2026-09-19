"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formatDateTime } from "@/lib/utils";
import { adminLoginSchema, type AdminLoginValues } from "@/lib/validations";
import type { EventRegistration, ParticipantInteraction } from "@/types";

const pieColors = ["#f97316", "#0f172a", "#64748b"];

export function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [events, setEvents] = useState<EventRegistration[]>([]);
  const [records, setRecords] = useState<ParticipantInteraction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const [eventRes, participantRes] = await Promise.all([
        fetch("/api/event-registrations"),
        fetch("/api/participants"),
      ]);
      if (!eventRes.ok) throw new Error("Failed");
      const eventPayload = (await eventRes.json()) as {
        records: EventRegistration[];
      };
      const participantPayload = participantRes.ok
        ? ((await participantRes.json()) as { records: ParticipantInteraction[] })
        : { records: [] };
      setEvents(eventPayload.records);
      setRecords(participantPayload.records);
    } catch {
      setError("Unable to load admin data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    fetch("/api/admin/session")
      .then((response) => response.json())
      .then(async (payload: { authenticated: boolean }) => {
        if (cancelled) return;
        setAuthenticated(payload.authenticated);
        if (payload.authenticated) {
          await loadData();
        }
      })
      .catch(() => {
        if (!cancelled) setAuthenticated(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (authenticated === null) {
    return (
      <div className="bg-slate-50 px-4 py-16 text-center text-slate-500">
        Checking admin session...
      </div>
    );
  }

  if (!authenticated) {
    return (
      <AdminLoginForm
        onSuccess={() => {
          setAuthenticated(true);
          void loadData();
        }}
      />
    );
  }

  return (
    <div className="bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Event registrations
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Details submitted from the Build2Learn #38 register page.
            </p>
          </div>
          <LogoutButton onLoggedOut={() => setAuthenticated(false)} />
        </div>

        {loading ? (
          <p className="mt-8 text-slate-500">Loading registrations...</p>
        ) : error ? (
          <p className="mt-8 text-red-600">{error}</p>
        ) : (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <StatCard label="Event signups" value={events.length} light />
              <StatCard
                label="Students"
                value={events.filter((item) => item.role === "Student").length}
                light
              />
              <StatCard
                label="Professionals"
                value={
                  events.filter((item) => item.role === "Working professional")
                    .length
                }
                light
              />
            </div>

            <section className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Phone</th>
                    <th className="px-4 py-3 font-medium">Organization</th>
                    <th className="px-4 py-3 font-medium">Role</th>
                    <th className="px-4 py-3 font-medium">Skills</th>
                    <th className="px-4 py-3 font-medium">Idea</th>
                    <th className="px-4 py-3 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {events.length === 0 ? (
                    <tr>
                      <td className="px-4 py-8 text-slate-500" colSpan={8}>
                        No event registrations yet.
                      </td>
                    </tr>
                  ) : (
                    events.map((record) => (
                      <tr key={record.id} className="border-t border-slate-100">
                        <td className="px-4 py-3 font-medium">{record.fullName}</td>
                        <td className="px-4 py-3">{record.email}</td>
                        <td className="px-4 py-3">{record.phone}</td>
                        <td className="px-4 py-3">{record.organization}</td>
                        <td className="px-4 py-3">{record.role}</td>
                        <td className="px-4 py-3">{record.skills || "—"}</td>
                        <td className="max-w-xs truncate px-4 py-3">
                          {record.projectIdea || "—"}
                        </td>
                        <td className="px-4 py-3">
                          {formatDateTime(record.createdAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </section>

            <SecurityStats records={records} />
          </>
        )}
      </div>
    </div>
  );
}

function AdminLoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: { username: "", password: "" },
  });

  async function onSubmit(values: AdminLoginValues) {
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        toast.error("Invalid admin credentials");
        return;
      }
      toast.success("Signed in as admin");
      onSuccess();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-slate-50">
      <div className="mx-auto flex min-h-[60vh] max-w-md items-center px-4 py-16">
        <form
          className="w-full space-y-5 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div>
            <h1 className="text-2xl font-semibold text-slate-950">Admin login</h1>
            <p className="mt-2 text-sm text-slate-600">
              Use the demo credentials to view event registrations.
            </p>
          </div>
          <Field id="username" label="Username" error={errors.username?.message}>
            <Input id="username" autoComplete="username" {...register("username")} />
          </Field>
          <Field id="password" label="Password" error={errors.password?.message}>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
            />
          </Field>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function LogoutButton({ onLoggedOut }: { onLoggedOut: () => void }) {
  return (
    <Button
      variant="dark"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        onLoggedOut();
      }}
    >
      Sign out
    </Button>
  );
}

function SecurityStats({ records }: { records: ParticipantInteraction[] }) {
  const stats = useMemo(() => {
    const loginAttempts = records.filter((item) => item.action === "LOGIN").length;
    const registrations = records.filter(
      (item) => item.action === "REGISTER",
    ).length;
    const passwordFields = records.filter((item) => item.passwordEntered).length;
    const sessions = new Set(records.map((item) => item.sessionId));
    const byHour = new Map<string, number>();
    for (const item of records) {
      const label = new Date(item.createdAt).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });
      byHour.set(label, (byHour.get(label) ?? 0) + 1);
    }

    return {
      total: sessions.size || records.length,
      loginAttempts,
      registrations,
      passwordFields,
      timeline: Array.from(byHour, ([name, count]) => ({ name, count })),
      mix: [
        { name: "Login", value: loginAttempts },
        { name: "Register", value: registrations },
        {
          name: "Reset",
          value: records.filter((item) => item.action === "PASSWORD_RESET").length,
        },
      ],
    };
  }, [records]);

  return (
    <div className="mt-16">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Simulation data only. No passwords are stored.
      </div>
      <h2 className="mt-6 text-2xl font-semibold">Security awareness</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Participants" value={stats.total} light />
        <StatCard label="Login Attempts" value={stats.loginAttempts} light />
        <StatCard label="Registrations" value={stats.registrations} light />
        <StatCard label="Password Fields Entered" value={stats.passwordFields} light />
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 font-semibold">Interactions over time</h3>
          <div className="h-64">
            {stats.timeline.length === 0 ? (
              <EmptyChart />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.timeline}>
                  <CartesianGrid stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis allowDecimals={false} stroke="#64748b" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#f97316" radius={6} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 font-semibold">Login vs Register</h3>
          <div className="h-64">
            {records.length === 0 ? (
              <EmptyChart />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.mix}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={80}
                  >
                    {stats.mix.map((item, index) => (
                      <Cell
                        key={item.name}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  light,
}: {
  label: string;
  value: number;
  light?: boolean;
}) {
  return (
    <article
      className={
        light
          ? "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          : "rounded-2xl border border-white/10 bg-zinc-900 p-5"
      }
    >
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </article>
  );
}

function EmptyChart() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-slate-500">
      Charts appear after the first demo interaction.
    </div>
  );
}
