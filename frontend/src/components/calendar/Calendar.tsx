"use client";

import { useState, useEffect, use, Suspense } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarBody } from "./CalendarBody";
import { Post } from "@/app/types/post";

export default function Calendar({ posts: postsPromise }: { posts: Promise<Post[]> }) {
  const posts: Post[] = use(postsPromise);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysToShow, setDaysToShow] = useState(7);

  useEffect(() => {
    const updateDaysToShow = () => {
      if (window.innerWidth <= 768) {
        setDaysToShow(3);
      } else {
        setDaysToShow(7);
      }
    };

    updateDaysToShow();
    window.addEventListener("resize", updateDaysToShow);
    return () => window.removeEventListener("resize", updateDaysToShow);
  }, []);

  const navigateWeek = (direction: "prev" | "next") => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(
        prevDate.getDate() + (direction === "next" ? daysToShow : -daysToShow),
      );
      return newDate;
    });
  };

  const getWeekDates = (date: Date, days: number) => {
    const week = [];
    const start = new Date(date.setHours(0, 0, 0, 0));
    for (let i = 0; i < days; i++) {
      const day = new Date(start.setHours(0, 0, 0, 0));
      day.setDate(start.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates(currentDate, daysToShow);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateWeek("prev")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateWeek("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <span className="font-medium">
            {weekDates[0].toLocaleDateString("es-ES", {
              month: "long",
              day: "numeric",
            })}{" "}
            -{" "}
            {weekDates[weekDates.length - 1].toLocaleDateString("es-ES", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
          Today
        </Button>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <CalendarHeader weekDates={weekDates} />
        <Suspense fallback={<div>Loading...</div>}>
          <CalendarBody weekDates={weekDates} postsProps={posts}/>
        </Suspense>
      </div>
    </div>
  );
}
