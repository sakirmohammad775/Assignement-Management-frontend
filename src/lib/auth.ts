import type { User, UserRole } from "@/types/auth";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "user";

export function saveAuth(
  accessToken: string,
  refreshToken: string,
  user: User
) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  // Used by the frontend route guard.
  document.cookie = `user_role=${user.role}; path=/; max-age=86400; SameSite=Lax`;
}

export function getUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }

  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user) as User;
  } catch {
    return null;
  }
}

export function getRole(): UserRole | null {
  return getUser()?.role ?? null;
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return Boolean(localStorage.getItem(ACCESS_TOKEN_KEY));
}

export function clearAuth() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);

  document.cookie =
    "user_role=; path=/; max-age=0; SameSite=Lax";
}