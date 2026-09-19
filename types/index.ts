export type InteractionAction = "LOGIN" | "REGISTER" | "PASSWORD_RESET";

export type ParticipantInteraction = {
  id: string;
  name?: string | null;
  email?: string | null;
  action: InteractionAction;
  passwordEntered: boolean;
  passwordLength?: number | null;
  sessionId: string;
  createdAt: string;
};

export type ReviewCategory =
  | "community"
  | "events"
  | "mentorship"
  | "projects";

export type Review = {
  id: string;
  author: string;
  role: string;
  rating: number;
  body: string;
  category: ReviewCategory;
  createdAt: string;
};

export type FeaturedProject = {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  stage: string;
};

export type CommunityEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
};

export type EventRegistration = {
  id: string;
  eventName: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
  experience?: string | null;
  projectIdea?: string | null;
  skills?: string | null;
  heardFrom?: string | null;
  dietaryNeeds?: string | null;
  tshirtSize?: string | null;
  createdAt: string;
};
