"use server";

import { API_CONFIG } from "@/config/api-config";
import { cookies } from "next/headers";

export async function setAuthCookieAction(accessToken: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(API_CONFIG.cookieName, accessToken, {
    path: "/",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function signOutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(API_CONFIG.cookieName);
}
