"use client";

import { MapPin, Clock, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useCallback } from "react";
import type { CalendarEvent } from "@/lib/google-calendar";

interface MonthGridProps {
  year: number;
  month: number;
  events?: CalendarEvent[];
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
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

export function MonthGrid({ year, month, events = [] }: MonthGridProps) {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();

  const getEventsForDay = useCallback(
    (day: number): CalendarEvent[] => {
      const date = new Date(year, month, day);
      return events.filter((event) => {
        const eventStart = new Date(event.start);
        return isSameDay(eventStart, date);
      });
    },
    [events, year, month]
  );

  const days = [];
  const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;

  for (let i = 0; i < totalCells; i++) {
    const day = i - firstDay + 1;
    const isCurrentMonth = day > 0 && day <= daysInMonth;
    const isToday = isCurrentMonth && isSameDay(new Date(year, month, day), today);
    const dayEvents = isCurrentMonth ? getEventsForDay(day) : [];

    days.push(
      <div
        key={i}
        className={cn(
          "min-h-[100px] border border-border p-1",
          !isCurrentMonth && "bg-muted/30"
        )}
      >
        {isCurrentMonth && (
          <>
            <span
              className={cn(
                "inline-flex h-7 w-7 items-center justify-center rounded-full text-sm",
                isToday && "bg-primary text-primary-foreground font-semibold"
              )}
            >
              {day}
            </span>
            <div className="mt-1 space-y-1">
              {dayEvents.slice(0, 3).map((event) => (
                <button
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="w-full truncate rounded px-1 py-0.5 text-xs bg-primary/10 text-primary hover:bg-primary/20 text-left"
                >
                  {event.title}
                </button>
              ))}
              {dayEvents.length > 3 && (
                <div className="text-xs text-muted-foreground px-1">
                  +{dayEvents.length - 3} more
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-7 flex-1">
        {days}
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-h-[85vh] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4 overflow-y-auto flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{formatEventTime(selectedEvent)}</span>
              </div>
              {selectedEvent.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedEvent.location}</span>
                </div>
              )}
              {selectedEvent.description && (
                <p className="text-sm whitespace-pre-wrap">{selectedEvent.description}</p>
              )}
              {selectedEvent.htmlLink && (
                <Button variant="outline" size="sm" asChild>
                  <a href={selectedEvent.htmlLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in Google Calendar
                  </a>
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
