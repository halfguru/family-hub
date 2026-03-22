export interface GoogleTaskList {
  id: string;
  title: string;
  updated?: string;
}

export interface GoogleTask {
  id: string;
  title: string;
  notes?: string;
  status: "needsAction" | "completed";
  due?: string;
  completed?: string;
  updated?: string;
  parent?: string;
  position?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  notes?: string;
  completed: boolean;
  completedAt?: Date;
  due?: Date;
  listTitle: string;
  listId: string;
}

const GOOGLE_TASKS_API = "https://tasks.googleapis.com/tasks/v1";

export async function getTaskLists(accessToken: string): Promise<GoogleTaskList[]> {
  const response = await fetch(`${GOOGLE_TASKS_API}/users/@me/lists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch task lists: ${response.status}`);
  }

  const data = await response.json();
  return data.items ?? [];
}

export async function getTasks(
  accessToken: string,
  taskListId: string,
  showCompleted = false,
  maxResults = 100
): Promise<GoogleTask[]> {
  const params = new URLSearchParams({
    showCompleted: showCompleted.toString(),
    maxResults: maxResults.toString(),
  });

  const response = await fetch(
    `${GOOGLE_TASKS_API}/lists/${taskListId}/tasks?${params}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.status}`);
  }

  const data = await response.json();
  return data.items ?? [];
}

export async function getAllTasks(accessToken: string): Promise<TaskItem[]> {
  const taskLists = await getTaskLists(accessToken);
  const allTasks: TaskItem[] = [];

  for (const list of taskLists) {
    const tasks = await getTasks(accessToken, list.id, true);
    for (const task of tasks) {
      allTasks.push({
        id: task.id,
        title: task.title,
        notes: task.notes,
        completed: task.status === "completed",
        completedAt: task.completed ? new Date(task.completed) : undefined,
        due: task.due ? new Date(task.due) : undefined,
        listTitle: list.title,
        listId: list.id,
      });
    }
  }

  return allTasks;
}
