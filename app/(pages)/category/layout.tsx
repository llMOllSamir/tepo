import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: {
    default: "Categories",
    template: "Categories : %s"
  }
}
type Props = {
  children: React.ReactNode
}
export default function categoryLayout({ children }: Props) {
  return <section className="grow">{children}</section>;
}
