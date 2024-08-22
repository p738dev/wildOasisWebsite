import React from "react";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import DeleteReservation from "@/app/_components/DeleteReservation";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

const ReservationCard = ({ booking, onDelete }) => {
  const {
    id,
    guest_id,
    start_date,
    end_date,
    num_nights,
    num_guests,
    status,
    created_at,
    cabins: { name, image, regular_price, discount },
  } = booking;

  const total_price = num_nights * (regular_price - discount);

  return (
    <div className="flex border border-primary-800">
      <div className="relative h-32 aspect-square">
        <Image
          src={image}
          alt={`${name}`}
          fill
          className="object-cover border-r border-primary-800"
        />
      </div>

      <div className="flex-grow px-6 py-3 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {num_nights} Nocy w {name}
          </h3>
          {isPast(new Date(start_date)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              przeszłe
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              nadchodzące
            </span>
          )}
        </div>

        <p className="text-lg text-primary-300">
          {format(new Date(start_date), "EEE, MMM dd yyyy")} (
          {isToday(new Date(start_date))
            ? "Today"
            : formatDistanceFromNow(start_date)}
          ) &mdash; {format(new Date(end_date), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex gap-5 mt-auto items-baseline">
          <p className="text-xl font-semibold text-accent-400">
            {total_price}zł
          </p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-lg text-primary-300">
            {num_guests} gośc{num_guests > 1 && "i"}
          </p>
          <p className="ml-auto text-sm text-primary-400">
            Rezerwacja {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex flex-col border-l border-primary-800 w-[100px]">
        {!isPast(start_date) ? (
          <>
            <Link
              href={`/account/reservation/edit/${id}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edytuj</span>
            </Link>
            <DeleteReservation
              bookingId={id}
              onDelete={onDelete}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ReservationCard;
