import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        Ta strona nie została znaleziona :(
      </h1>
      <Link
        href="/"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Wróć do strony głównej
      </Link>
    </main>
  );
};

export default NotFound;
