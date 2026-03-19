import { AppLayout } from "@/components/layout";

export default function Home() {
  return (
    <AppLayout title="Home">
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-semibold text-foreground">
          Welcome to Family Hub
        </h2>
        <p className="mt-2 text-muted-foreground">
          Your family&apos;s command center for daily life
        </p>
      </div>
    </AppLayout>
  );
}
