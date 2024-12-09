"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

interface CalendarBodyProps {
  weekDates: Date[];
}

interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
}

export function CalendarBody({ weekDates }: CalendarBodyProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({ title: "" });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<string | null>(
    null,
  );

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const addEvent = () => {
    if (selectedDate && newEvent.title && selectedStartTime) {
      const event: Event = {
        id: Date.now().toString(),
        title: newEvent.title,
        date: selectedDate,
        startTime: selectedStartTime,
      };
      setEvents([...events, event]);
      setNewEvent({ title: "" });
      setSelectedDate(null);
      setSelectedStartTime(null);
    }
  };

  const getEventsForDateAndHour = (date: Date, hour: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear() &&
        parseInt(event.startTime.split(":")[0]) === hour
      );
    });
  };

  console.log(events);

  return (
    <div className="grid grid-cols-4 md:grid-cols-8">
      <div className="border-r">
        {hours.map((hour) => (
          <div key={hour} className="h-12 border-b text-xs md:text-lg text-center flex justify-center items-center font-medium p-1">
            {hour.toString().padStart(2, "0")}:00
          </div>
        ))}
      </div>
      {weekDates.map((date, dateIndex) => (
        <div key={dateIndex} className="border-r last:border-r-0">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-12 border-b relative"
              onClick={() => {
                setSelectedDate(date);
                setSelectedStartTime(`${hour.toString().padStart(2, "0")}:00`);
              }}
            >
              <div className="absolute top-0 h-full left-0 right-0 text-xs space-y-2 overflow-y-scroll styled-scrollbar group">
                {getEventsForDateAndHour(date, hour).map((event) => (
                  <p
                    className="text-white font-semibold rounded mt-2 bg-air-superiority-blue hover:bg-uranian-blue hover:text-black pl-1 duration-200 truncate"
                    key={event.id}
                  >
                    {event.title}
                  </p>
                ))}
                <div
                  className={`w-full h-full flex justify-center items-center ${
                    getEventsForDateAndHour(date, hour).length === 0
                      ? "opacity-100 md:opacity-0 md:group-hover:opacity-100 duration-300"
                      : ""
                  }`}
                >
                  <Button>
                    <CirclePlus></CirclePlus>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <Dialog
        open={!!selectedDate}
        onOpenChange={() => {
          setSelectedDate(null);
          setSelectedStartTime(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Add Event for {selectedDate?.toDateString()} at{" "}
              {selectedStartTime}
            </DialogTitle>
          </DialogHeader>
          <Input
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            placeholder="Enter event title"
          />
          <Button onClick={addEvent}>Add Event</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
