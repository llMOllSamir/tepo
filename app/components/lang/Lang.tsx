"use client";
import React, { useCallback, useEffect } from "react";
import arabic from "../../../public/assist/arabic.png";
import english from "../../../public/assist/english.png";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/app/hooks/storeHooks";
import { checkLangState, setLangState } from "@/app/Redux/slices/langSlice";

export default function Lang() {
  let { isArabic } = useAppSelector((state) => state.lang);
  let dispatch = useAppDispatch();

  //  handle Change Lang
  let handleLangClick = useCallback(() => {
    if (isArabic === false) {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";

      dispatch(setLangState(true));
    } else {
      document.documentElement.dir = "ltr";
      dispatch(setLangState(false));
      document.documentElement.lang = "en";
    }
  }, [dispatch, isArabic]);

  useEffect(() => {
    dispatch(checkLangState());
  }, [dispatch]);

  useEffect(() => {
    if (isArabic) {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    }
  }, [isArabic]);

  return (
    <>
      <Image
        className="w-8 select-none rtl:hidden   cursor-pointer"
        src={english}
        width={24}
        height={16}
        alt="english"
        onClick={handleLangClick}
      />

      <Image
        className="w-8 select-none rtl:block  hidden cursor-pointer"
        src={arabic}
        width={24}
        height={16}
        alt="arabic"
        onClick={handleLangClick}
      />
    </>
  );
}
