"use server";

import { auth } from "@/auth";
import { getAllTasks, type TaskItem } from "@/lib/google-tasks";
import { getValidGoogleAccessToken } from "@/lib/users";

const GOOGLE_TASKS_API = "https://tasks.googleapis.com/tasks/v1";

export async function getTasksAction(): Promise<{
  tasks?: TaskItem[];
  error?: string;
}> {
  const session = await auth();

  if (!session?.user?.email) {
    return { error: "Not authenticated" };
  }

  const { accessToken, error: tokenError } = await getValidGoogleAccessToken(
    session.user.email
  );

  if (tokenError || !accessToken) {
    return { error: tokenError ?? "No Google access token" };
  }

  try {
    const tasks = await getAllTasks(accessToken);
    tasks.sort((a, b) => {
      if (a.due && b.due) return a.due.getTime() - b.due.getTime();
      if (a.due) return -1;
      if (b.due) return 1;
      return 0;
    });
    return { tasks: tasks.slice(0, 20) };
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return { error: "Failed to fetch tasks" };
  }
}

export async function toggleTask(
  taskListId: string,
  taskId: string,
  completed: boolean
): Promise<{ success: boolean; error?: string }> {
  const session = await auth();

  if (!session?.user?.email) {
    return { success: false, error: "Not authenticated" };
  }

  const { accessToken, error: tokenError } = await getValidGoogleAccessToken(
    session.user.email
  );

  if (tokenError || !accessToken) {
    return { success: false, error: tokenError ?? "No Google access token" };
  }

  try {
    const response = await fetch(
      `${GOOGLE_TASKS_API}/lists/${taskListId}/tasks/${taskId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: completed ? "completed" : "needsAction" }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update task: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to update task:", error);
    return { success: false, error: "Failed to update task" };
  }
}

export async function createTask(
  taskListId: string,
  title: string,
  notes?: string,
  due?: Date
): Promise<{ success: boolean; task?: TaskItem; error?: string }> {
  const session = await auth();

  if (!session?.user?.email) {
    return { success: false, error: "Not authenticated" };
  }

  const { accessToken, error: tokenError } = await getValidGoogleAccessToken(
    session.user.email
  );

  if (tokenError || !accessToken) {
    return { success: false, error: tokenError ?? "No Google access token" };
  }

  try {
    const body: Record<string, string> = { title };
    if (notes) body.notes = notes;
    if (due) body.due = due.toISOString();

    const response = await fetch(
      `${GOOGLE_TASKS_API}/lists/${taskListId}/tasks`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create task: ${response.status}`);
    }

    const task = await response.json();
    return {
      success: true,
      task: {
        id: task.id,
        title: task.title,
        notes: task.notes,
        completed: task.status === "completed",
        due: task.due ? new Date(task.due) : undefined,
        listTitle: "",
        listId: taskListId,
      },
    };
  } catch (error) {
    console.error("Failed to create task:", error);
    return { success: false, error: "Failed to create task" };
  }
}

export async function getTaskListsAction(): Promise<{
  lists?: { id: string; title: string }[];
  error?: string;
}> {
  const session = await auth();

  if (!session?.user?.email) {
    return { error: "Not authenticated" };
  }

  const { accessToken, error: tokenError } = await getValidGoogleAccessToken(
    session.user.email
  );

  if (tokenError || !accessToken) {
    return { error: tokenError ?? "No Google access token" };
  }

  try {
    const response = await fetch(`${GOOGLE_TASKS_API}/users/@me/lists`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch task lists: ${response.status}`);
    }

    const data = await response.json();
    const lists = (data.items ?? []).map((item: { id: string; title: string }) => ({
      id: item.id,
      title: item.title,
    }));

    return { lists };
  } catch (error) {
    console.error("Failed to fetch task lists:", error);
    return { error: "Failed to fetch task lists" };
  }
}
