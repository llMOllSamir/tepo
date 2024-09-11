"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./style.module.css";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/hooks/storeHooks";
import { User } from "@/app/types/sliceTypes";
import { getUserAddress, setUser } from "@/app/Redux/slices/userSlice";
import { getCart } from "@/app/Redux/slices/cartSlice";
import { getCategories } from "@/app/Redux/slices/categoriesSlice";
import Lang from "../lang/Lang";
import Translator from "../Translator";
import CategoryMenu from "../categories menu/CategoryMenu";
import { getWishList } from "@/app/Redux/slices/WishListSlice";


export default function NavBar() {
  const dispatch = useAppDispatch()
  const { token } = useAppSelector(state => state.user)

  let links = [
    { en: "HOME", ar: "الرئيسيه", ref: "/" },
    { en: "PRODUCTS", ar: "المنتجات", ref: "/products" },
    { en: "OFFERS", ar: "العروض", ref: "/offers" },
  ];

  let activeLink = styles.active;
  let pathName = usePathname();


  useEffect(() => {
    const userToken: string | null = localStorage.getItem("token");
    const userInfo: string | null = localStorage.getItem("user");
    if (userToken && userInfo) {
      const user: User = JSON.parse(userInfo || "");
      dispatch(setUser({ token: userToken, user }));
    } else {
      dispatch(setUser({ token: null, user: null }));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    dispatch(getCategories());
  }, [dispatch]);


  useEffect(() => {
    if (token) {
      dispatch(getUserAddress());
      dispatch(getCart());
      dispatch(getWishList());
    }
  }, [token, dispatch])

  return (
    <nav
      className={`bg-white fixed z-10 inset-x-0 top-20   shadow-sm h-14 shadow-black hidden justify-between  items-center px-12  
        dark:bg-gray-800  dark:text-white  md:flex
      `}
    >
      <CategoryMenu />
      <ul className="flex gap-6 font-extrabold md:text-md text-sm select-none    text-red-600 ">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              scroll={true}
              className={`${styles.link} ${pathName.split("/")[1] === (link.ref).split("/")[1] ? activeLink : ""
                } rtl:text-base`}
              href={link.ref}
            >
              <Translator arabic={link.ar} english={link.en} />
            </Link>
          </li>
        ))}
      </ul>
      <Lang />
    </nav>
  );
}
