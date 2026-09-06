/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://kanban-backend-umber.vercel.app/api";

const getAuthHeader = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// 1. Get All User Boards (Owned + Shared)
export const getBoardsAction = async () => {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${BASE_URL}/boards`, {
      headers,
      cache: "no-store",
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to fetch boards" };
  }
};

// 2. Get Single Board Details (with Columns & Tasks)
export const getSingleBoardAction = async (boardId: string) => {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${BASE_URL}/boards/${boardId}`, {
      headers,
      cache: "no-store",
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to fetch board details" };
  }
};

// 3. Create Board Action (Auto creates 3 default columns)
export const createBoardAction = async (data: { title: string; description?: string }) => {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${BASE_URL}/boards`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    const result = await res.json();
    revalidatePath("/dashboard");
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to create board" };
  }
};

// 4. Delete Board Action
export const deleteBoardAction = async (boardId: string) => {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${BASE_URL}/boards/${boardId}`, {
      method: "DELETE",
      headers,
    });
    const result = await res.json();
    revalidatePath("/dashboard");
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to delete board" };
  }
};