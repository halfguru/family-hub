"use client";

import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background px-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className={cn("text-lg font-semibold", !title && "md:hidden")}>
          {title}
        </h1>
      </div>
      
      <Button variant="ghost" size="icon" aria-label="User menu">
        <User className="h-5 w-5" />
      </Button>
    </header>
  );
}
