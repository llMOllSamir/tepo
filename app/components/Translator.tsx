"use client";
import React from "react";
import { useAppSelector } from "../hooks/storeHooks";

type Props = {
  english: string;
  arabic: string;
}
export default function Translator({ english, arabic }: Props) {
  let { isArabic } = useAppSelector((state) => state.lang);
  return isArabic ? arabic : english
}
