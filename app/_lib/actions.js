"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export const signInAction = async () => {
  await signIn("google", { redirectTo: "/account" });
};

export const signOutAction = async () => {
  await signOut({ redirectTo: "/" });
};

export const updateGuest = async (formData) => {
  const session = await auth();
  if (!session) throw new Error("Musisz być zalogowany");

  const nationalID = formData.get("nationalID");
  const [nationality, country_flag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Proszę wprowadzić poporawny narodowy ID");
  }

  const updateData = { nationality, country_flag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Gość nie może zostać edytowany.");

  revalidatePath("/account/profile");
};

export const deleteReservation = async (bookingId) => {
  const session = await auth();
  if (!session) throw new Error("Musisz być zalogowany");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("Nie wolno usunąć tej rezerwacji. ");
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Rezerwacja nie może zostać usunięta.");
  }
  revalidatePath("/account/reservation");
};

export const updateBooking = async (formData) => {
  const bookingId = Number(formData.get("bookingId"));
  const session = await auth();
  if (!session) throw new Error("Musisz być zalogowany");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("Nie wolno edytować tej rezerwacji. ");
  }

  const updateData = {
    num_guests: Number(formData.get("num_guests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    throw new Error("Rezerwacja nie może zostać edytowana.");
  }

  revalidatePath(`/account/reservation/edit/${bookingId}`);
  revalidatePath("/account/reservation");

  redirect("/account/reservation");
};

export const createBooking = async (bookingData, formData) => {
  const session = await auth();
  if (!session) throw new Error("Musisz być zalogowany");

  const newBooking = {
    ...bookingData,
    guest_id: session.user.guestId,
    num_guests: Number(formData.get("num_guests")),
    observations: formData.get("observations").slice(0, 1000),
    extras_price: 0,
    total_price: bookingData.cabinPrice,
    is_paid: false,
    has_breakfast: false,
    status: "niepotwierdzony",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    throw new Error("Rezerwacja nie może zostać utworzona.");
  }

  revalidatePath(`/cabins/${bookingData.cabin_id}`);

  redirect("/cabins/thankyou");
};
