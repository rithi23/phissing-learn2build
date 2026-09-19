const SESSION_COOKIE = "demoSessionId";

export function getOrCreateSessionId() {
  if (typeof document === "undefined") return "";

  const existing = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`))
    ?.split("=")[1];

  if (existing) return existing;

  const sessionId = crypto.randomUUID();
  document.cookie = `${SESSION_COOKIE}=${sessionId}; Path=/; SameSite=Lax; Max-Age=86400`;
  return sessionId;
}
