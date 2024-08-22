import React, { Suspense } from "react";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

export const generateMetadata = async ({ params }) => {
  const { name } = await getCabin(params.cabinId);
  return { title: `${name}` };
};

export const generateStaticParams = async () => {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
};

const Page = async ({ params }) => {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Zarezerwuj {cabin.name} dzisiaj. Zapłać w dniu przyjazdu.
        </h2>
      </div>
      <Suspense fallback={<Spinner />}>
        <Reservation cabin={cabin} />
      </Suspense>
    </div>
  );
};

export default Page;
