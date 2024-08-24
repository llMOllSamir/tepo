import React from "react";
import Link from "next/link";
import { Category, Product } from "@/app/types/productsTypes";
import Card from "@/app/components/card/Card";

type Props = {
  params: {
    categorySlug: string;
  }
};
export function generateMetadata({ params }: Props) {
  return {
    title: params.categorySlug,
  };
}

export default async function CategoryDetails({ params }: Props) {
  let { categorySlug } = params;
  let data = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories?slug=${categorySlug}`,
    { next: { revalidate: 3600 } }
  );
  let { data: category }: { data: Category[] } = await data.json();
  let response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category[in]=${category[0]._id}`
  );
  let { data: products }: { data: Product[] } = await response.json();
  return (
    <div className=" my-10 ">
      <div className="container gap-5   grid px-16 xs:px-2 md:px-4  grid-cols-1  xs:grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <div className="  col-span-6 gap-6 flex flex-col justify-center items-center">
          <h1 className="font-extrabold text-red-600  text-base md:text-xl lg:text-2xl xl:text-3xl">
            There is No Products From {category[0].name} Yet
          </h1>
          <Link
            href={"/category"}
            className="px-5 py-2 rounded-2xl text-sm md:text-lg bg-red-600 text-white font-semibold"
          >
            Check Categories
          </Link>
        </div>
      )}
    </div>
  );
}
