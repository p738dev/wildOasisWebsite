import { Josefin_Sans } from "next/font/google";
import React from "react";
import Header from "@/app/_components/Header";

import "@/app/_styles/global.css";
import { ReservationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s: Wild Oasis",
    default: "Wild Oasis",
  },
  description:
    "Luksusowe mieszkania hotelu, zlokalizowanego w samym sercu Polski",
};

const RootLayout = ({ children }) => {
  return (
    <html>
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
