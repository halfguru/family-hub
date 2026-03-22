"use client";

import { useState, useTransition, useMemo } from "react";
import { Calendar, CheckCircle2, Clock, ListTodo, Circle, Plus, ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { toggleTask, createTask, getTaskListsAction } from "@/actions/tasks";
import type { CalendarEvent } from "@/lib/google-calendar";
import type { TaskItem } from "@/lib/google-tasks";

interface HomeContentProps {
  todayEvents?: CalendarEvent[];
  tasks?: TaskItem[];
  error?: string;
}

function formatEventTime(event: CalendarEvent): string {
  if (event.allDay) {
    return "All day";
  }
  const start = new Date(event.start);
  const end = new Date(event.end);
  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return `${formatTime(start)} - ${formatTime(end)}`;
}

function formatTaskDue(due?: Date): string {
  if (!due) return "";
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dueDay = new Date(due.getFullYear(), due.getMonth(), due.getDate());
  
  if (dueDay.getTime() === today.getTime()) {
    return "Today";
  }
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (dueDay.getTime() === tomorrow.getTime()) {
    return "Tomorrow";
  }
  return due.toLocaleDateString([], { month: "short", day: "numeric" });
}

function formatCompletedDate(completedAt?: Date): string {
  if (!completedAt) return "Earlier";
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const completedDay = new Date(completedAt.getFullYear(), completedAt.getMonth(), completedAt.getDate());
  
  if (completedDay.getTime() === today.getTime()) {
    return "Today";
  }
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (completedDay.getTime() === yesterday.getTime()) {
    return "Yesterday";
  }
  return completedAt.toLocaleDateString([], { month: "short", day: "numeric" });
}

export function HomeContent({ todayEvents, tasks: initialTasks, error }: HomeContentProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [, startTransition] = useTransition();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [taskLists, setTaskLists] = useState<{ id: string; title: string }[]>([]);
  const [selectedListId, setSelectedListId] = useState<string>("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskNotes, setNewTaskNotes] = useState("");
  const [creating, setCreating] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const hasEvents = todayEvents && todayEvents.length > 0;
  const pendingTasks = useMemo(() => tasks?.filter((t) => !t.completed) ?? [], [tasks]);
  const completedTasks = useMemo(() => tasks?.filter((t) => t.completed) ?? [], [tasks]);

  const completedByDate = useMemo(() => {
    const grouped: Record<string, TaskItem[]> = {};
    for (const task of completedTasks) {
      const dateKey = formatCompletedDate(task.completedAt);
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(task);
    }
    const order = ["Today", "Yesterday"];
    const sortedKeys = Object.keys(grouped).sort((a, b) => {
      const aIdx = order.indexOf(a);
      const bIdx = order.indexOf(b);
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      return 0;
    });
    return sortedKeys.map((key) => ({ date: key, tasks: grouped[key] }));
  }, [completedTasks]);

  const handleToggleTask = (taskListId: string, taskId: string, currentCompleted: boolean) => {
    setTasks((prev) =>
      prev?.map((t) =>
        t.listId === taskListId && t.id === taskId
          ? { ...t, completed: !currentCompleted, completedAt: !currentCompleted ? new Date() : undefined }
          : t
      )
    );
    startTransition(() => {
      toggleTask(taskListId, taskId, !currentCompleted);
    });
  };

  const openCreateDialog = async () => {
    const result = await getTaskListsAction();
    if (result.lists && result.lists.length > 0) {
      setTaskLists(result.lists);
      setSelectedListId(result.lists[0].id);
      setCreateDialogOpen(true);
    }
  };

  const handleCreateTask = async () => {
    if (!newTaskTitle.trim() || !selectedListId) return;
    setCreating(true);
    const result = await createTask(
      selectedListId, 
      newTaskTitle.trim(), 
      newTaskNotes.trim() || undefined
    );
    if (result.success && result.task) {
      setTasks((prev) => [...(prev ?? []), result.task!]);
      setNewTaskTitle("");
      setNewTaskNotes("");
      setCreateDialogOpen(false);
    }
    setCreating(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today&apos;s Events
            </CardTitle>
            <CardDescription>
              {new Date().toLocaleDateString(undefined, { 
                weekday: "long", 
                month: "long", 
                day: "numeric" 
              })}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/calendar">View all</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          {!error && !hasEvents && (
            <p className="text-sm text-muted-foreground">No events today</p>
          )}
          {hasEvents && (
            <div className="space-y-3">
              {todayEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatEventTime(event)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ListTodo className="h-5 w-5" />
              Tasks
            </CardTitle>
            <CardDescription>
              {pendingTasks.length > 0 ? `${pendingTasks.length} pending` : "No pending tasks"}
              {completedTasks.length > 0 && ` • ${completedTasks.length} completed`}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {pendingTasks.length === 0 && completedTasks.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <CheckCircle2 className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">All caught up!</p>
            </div>
          )}

          {pendingTasks.length > 0 && (
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={`${task.listId}-${task.id}`}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleToggleTask(task.listId, task.id, false)}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted hover:bg-primary/10 transition-colors">
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{task.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {task.listTitle}
                      {task.due && ` • ${formatTaskDue(task.due)}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {completedTasks.length > 0 && (
            <div className="mt-4">
              <button
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowCompleted(!showCompleted)}
              >
                {showCompleted ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                Completed ({completedTasks.length})
              </button>
              
              {showCompleted && (
                <div className="mt-3 space-y-4">
                  {completedByDate.map(({ date, tasks: dateTasks }) => (
                    <div key={date}>
                      <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                        {date}
                      </p>
                      <div className="space-y-2">
                        {dateTasks.map((task) => (
                          <div
                            key={`${task.listId}-${task.id}`}
                            className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                            onClick={() => handleToggleTask(task.listId, task.id, true)}
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate line-through text-muted-foreground">
                                {task.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {task.listTitle}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription>Add a new task to your list</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Task</label>
              <Input
                placeholder="Enter task title..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateTask()}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full min-h-[80px] rounded-md border bg-background px-3 py-2 text-sm resize-none"
                placeholder="Add notes or details..."
                value={newTaskNotes}
                onChange={(e) => setNewTaskNotes(e.target.value)}
              />
            </div>
            {taskLists.length > 1 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">List</label>
                <select
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                  value={selectedListId}
                  onChange={(e) => setSelectedListId(e.target.value)}
                >
                  {taskLists.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTask} disabled={!newTaskTitle.trim() || creating}>
              {creating ? "Adding..." : "Add Task"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
