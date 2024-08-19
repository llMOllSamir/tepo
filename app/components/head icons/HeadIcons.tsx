"use client";
import React, { useMemo } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { CiLogin } from "react-icons/ci";
import Link from "next/link";
import { useAppSelector } from "@/app/hooks/storeHooks";
import Dark from "../dark mood/Dark";

export default function HeadIcons() {
  const { numOfCartItems } = useAppSelector((state) => state.cart);
  const { token } = useAppSelector(state => state.user)
  const { count } = useAppSelector(state => state.WishList)

  const protectedIcons = useMemo(() => {
    if (!token) {
      return [{
        element: CiLogin,
        title: { ar: "تسجيل", en: "LOGIN" },
        ref: "/auth/login",
        counter: null
      }]
    } else {
      return [{
        element: FaRegHeart,
        title: { ar: "المفضله", en: "WISH LIST" },
        ref: "/wishlist",
        counter: count,
      },
      {
        element: CiShoppingCart,
        title: { ar: "السله", en: "Cart" },
        ref: "/cart",
        counter: numOfCartItems,
      },
      {
        element: GoPerson,
        title: { ar: "الشخصيه", en: "Profile" },
        ref: "/profile",
        counter: null,
      },]
    }
  }, [numOfCartItems, token, count])

  let links = useMemo(() => {
    return [
      {
        element: IoSearchOutline,
        title: { ar: "بحث", en: "SEARCH" },
        ref: "/search",
        counter: null,
      },
      ...protectedIcons
    ];
  }, [protectedIcons]);

  return (
    <>
      {links.map((link, index) => (
        <Link key={index} className={`relative`} href={link.ref}>
          {link.counter !== null && link.counter > 0 && (
            <span
              className={`absolute -top-2 -end-1 -translate-1/2 w-5  h-5 text-red-600  font-bold text-sm   rounded-full flex justify-center items-center bg-white `}
            >
              {link.counter}
            </span>
          )}

          <link.element
            title={link.title.en}
            className="select-none"
            cursor={"pointer"}
            size={"1.7rem"}
          />
        </Link>
      ))}

      <Dark />
    </>
  );
}
