import { Hammer, GraduationCap, Users } from "lucide-react";

const items = [
  {
    title: "Build Together",
    icon: Hammer,
    body: "Turn ideas into working prototypes through collaborative development, pairing, and weekend hackathons.",
  },
  {
    title: "Learn By Doing",
    icon: GraduationCap,
    body: "Gain practical skills through workshops, mentorship, and real-world projects instead of isolated tutorials.",
  },
  {
    title: "Connect & Network",
    icon: Users,
    body: "Meet builders, students, and working professionals at monthly community events that continue after the room empties.",
  },
];

export function Mission() {
  return (
    <section id="community" className="bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <item.icon className="mb-4 h-6 w-6 text-orange-500" />
            <h2 className="text-xl font-semibold text-slate-950">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
