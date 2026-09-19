const sections = [
  {
    title: "What is phishing?",
    body: "Phishing is a social-engineering attack that tries to collect credentials or other secrets by imitating a trusted brand, community, or coworker.",
  },
  {
    title: "How fake websites work",
    body: "A fake site copies the information architecture, colors, and language of a real community so the login form feels expected instead of suspicious.",
  },
  {
    title: "How look-alike domains work",
    body: "Attackers register names that are close enough to pass a quick glance: extra words, hyphens, or a different top-level domain.",
  },
  {
    title: "Checking the URL",
    body: "Read the full hostname before typing a password. Hover links, inspect the address bar, and confirm the domain is the one you intended to visit.",
  },
  {
    title: "HTTPS limitations",
    body: "HTTPS protects transit. It does not identify the organization behind the page. A lock icon can appear on a cloned login form.",
  },
  {
    title: "Login-page red flags",
    body: "A review page that suddenly asks for an account, a password reset you did not request, or a form that appears after a generic call to action.",
  },
  {
    title: "Domain registration information",
    body: "Recently created domains, privacy-masked ownership, and mismatched organization details are common signals on look-alike sites.",
  },
  {
    title: "Content similarity",
    body: "Familiar headlines, testimonials, and event cards lower suspicion. Similarity is a tactic, not proof of authenticity.",
  },
  {
    title: "Fuzzy domain matching",
    body: "Security tools can score domain similarity. People can do a simpler version: compare spelling, hyphens, and extra words one character at a time.",
  },
  {
    title: "What to do when you suspect phishing",
    body: "Stop. Do not submit the form. Open a known bookmark or type the official address yourself. Report the page to your team or community organizers.",
  },
];

const fictionalDomains = [
  "build2learn.in",
  "build2learn-login.example",
  "build2learn-verify.example",
  "build2learn-support.example",
];

export function LearnContent() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
          Education
        </p>
        <h1 className="mt-2 text-4xl font-semibold text-slate-950">
          Phishing Awareness
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Learn how to recognize suspicious websites before entering sensitive
          information.
        </p>

        <div className="mt-10 space-y-5">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-slate-950">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{section.body}</p>
            </article>
          ))}
        </div>

        <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-xl font-semibold text-slate-950">
            Fictional look-alike examples
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            These hostnames are fictional examples for this demonstration. They
            are not live targets and should not be used to impersonate a real
            organization.
          </p>
          <ul className="mt-4 space-y-2 font-mono text-sm text-slate-800">
            {fictionalDomains.map((domain) => (
              <li key={domain}>{domain}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
