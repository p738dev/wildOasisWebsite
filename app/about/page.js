import Image from "next/image";
import React from "react";

import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import { getCabins } from "../_lib/data-service";

export const revalidate = 86400;

export const metadata = {
  title: "O nas",
};

const Page = async () => {
  const cabins = await getCabins();

  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Witamy w The Wild Oasis
        </h1>

        <div className="space-y-8">
          <p>
            Gdzie piękno natury i komfortowe życie łączą się płynnie. Ukryty w
            samym sercu Polski, to jest twój raj z dala od domu. Ale nie chodzi
            tylko o luksusowe domki. Chodzi o doświadczenie ponownego połączenia
            się z naturą i cieszenia się prostymi przyjemnościami z rodziną.
          </p>
          <p>
            Nasze {cabins.length} luksusowych domków zapewnia przytulną bazę,
            ale prawdziwą wolność i spokój znajdziesz w otaczających górach.
            Wędruj przez bujne lasy, oddychaj świeżym powietrzem i obserwuj
            gwiazdy migoczące powyżej przy cieple ogniska lub w wannie z
            hydromasażem.
          </p>
          <p>
            To tutaj powstają niezapomniane chwile, otoczone wspaniałością
            natury. To miejsce, w którym można zwolnić, zrelaksować się i poczuć
            radość z bycia razem w pięknym otoczeniu.
          </p>
        </div>
      </div>

      <div className="col-span-2">
        <Image
          src={image1}
          alt="Family sitting around a fire pit in front of cabin"
        />
      </div>

      <div className="col-span-2">
        <Image
          src={image2}
          alt="Family that manages The Wild Oasis"
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Zarządzamy naszą rodzinę od 1962 roku
        </h1>

        <div className="space-y-8">
          <p>
            Od 1962 roku The Wild Oasis jest cenionym rodzinnym ośrodkiem
            wypoczynkowym. Ta przystań była pielęgnowana z miłością i troską.
          </p>
          <p>
            Przez lata zachowaliśmy istotę The Wild Oasis, łącząc ponadczasowe
            piękno gór z osobistym podejściem, które może zaoferować tylko
            rodzinna firma. Tutaj nie jesteś tylko gościem, jesteś częścią
            naszej rozszerzonej rodziny. Dołącz do The Wild Oasis.
          </p>

          <div>
            <a
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Poznaj nasze luksusowe mieszkania
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
