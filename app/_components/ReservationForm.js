"use client";
import React from "react";
import { useReservation } from "@/app/_components/ReservationContext";
import { differenceInDays } from "date-fns";
import { createBooking } from "@/app/_lib/actions";
import SubmitButton from "./SubmitButton";

const ReservationForm = ({ cabin, user }) => {
  const { range, resetRange } = useReservation();
  const { max_people, regular_price, discount, id } = cabin;

  const start_date = range.from;
  const end_date = range.to;

  const num_nights = differenceInDays(end_date, start_date);
  const cabin_price = num_nights * (regular_price - discount);

  const bookingData = {
    start_date,
    end_date,
    num_nights,
    cabin_price,
    cabin_id: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Zalogowany użytkownik</p>

        <div className="flex gap-4 items-center">
          <img
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">Ile gości?</label>
          <select
            name="num_guests"
            id="num_guests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option
              value=""
              key=""
            >
              Wybierz liczbę gości...
            </option>
            {Array.from({ length: max_people }, (_, i) => i + 1).map((x) => (
              <option
                value={x}
                key={x}
              >
                {x} {x === 1 ? "gość" : "gości"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">Informacje dotyczące pobytu?</label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Jakiekolwiek zwierzęta, alergie itp.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(start_date && end_date) ? (
            <p className="text-primary-300 text-base">Wybierz daty</p>
          ) : (
            <SubmitButton pendingLabel="Rezerwowanie...">
              Rezerwuj teraz
            </SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
