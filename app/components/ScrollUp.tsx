"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import Translator from "./Translator";

export default function ScrollUp() {
  let [scrollY, setScrollY] = useState(0);

  let handleClick = () => {
    window.scroll(0, 0);
  };
  let handelScroll = () => {
    setScrollY(window.scrollY);
  };
  useEffect(() => {
    handelScroll();
    window.addEventListener("scroll", handelScroll);
    return () => {
      window.removeEventListener("scroll", handelScroll);
    };
  }, []);

  return (
    <section
      className={` col-span-3  -mx-4 md:-mx-16 md:static rounded-full md:rounded-none z-20 md:z-0   fixed end-10 bottom-20 flex justify-center items-center transition-opacity ${scrollY > 0 ? "opacity-100 " : "opacity-0"
        }  duration-1000  h-10 bg-red-600  -translate-y-6`}
    >
      <button
        className="text-lg font-semibold md:flex hidden    gap-4 items-center justify-center"
        onClick={handleClick}
      >
        <Translator arabic="اعلي الصفحه" english="Back to top" />
        <IoIosArrowUp />
      </button>
      <button
        className="text-lg font-semibold md:hidden flex w-10 h-10    items-center justify-center"
        onClick={handleClick}
      >
        <IoIosArrowUp />
      </button>
    </section>
  );
}
