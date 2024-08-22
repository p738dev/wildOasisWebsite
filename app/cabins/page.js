import React, { Suspense } from "react";
import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const metadata = {
  title: "Mieszkania",
};

const Page = ({ searchParams }) => {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Nasze Luksusowe Mieszkania
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Przytulne, luksusowe domki, położone w samym sercu Polski. Wyobraź
        sobie, że budzisz się z pięknym widokiem na góry, spędzasz dni na
        odkrywaniu ciemnych lasów wokół lub po prostu relaksując się w prywatnej
        jacuzzi pod gwiazdami. Ciesz się pięknem natury we własnym małym domu.
        Idealne miejsce na spokojne, ciche wakacje. Witamy w raju.
      </p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      <Suspense
        fallback={<Spinner />}
        key={filter}
      >
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
};

export default Page;
