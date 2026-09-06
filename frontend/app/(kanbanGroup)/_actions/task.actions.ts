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

// 1. Create Column Action
export const createColumnAction = async (boardId: string, title: string) => {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${BASE_URL}/boards/${boardId}/columns`, {
      method: "POST",
      headers,
      body: JSON.stringify({ title }),
    });
    const result = await res.json();
    revalidatePath(`/board/${boardId}`);
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to create column" };
  }
};

// 2. Create Task Action
export const createTaskAction = async (
  columnId: string,
  boardId: string,
  data: { title: string; description?: string; priority?: string }
) => {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${BASE_URL}/columns/${columnId}/tasks`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    const result = await res.json();
    revalidatePath(`/board/${boardId}`);
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to create task" };
  }
};

// 3. Move Task Action (CORE Drag & Drop Action)
export const moveTaskAction = async (
  taskId: string,
  targetColumnId: string,
  newPosition: number,
  boardId: string
) => {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${BASE_URL}/tasks/${taskId}/move`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ targetColumnId, newPosition }),
    });
    const result = await res.json();
    revalidatePath(`/board/${boardId}`);
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to move task" };
  }
};

// 4. Delete Task Action
export const deleteTaskAction = async (taskId: string, boardId: string) => {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers,
    });
    const result = await res.json();
    revalidatePath(`/board/${boardId}`);
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to delete task" };
  }
};