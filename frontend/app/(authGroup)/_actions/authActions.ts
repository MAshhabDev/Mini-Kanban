/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://kanban-backend-umber.vercel.app/api";

// 1. Server Action: Login
export const loginAction = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await res.json();

    if (result.success && result.token) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Server error during login",
    };
  }
};

// 2. Server Action: Register
export const registerAction = async (data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) => {
  try {
    const payload = {
      ...data,
      role: data.role || "USER",
    };

    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    return await res.json();
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Server error during registration",
    };
  }
};

// 3. Server Action: Logout
export const logoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  redirect("/login");
};


export const getNewAccessToken = async (refreshToken?: string) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    return await res.json();
  } catch (error: any) {
    return { success: false, message: "Refresh token failed" };
  }
};