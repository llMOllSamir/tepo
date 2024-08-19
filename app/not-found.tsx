import Link from "next/link";
import React from "react";
import notFound from "../public/assist/not Found.svg";
import Image from "next/image";
import Translator from "./components/Translator";
export default function NotFound() {
  return (
    <section className="flex justify-center font-serif mb-10   grow items-center flex-col select-none gap-8">
      <Image
        className="w-52 md:w-64 xl:w-72 "
        src={notFound}
        alt="Not Found"
        height={200}
        width={200}
      />
      <h2 className="text-red-600    text-5xl md:text-6xl  xl:text-8xl font-bold ">
        Page Not Found
      </h2>
      <p className="xl:text-2xl md:text-lg text-base ">
        The Page You Searching About Is Not Found
      </p>
      <Link
        href="/"
        className=" p-2 font-bold text-red-600 text-base md:text-lg hover:bg-red-600 hover:text-white transition-all duration-500 rounded-lg  "
      >
        <Translator arabic="الرئيسيه" english="Home" />
      </Link>
    </section>
  );
}
