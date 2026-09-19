import type { CommunityEvent, FeaturedProject, Review } from "@/types";

export const featuredProjects: FeaturedProject[] = [
  {
    id: "harbor-notes",
    title: "HarborNotes",
    summary:
      "A shared workspace for meetup notes, action items, and follow-up tasks after community build sessions.",
    stack: ["Next.js", "Postgres", "Tailwind"],
    stage: "Prototype",
  },
  {
    id: "pulse-board",
    title: "PulseBoard",
    summary:
      "Lightweight standup and pairing board for weekend hackathons, with roles, blockers, and demo slots.",
    stack: ["TypeScript", "Prisma", "Zod"],
    stage: "In progress",
  },
  {
    id: "civic-map",
    title: "CivicMap",
    summary:
      "Neighborhood issue map that lets volunteers log civic problems and track community-led fixes.",
    stack: ["React", "Maps", "Node"],
    stage: "Demo-ready",
  },
  {
    id: "skill-swap",
    title: "SkillSwap",
    summary:
      "Peer tutoring board where developers trade one-hour mentoring sessions on tools they already use.",
    stack: ["Next.js", "Auth demo", "Charts"],
    stage: "Concept",
  },
];

export const upcomingEvents: CommunityEvent[] = [
  {
    id: "react-meetup",
    title: "React Community Meetup",
    date: "September 27, 2026",
    time: "10:00 AM - 1:00 PM IST",
    location: "Community Studio, Chennai",
    description:
      "A half-day session for component patterns, pairing, and live reviews of community projects.",
  },
  {
    id: "ai-apps",
    title: "Building AI-powered applications",
    date: "October 11, 2026",
    time: "9:30 AM - 2:00 PM IST",
    location: "Innovation Hall",
    description:
      "Hands-on workshop on shipping small AI features without losing product focus or security basics.",
  },
  {
    id: "oss-sprint",
    title: "Open Source Sprint Night",
    date: "October 25, 2026",
    time: "5:00 PM - 8:30 PM IST",
    location: "Maker Space",
    description:
      "Bring an issue, join a table, and leave with a pull request and a short demo.",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    author: "Arun Kumar",
    role: "Developer",
    rating: 5,
    category: "projects",
    createdAt: "2026-09-17T08:00:00.000Z",
    body: "Great place to meet developers and work on real projects.",
  },
  {
    id: "r2",
    author: "Meera Iyer",
    role: "Product Designer",
    rating: 5,
    category: "community",
    createdAt: "2026-09-14T11:20:00.000Z",
    body: "The room energy is practical. People actually sit down and ship instead of only talking about ideas.",
  },
  {
    id: "r3",
    author: "Rahul Desai",
    role: "Student",
    rating: 4,
    category: "mentorship",
    createdAt: "2026-09-10T16:40:00.000Z",
    body: "I joined a table with two working engineers and left with a clearer plan for my portfolio project.",
  },
  {
    id: "r4",
    author: "Sana Farooq",
    role: "Frontend Engineer",
    rating: 5,
    category: "events",
    createdAt: "2026-09-06T09:10:00.000Z",
    body: "The meetup format is tight and useful. Pitch, build, demo. No unused panels.",
  },
  {
    id: "r5",
    author: "Vikram Nair",
    role: "Backend Engineer",
    rating: 4,
    category: "projects",
    createdAt: "2026-08-30T13:00:00.000Z",
    body: "Good mix of beginners and experienced people. I found collaborators for a weekend prototype.",
  },
  {
    id: "r6",
    author: "Priya Menon",
    role: "Community Volunteer",
    rating: 5,
    category: "community",
    createdAt: "2026-08-22T18:15:00.000Z",
    body: "Welcoming without being chaotic. New people get a table, a brief, and someone to pair with.",
  },
  {
    id: "r7",
    author: "Karthik Rao",
    role: "Student",
    rating: 4,
    category: "mentorship",
    createdAt: "2026-08-18T10:05:00.000Z",
    body: "Mentors stayed for the whole session and reviewed code instead of giving generic advice.",
  },
  {
    id: "r8",
    author: "Ananya Shah",
    role: "Full-stack Developer",
    rating: 5,
    category: "events",
    createdAt: "2026-08-12T07:45:00.000Z",
    body: "Best Saturday routine I have found this year. I always leave with a next step.",
  },
  {
    id: "r9",
    author: "Imran Qureshi",
    role: "DevOps Engineer",
    rating: 4,
    category: "projects",
    createdAt: "2026-08-04T15:30:00.000Z",
    body: "The project board helped me join a team in ten minutes instead of wandering around.",
  },
  {
    id: "r10",
    author: "Nisha Patel",
    role: "QA Engineer",
    rating: 5,
    category: "community",
    createdAt: "2026-07-28T12:00:00.000Z",
    body: "Friendly, focused, and surprisingly well organized for a monthly community meetup.",
  },
  {
    id: "r11",
    author: "Joseph Abraham",
    role: "Mobile Developer",
    rating: 4,
    category: "events",
    createdAt: "2026-07-19T09:25:00.000Z",
    body: "The AI workshop stayed practical. We built a small feature and discussed what not to ship.",
  },
  {
    id: "r12",
    author: "Divya Krishnan",
    role: "Student",
    rating: 5,
    category: "mentorship",
    createdAt: "2026-07-11T17:50:00.000Z",
    body: "I finally stopped collecting tutorials and started finishing a public demo.",
  },
];

export const ratingSummary = {
  average: 4.6,
  total: 1284,
  distribution: [
    { stars: 5, count: 842 },
    { stars: 4, count: 291 },
    { stars: 3, count: 98 },
    { stars: 2, count: 31 },
    { stars: 1, count: 22 },
  ],
};
