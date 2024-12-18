"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { postTweetAction } from "@/app/actions/postTweetAction";
import { Post } from "@/app/types/post";
import { deleteTweetAction } from "@/app/actions/deleteTweetAction";
import { Textarea } from "../ui/textarea";

type CalendarBodyProps = {
  weekDates: Date[];

  postsProps: Post[];
};

export function CalendarBody({ weekDates, postsProps }: CalendarBodyProps) {
  const [posts, setPosts] = useState(postsProps);
  const [newEvent, setNewEvent] = useState({ title: "" });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<string | null>(
    null,
  );
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const addEvent = async () => {
    if (selectedDate && newEvent.title && selectedStartTime) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth();
      const day = selectedDate.getDate();
      const formattedDate = new Date(
        `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")} ${selectedStartTime}`,
      );

      // Adjust for timezone offset
      const timezoneOffset = formattedDate.getTimezoneOffset() * 60000;
      const adjustedDate = new Date(formattedDate.getTime() - timezoneOffset);

      const { job_id } = await postTweetAction({
        text: newEvent.title,
        date: adjustedDate,
      });

      setPosts(
        posts.concat({
          id: job_id,
          title: newEvent.title,
          date: formattedDate,
        }),
      );

      setNewEvent({ title: "" });
      setSelectedDate(null);
      setSelectedStartTime(null);
    }
  };

  const deleteEvent = async () => {
    if (selectedEvent) {
      await deleteTweetAction(selectedEvent);
      setPosts(posts.filter((post) => post.id !== selectedEvent));
      setSelectedEvent(null);
    }
  };

  const getEventsForDateAndHour = (date: Date, hour: number) => {
    return posts.filter((post) => {
      const postDate = new Date(post.date);
      return (
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear() &&
        postDate.getHours() === hour
      );
    });
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-8">
      <div className="border-r">
        {hours.map((hour) => (
          <div
            key={hour}
            className="h-12 border-b text-xs md:text-lg text-center flex justify-center items-center font-medium p-1"
          >
            {hour.toString().padStart(2, "0")}:00
          </div>
        ))}
      </div>
      {weekDates.map((date, dateIndex) => (
        <div key={dateIndex} className="border-r last:border-r-0">
          {hours.map((hour) => (
            <div key={hour} className="h-12 border-b relative">
              <div className="absolute top-0 h-full left-0 right-0 text-xs space-y-2 overflow-y-scroll styled-scrollbar group">
                {getEventsForDateAndHour(date, hour).map((event) => (
                  <button
                    className="w-full"
                    onClick={() => setSelectedEvent(event.id)}
                    key={event.id}
                  >
                    <p className="text-white font-semibold rounded mt-2 bg-air-superiority-blue hover:bg-uranian-blue hover:text-black pl-1 duration-200 truncate">
                      {event.title}
                    </p>
                  </button>
                ))}
                <div
                  className={`w-full h-full flex justify-center items-center ${
                    getEventsForDateAndHour(date, hour).length === 0
                      ? "opacity-100 md:opacity-0 md:group-hover:opacity-100 duration-300"
                      : ""
                  }`}
                >
                  <Button
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedStartTime(
                        `${hour.toString().padStart(2, "0")}:00`,
                      );
                    }}
                  >
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
              Publicar tweet para el {selectedDate?.toDateString()} a las{" "}
              {selectedStartTime}
            </DialogTitle>
          </DialogHeader>
          <Textarea
            className="h-96 max-h-96"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            placeholder="Enter tweet text"
          />
          <Button onClick={addEvent}>Publicar tweet</Button>
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => {
          setSelectedEvent(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {posts.find((post) => post.id === selectedEvent)?.title}
            </DialogTitle>
          </DialogHeader>
          <p>
            El tweet se publicará el{" "}
            {posts
              .find((post) => post.id === selectedEvent)
              ?.date.toLocaleDateString("es-ES", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
            a las{" "}
            {new Date(
              posts.find((post) => post.id === selectedEvent)?.date ||
                new Date(),
            ).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <div>
            <Button variant={"destructive"} onClick={deleteEvent}>
              Eliminar publicación
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
