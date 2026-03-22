import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/users";
import { AppLayout } from "@/components/layout";
import { SettingsContent } from "./SettingsContent";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();
  
  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await getUserByEmail(session.user.email);

  return (
    <AppLayout title="Settings">
      <SettingsContent user={user} />
    </AppLayout>
  );
}
