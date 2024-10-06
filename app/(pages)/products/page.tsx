import React from "react";
import { Metadata } from "next";
import { Product } from "@/app/types/productsTypes";
import Card from "@/app/components/card/Card";
import Pagination from "@/app/components/Pagination";

/** handle meta title and description  */
export const metadata: Metadata = {
  title: "Products",
  description:
    " this is our products you can find any thing you want and any thing you need ",
};

type props = {
  searchParams?: {
    page?: number
  };
}
type ResponseJson = {
  results: number
  metadata: { currentPage: number, numberOfPages: number, limit: number, nextPage?: number, prevPage?: number }
  data: Product[]
}
export default async function Products({ searchParams }: props) {
  const page = searchParams?.page || 1
  let products = await fetch(`https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=24`, {
    next: { revalidate: 60 },
  })

  const data: ResponseJson = await products.json()

  return (
    <section className=" grow ">
      {data.metadata && data.data.length > 0 && <Pagination to="/products" metadata={data.metadata} />}

      <div className="my-10 container gap-5  grid  px-16 xs:px-2 md:px-4  grid-cols-1  xs:grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {data?.data?.map((product: Product) => (
          <Card key={product?._id} product={product} />
        ))}
      </div>
      {data.metadata && <Pagination to="/products" metadata={data.metadata} />}
    </section>
  );
}
