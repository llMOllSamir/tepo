"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import { GoHome } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import { BiCategory, BiLogOut } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { usePathname, useRouter } from "next/navigation";
import Translator from "../Translator";
import { useAppDispatch, useAppSelector } from "@/app/hooks/storeHooks";
import { removeUser } from "@/app/Redux/slices/userSlice";
import Modal from "../Modal";
import { emptyCart } from "@/app/Redux/slices/cartSlice";
import { emptyWishlist } from "@/app/Redux/slices/WishListSlice";

export default function BottomNav() {
  const [showModal, setShowModal] = useState(false)
  const { numOfCartItems } = useAppSelector((state) => state.cart);
  const { count } = useAppSelector((state) => state.WishList);
  const { token } = useAppSelector(state => state.user)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const protectedIcons = useMemo(() => {
    if (!token) {
      return [{
        element: CiLogin,
        title: { ar: "تسجيل", en: "LOGIN" },
        ref: "/auth/login",
        counter: 0
      }]
    } else {
      return [
        {
          element: CiShoppingCart,
          title: { ar: "السله", en: "Cart" },
          ref: "/cart",
          counter: numOfCartItems || 0,
        }, {
          element: FaRegHeart,
          title: { ar: "المفضله", en: "Wishlist" },
          ref: "/wishlist",
          counter: count,
        },

      ]
    }
  }, [numOfCartItems, token, count])


  let links = useMemo(() => {
    return [
      {
        element: GoHome,
        title: { ar: "الرئيسيه", en: "HOME" },
        ref: "/",
        counter: 0,
      },
      {
        element: BiCategory,
        title: { ar: "الفئات", en: "CATEGORIES" },
        ref: "/category",
        counter: 0,
      },
      {
        element: IoSearchOutline,
        title: { ar: "بحث", en: "SEARCH" },

        ref: "/search",
        counter: 0,
      },

      ...protectedIcons
    ];
  }, [protectedIcons]);

  let pathName = usePathname();

  const HandlePath = (ref = "/") => {
    return pathName === ref;
  };
  const logOut = () => {
    dispatch(removeUser())
    dispatch(emptyCart())
    dispatch(emptyWishlist())
    setShowModal(false)
    router.replace("/")
  }
  return (
    <>
      <nav className="fixed md:hidden flex justify-center font-extrabold items-center gap-3    z-20 bottom-0 inset-x-0 text-black dark:text-white h-20 bg-white dark:bg-gray-800  shadow-2xl shadow-black dark:shadow-white ">
        {links.map((element, index) => (
          <Link
            key={index}
            className={`w-16 flex  flex-col justify-center relative items-center ${HandlePath(element.ref) ? "text-red-600" : ""
              }`}
            href={element.ref}
          >
            <element.element
              title={element.title.en}
              size={HandlePath(element.ref) ? "1.75rem" : "2rem"}
            />
            {HandlePath(element.ref) && (
              <small className="text-sm text-center">
                <Translator
                  arabic={element.title.ar}
                  english={element.title.en}
                />
              </small>
            )}
            {element.counter > 0 && (
              <small className="absolute text-sm top -top-3 bg-white dark:text-white dark:bg-gray-800 text-black size-5 flex items-center justify-center rounded-full end-3  ">
                {element.counter}
              </small>
            )}
          </Link>
        ))}
        {token && <button onClick={() => setShowModal(true)} className="w-16 flex  flex-col justify-center  items-center">
          <BiLogOut
            size="1.75rem"
          />
          <small className="text-sm text-center">
            <Translator
              arabic="الخروج"
              english="Logout"
            />
          </small>
        </button>}

      </nav>
      <Modal isOpen={showModal} onClose={() => { setShowModal(false) }}  >
        <div className="w-full max-w-96 min-h-40 flex flex-col  p-5 rounded-xl text-black bg-white justify-between ">
          <h2 className="text-lg font-bold "><Translator english="Are you sure you want to log out?" arabic=" هل انت متاكد من تسجيل الخروج ؟" /></h2>
          <div className="flex justify-end gap-10  ">
            <button onClick={logOut} className="bg-red-600  w-16 text-white p-2 rounded-lg font-bold"><Translator english="Yes" arabic="نعم" /></button>
            <button onClick={() => setShowModal(false)} className="bg-gray-500 w-16 text-white p-2 rounded-lg font-bold"><Translator english="No" arabic="لا" /></button>
          </div>
        </div>
      </Modal></>
  )
}
