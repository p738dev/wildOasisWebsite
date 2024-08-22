import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">Dziękujemy za Twoją rezerwację</h1>
      <Link
        href="/account/reservation"
        className="underline text-xl text-accent-500 inline-block"
      >
        Zobacz dokonane rezerwacje &rarr;
      </Link>
    </div>
  );
};

export default Page;
