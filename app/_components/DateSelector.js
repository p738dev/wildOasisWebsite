"use client";
import React from "react";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "@/app/_components/ReservationContext";

const isAlreadyBooked = (range, datesArr) => {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
};

const DateSelector = ({ settings, cabin, bookedDates }) => {
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { regular_price, discount } = cabin;
  const num_nights = differenceInDays(displayRange.to, displayRange.from);
  const cabin_price = num_nights * (regular_price - discount);
  const { min_booking_length, max_booking_length } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={setRange}
        selected={displayRange}
        min={min_booking_length + 1}
        max={max_booking_length}
        startMonth={new Date()}
        endMonth={new Date(2025, 11)}
        captionLayout="dropdown"
        numberOfMonths={1}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">{regular_price - discount}zł</span>
                <span className="line-through font-semibold text-primary-700">
                  {regular_price}zł
                </span>
              </>
            ) : (
              <span className="text-2xl">{regular_price}zł</span>
            )}
            <span className="">/noc</span>
          </p>
          {num_nights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{num_nights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Razem</span>{" "}
                <span className="text-2xl font-semibold">{cabin_price}zł</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Wyczyść
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default DateSelector;
