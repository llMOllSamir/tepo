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
      <div className="container gap-10 mx-auto grid grid-cols-1 sm:grid-cols-2 px-16  sm:px-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5">
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
