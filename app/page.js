import Image from "next/image";
import Link from "next/link";
import React from "react";

import bg from "@/public/bg.png";

export const metadata = {
  title: {
    template: "%s: Wild Oasis",
    default: "Wild Oasis",
  },
};

const Page = () => {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        alt="Mountains and forests with two cabins"
        fill
        placeholder="blur"
        quality={100}
        className="object-cover"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Witamy serdecznie
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Wyszukaj luksusowe mieszkanie
        </Link>
      </div>
    </main>
  );
};

export default Page;
