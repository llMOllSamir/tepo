import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Offers",
};

export default function Offers() {
  return (
    <section className="grow flex flex-col gap-7 justify-center items-center">
      <h1 className="font-bold mt-5 text-red-600 lg:text-3xl sm:text-xl text-lg ">
        Sorry There Is No Offers Today
      </h1>
      <Link
        href={"/"}
        className="text-white bg-red-600 px-5 py-2 rounded-3xl  "
      >
        Home
      </Link>
    </section>
  );
}
