"use client";
import React, { useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { CiLogin } from "react-icons/ci";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/hooks/storeHooks";
import Dark from "../dark mood/Dark";
import Translator from "../Translator";
import { BiLogOut } from "react-icons/bi";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import { removeUser } from "@/app/Redux/slices/userSlice";
import { emptyCart } from "@/app/Redux/slices/cartSlice";
import { emptyWishlist } from "@/app/Redux/slices/WishListSlice";

export default function HeadIcons() {
  const [showModal, setShowModal] = useState(false)
  const { numOfCartItems } = useAppSelector((state) => state.cart);
  const { token } = useAppSelector(state => state.user)
  const { count } = useAppSelector(state => state.WishList)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const logOut = () => {
    dispatch(removeUser())
    dispatch(emptyCart())
    dispatch(emptyWishlist())
    setShowModal(false)
    router.replace("/auth/login")
  }

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
        ref: "/user",
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
      {token && <button onClick={() => setShowModal(true)} className="w-16 flex  flex-col justify-center  items-center">
        <BiLogOut
          className="select-none"
          cursor={"pointer"}
          title={"Log Out"}
          size="1.7rem"
        />
      </button >}
      <Modal isOpen={showModal} onClose={() => { setShowModal(false) }}  >
        <div className="w-full max-w-96 min-h-40 flex flex-col  p-5 rounded-xl text-black bg-white justify-between ">
          <h2 className="text-lg font-bold "><Translator english="Are you sure you want to log out?" arabic=" هل انت متاكد من تسجيل الخروج ؟" /></h2>
          <div className="flex justify-end gap-10  ">
            <button onClick={logOut} className="bg-red-600  w-16 text-white p-2 rounded-lg font-bold"><Translator english="Yes" arabic="نعم" /></button>
            <button onClick={() => setShowModal(false)} className="bg-gray-500 w-16 text-white p-2 rounded-lg font-bold"><Translator english="No" arabic="لا" /></button>
          </div>
        </div>
      </Modal>
      <Dark />
    </>
  );
}
