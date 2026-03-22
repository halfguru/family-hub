import { Calendar, ListTodo } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AppLayout } from "@/components/layout";

function EventSkeleton() {
  return (
    <div className="flex items-start gap-3 p-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

function TaskSkeleton() {
  return (
    <div className="flex items-start gap-3 p-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <AppLayout title="Home">
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today&apos;s Events
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-32 mt-1" />
              </CardDescription>
            </div>
            <Skeleton className="h-8 w-16" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <EventSkeleton />
              <EventSkeleton />
            </div>
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
                <Skeleton className="h-4 w-24 mt-1" />
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <TaskSkeleton />
              <TaskSkeleton />
              <TaskSkeleton />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
