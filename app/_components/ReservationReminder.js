"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useReservation } from "@/app/_components/ReservationContext";
import { format } from "date-fns";

const ReservationReminder = () => {
  const { range, resetRange } = useReservation();

  if (!range.from || !range.to) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 py-5 px-8 rounded-full bg-accent-500 text-primary-800 text  font-semibold shadow-xl shadow-slate-900 flex gap-8 items-center">
      <p>
        <span>👋</span> Nie zapomnij o swojej rezerwacji <br /> od{" "}
        {format(new Date(range.from), "MMM dd yyyy")} do{" "}
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>
      <button
        onClick={resetRange}
        className="rounded-full p-1 hover:bg-accent-600 transition-all"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ReservationReminder;
