import { cookies } from "next/headers";

export const ADMIN_COOKIE = "b2l_admin";

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "admin",
  };
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === "1";
}
