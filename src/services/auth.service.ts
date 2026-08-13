import { api } from "@/lib/api";
import { saveAuth } from "@/lib/auth";
import type { LoginResponse } from "@/types/auth";

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/login/",
    {
      username,
      password,
    }
  );

  const data = response.data;

  saveAuth(
    data.access,
    data.refresh,
    data.user
  );

  return data;
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    document.cookie =
      "user_role=; path=/; max-age=0; SameSite=Lax";
  }
}