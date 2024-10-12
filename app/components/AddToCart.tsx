"use client";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { Product } from "../types/productsTypes";
import { addToCart } from "../Redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import Translator from "./Translator";

type ButtonProps = React.ComponentProps<"button"> & {
  product: Product
}
export default function BtnCart({ product, ...restProps }: ButtonProps) {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(state => state.user)
  const { status } = useAppSelector(state => state.cart)
  const router = useRouter();
  let addProduct = () => {
    if (token) {
      dispatch(addToCart(product._id))
    } else {
      router.push("/login")
    }
  };



  return (
    <button
      {...restProps}
      onClick={addProduct}
    >
      {(status.loading && status.product === product._id) ? <FaSpinner size={20} className="animate-spin" />
        : <><Translator arabic="اضف الي السله " english="add to " />  <CiShoppingCart fontSize={"20px"} className="ms-1" /></>}
    </button>
  );
}
