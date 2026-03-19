"use client";

import { type ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <div className="flex flex-1 flex-col pb-14 md:pb-0 md:pl-64">
        <Header title={title} />
        <main className="flex-1 p-4">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
