"use client";

import React from "react";
import errorPic from "../public/assist/error.svg";
import Image from "next/image";
import Link from "next/link";
type props = {
  error: Error;
  reset: () => void;
}
export default function Error({ error, reset }: props) {

  return (
    <section className="grow py-10 flex items-center flex-col justify-center">
      <Image
        className=" select-none w-full sm:w-5/6 md:w-4/6 lg:w-7/12 xl:w-4/12 "
        src={errorPic}
        alt="error"
        width={200}
        height={200}
      />
      <article className="flex flex-col items-center justify-center">
        <h2 className="text-2xl mb-3 text-red-400 font-bold">
          Error Something Went Wrong
        </h2>
        <div className="flex justify-center items-center gap-10">
          <button
            className="text-lg underline-offset-8 underline  py-1 text-red-600 font-semibold rounded-xl px-5   "
            onClick={reset}
          >
            Reload
          </button>
          <Link
            className="text-lg py-1 rounded-xl px-5 border-red-600 font-semibold border-2 hover:bg-red-600  "
            href={"/"}
          >
            Home
          </Link>
        </div>
      </article>
    </section>
  );
}
