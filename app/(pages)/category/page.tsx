import { Category as CategoryType } from "@/app/types/productsTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Category() {
  let data = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
    next: {
      revalidate: 3600,
    },
  });
  let { data: categories }: { data: CategoryType[] } = await data.json();

  return (
    <div className=" my-10 container select-none gap-10 mx-auto grid grid-cols-2 px-16  sm:px-2  sm:grid-cols-3  lg:grid-cols-5 xl:grid-cols-6">
      {categories.map((category) => (
        <Link
          href={`/category/${category.slug}`}
          key={category._id}
          className="mx-auto shadow-lg p-3 rounded-3xl dark:shadow-gray-400 "
        >
          <Image
            src={category.image}
            alt={category.slug}
            width={200}
            height={200}
            className="aspect-square rounded-3xl hover:scale-125 transition-transform"
          />
          <h3 className="text-lg text-red-600 text-center mt-3 font-bold">
            {category.name}
          </h3>
        </Link>
      ))}
    </div>
  );
}
