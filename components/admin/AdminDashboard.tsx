"use client";

import { useEffect, useMemo, useState } from "react";
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
import { formatDateTime } from "@/lib/utils";
import type { ParticipantInteraction } from "@/types";

const pieColors = ["#f97316", "#0f172a", "#64748b"];

export function AdminDashboard() {
  const [records, setRecords] = useState<ParticipantInteraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/participants");
        if (!response.ok) throw new Error("Failed");
        const payload = (await response.json()) as {
          records: ParticipantInteraction[];
        };
        setRecords(payload.records);
      } catch {
        setError("Unable to load demo statistics.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

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
    <div className="bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          Simulation data only. No passwords are stored.
        </div>
        <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">
          Security Awareness Dashboard
        </h1>

        {loading ? (
          <p className="mt-8 text-zinc-400">Loading demo statistics...</p>
        ) : error ? (
          <p className="mt-8 text-red-300">{error}</p>
        ) : (
          <>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Total Participants" value={stats.total} />
              <StatCard label="Login Attempts" value={stats.loginAttempts} />
              <StatCard label="Registrations" value={stats.registrations} />
              <StatCard
                label="Password Fields Entered"
                value={stats.passwordFields}
              />
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <section className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
                <h2 className="mb-4 font-semibold">Interactions over time</h2>
                <div className="h-64">
                  {stats.timeline.length === 0 ? (
                    <EmptyChart />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.timeline}>
                        <CartesianGrid stroke="#27272a" vertical={false} />
                        <XAxis dataKey="name" stroke="#a1a1aa" />
                        <YAxis allowDecimals={false} stroke="#a1a1aa" />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f97316" radius={6} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </section>
              <section className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
                <h2 className="mb-4 font-semibold">Login vs Register</h2>
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

            <section className="mt-5 rounded-2xl border border-white/10 bg-zinc-900 p-5">
              <h2 className="mb-4 font-semibold">
                Password-field interaction count
              </h2>
              <p className="text-4xl font-semibold text-orange-400">
                {stats.passwordFields}
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                Count of forms where a password was typed. The password itself is
                discarded immediately.
              </p>
            </section>

            <section className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-white/10 text-zinc-400">
                  <tr>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Action</th>
                    <th className="px-4 py-3 font-medium">Password Entered</th>
                    <th className="px-4 py-3 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {records.length === 0 ? (
                    <tr>
                      <td className="px-4 py-8 text-zinc-500" colSpan={5}>
                        No participant interactions yet.
                      </td>
                    </tr>
                  ) : (
                    records.map((record) => (
                      <tr key={record.id} className="border-t border-white/5">
                        <td className="px-4 py-3">{record.name || "—"}</td>
                        <td className="px-4 py-3">{record.email || "—"}</td>
                        <td className="px-4 py-3">{record.action}</td>
                        <td className="px-4 py-3">
                          {record.passwordEntered
                            ? `YES · Length: ${record.passwordLength ?? 0}`
                            : "NO"}
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
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </article>
  );
}

function EmptyChart() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-zinc-500">
      Charts appear after the first demo interaction.
    </div>
  );
}
