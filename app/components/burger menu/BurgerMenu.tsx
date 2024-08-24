"use client";
import React, { useRef, useState } from "react";
import styles from "./styles.module.css";
import { SlMenu } from "react-icons/sl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Dark from "../dark mood/Dark";
import Translator from "../Translator";

export default function BurgerMenu() {
  const [show, setShow] = useState(false);
  const navLinks = useRef<HTMLUListElement>(null!);
  const icon = useRef<HTMLElement>(null!);
  const pathName = usePathname();

  // links for routing
  let links = [
    { en: "HOME", ar: "الرئيسيه", ref: "/" },
    { en: "PRODUCTS", ar: "المنتجات", ref: "/products" },
    { en: "OFFERS", ar: "العروض", ref: "/offers" },
    { en: "Profile", ar: "الشخصيه", ref: "/profile" },
  ];

  // styling Icon
  let handleShow = () => {
    const firstChildElement = icon.current.firstChild as HTMLElement | null;
    if (!show) {
      firstChildElement?.classList?.add("rotate-90");
      setShow(true);
      setTimeout(() => {
        navLinks.current.classList.toggle(styles.show);
      }, 100);
    } else {
      navLinks.current.classList.toggle(styles.show);
      firstChildElement?.classList.remove("rotate-90");
      setTimeout(() => {
        setShow(false);
      }, 500);
    }
  };

  return (
    <nav
      ref={icon}
      className=" col-start-12 select-none  md:hidden text-white"
    >
      <SlMenu
        size={"1.5rem"}
        className="select-none transition-all duration-500 "
        cursor={"pointer"}
        onClick={handleShow}
      />

      {show && (
        <ul
          ref={navLinks}
          className={` ${styles.nav} dark:bg-gray-800 bg-white`}
        >
          {links.map((link, index) => (
            <li key={index}>
              <Link
                className={`${pathName.split("/")[1] === link.ref.split("/")[1] && " border-b-2   border-red-600 "
                  }`}
                onClick={handleShow}
                href={link.ref}
              >
                <Translator arabic={link.ar} english={link.en} />
              </Link>
            </li>
          ))}
          <li
            onClick={handleShow}
            className=" flex gap-5  justify-center items-center"
          >
            <Dark />
          </li>
        </ul>
      )}
    </nav>
  );
}
