import { eachDayOfInterval } from "date-fns";
import { notFound } from "next/navigation";
import supabase from "./supabase";

export const getCabin = async (id) => {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    notFound();
  }

  return data;
};

export const getCabinPrice = async (id) => {
  const { data, error } = await supabase
    .from("cabins")
    .select("regular_price, discount")
    .eq("id", id)
    .single();

  if (error) {
  }

  return data;
};

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  await new Promise((res) => setTimeout(res, 2000));

  if (error) {
    throw new Error("Mieszkania nie zostały załadowane.");
  }

  return data;
};

export const getGuest = async (email) => {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  return data;
};

export const getBooking = async (id) => {
  const { data, error, count } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Rezerwacja nie została załadowana.");
  }

  return data;
};

export const getBookings = async (guestId) => {
  const { data, error, count } = await supabase
    .from("bookings")
    .select(
      "id, created_at, start_date, end_date, num_nights, num_guests, total_price, guest_id, cabin_id, cabins(name, image, regular_price, discount)"
    )
    .eq("guest_id", guestId)
    .order("start_date");

  if (error) {
    throw new Error("Rezerwacje nie zostały załadowane.");
  }

  return data;
};

export const getBookedDatesByCabinId = async (cabinId) => {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabin_id", cabinId)
    .or(`start_date.gte.${today},status.eq.zameldowany`);

  if (error) {
    throw new Error("Rezerwacja nie została załadowana.");
  }

  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.start_date),
        end: new Date(booking.end_date),
      });
    })
    .flat();

  return bookedDates;
};

export const getSettings = async () => {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    throw new Error("Ustawienie nie zostały załadowane.");
  }

  return data;
};

export const getCountries = async () => {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Błąd pobierania krajów.");
  }
};

export const createGuest = async (newGuest) => {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    throw new Error("Gość nie może zostać utworzony.");
  }

  return data;
};

// export const createBooking = async (newBooking) => {
//   const { data, error } = await supabase
//     .from("bookings")
//     .insert([newBooking])
//     .select()
//     .single();

//   if (error) {
//     throw new Error("Rezerwacja nie może zostać utworzona.");
//   }

//   return data;
// };

// export const updateGuest = async (id, updatedFields) => {
//   const { data, error } = await supabase
//     .from("guests")
//     .update(updatedFields)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     throw new Error("Gość nie może zostać edytowany.");
//   }
//   return data;
// };

// export const updateBooking = async (id, updatedFields) => {
//   const { data, error } = await supabase
//     .from("bookings")
//     .update(updatedFields)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     throw new Error("Rezerwacja nie może zostać edytowana.");
//   }
//   return data;
// };

// export const deleteBooking = async (id) => {
//   const { data, error } = await supabase.from("bookings").delete().eq("id", id);

//   if (error) {
//     throw new Error("Rezerwacja nie może zostać usunięta.");
//   }
//   return data;
// };
