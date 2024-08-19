import React from "react";
import style from "./loading.module.css";
export default function Loading() {
  return (
    <section className={`${style.loading} dark:bg-gray-800 bg-white`}>
      <section className={style.loader}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </section>
    </section>
  );
}
