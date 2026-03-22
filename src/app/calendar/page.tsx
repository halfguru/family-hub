import { auth } from "@/auth";
import { getPrimaryCalendarEvents } from "@/actions/calendar";
import { AppLayout } from "@/components/layout";
import { CalendarView } from "./CalendarView";
import type { CalendarEvent } from "@/lib/google-calendar";

export default async function CalendarPage() {
  const session = await auth();
  
  let events: CalendarEvent[] | undefined;
  let error = undefined;

  if (session?.user?.email) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    
    const result = await getPrimaryCalendarEvents(startOfMonth, endOfMonth);
    events = result.events;
    error = result.error;
  }

  return (
    <AppLayout title="Calendar">
      <CalendarView events={events} error={error} />
    </AppLayout>
  );
}
