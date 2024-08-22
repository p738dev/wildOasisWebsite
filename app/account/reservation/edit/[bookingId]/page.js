import SubmitButton from "@/app/_components/SubmitButton";
import { updateBooking } from "@/app/_lib/actions";
import { getBooking } from "@/app/_lib/data-service";
import React from "react";

const Page = async ({ params }) => {
  const { bookingId } = params;
  const { num_guests, observations } = await getBooking(bookingId);

  const max_people = 23;

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edytuj rezerwację #{bookingId}
      </h2>

      <form
        action={updateBooking}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <input
          type="hidden"
          value={bookingId}
          name="bookingId"
        />
        <div className="space-y-2">
          <label htmlFor="num_guests">Ile gości?</label>
          <select
            name="num_guests"
            id="num_guests"
            defaultValue={num_guests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option
              value=""
              key=""
            >
              Wybierz ilość gości...
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
          <label htmlFor="observations">Informacje do rezerwacji?</label>
          <textarea
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Edytowanie...">
            Edytuj rezerwację
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default Page;
