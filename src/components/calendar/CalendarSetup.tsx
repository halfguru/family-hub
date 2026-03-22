"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import type { GoogleCalendar } from "@/lib/google-calendar";
import { setFamilyCalendar } from "@/actions/calendar";

interface CalendarSetupProps {
  calendars: GoogleCalendar[];
  familyId: string;
  currentCalendarId?: string;
  onComplete?: () => void;
}

export function CalendarSetup({
  calendars,
  familyId,
  currentCalendarId,
  onComplete,
}: CalendarSetupProps) {
  const [selectedId, setSelectedId] = useState(currentCalendarId);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!selectedId) return;

    const calendar = calendars.find((c) => c.id === selectedId);
    if (!calendar) return;

    setLoading(true);
    const result = await setFamilyCalendar(familyId, selectedId, calendar.summary);
    setLoading(false);

    if (result.success) {
      onComplete?.();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Family Calendar</CardTitle>
        <CardDescription>
          Select which Google Calendar to use for your family events
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          {calendars.map((calendar) => (
            <button
              key={calendar.id}
              onClick={() => setSelectedId(calendar.id)}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors text-left"
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: calendar.backgroundColor || "#6B8E6B" }}
              />
              <div className="flex-1">
                <div className="font-medium">{calendar.summary}</div>
                {calendar.primary && (
                  <div className="text-xs text-muted-foreground">Primary calendar</div>
                )}
              </div>
              {selectedId === calendar.id && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </button>
          ))}
        </div>
        <Button onClick={handleSave} disabled={!selectedId || loading}>
          {loading ? "Saving..." : "Save Selection"}
        </Button>
      </CardContent>
    </Card>
  );
}
