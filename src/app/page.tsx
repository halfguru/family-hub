import { auth } from "@/auth";
import { getTodayEvents } from "@/actions/calendar";
import { getTasksAction } from "@/actions/tasks";
import { AppLayout } from "@/components/layout";
import { HomeContent } from "./HomeContent";

export default async function HomePage() {
  const session = await auth();

  let todayEvents = undefined;
  let tasks = undefined;
  let error = undefined;

  if (session?.user?.email) {
    const [eventsResult, tasksResult] = await Promise.all([
      getTodayEvents(),
      getTasksAction(),
    ]);
    todayEvents = eventsResult.events;
    tasks = tasksResult.tasks;
    error = eventsResult.error || tasksResult.error;
  }

  return (
    <AppLayout title="Home">
      <HomeContent todayEvents={todayEvents} tasks={tasks} error={error} />
    </AppLayout>
  );
}
