import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
import React from "react";

export const metadata = {
  title: "Rezerwacje",
};

const Page = async () => {
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Twoje rezerwacje
      </h2>
      {bookings.length === 0 ? (
        <p className="text-lg">
          Nie masz jeszcze rezerwacji? Przejdź tutaj{" "}
          <a
            className="underline text-accent-500"
            href="/cabins"
          >
            luksusowe mieszkania &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
};

export default Page;
