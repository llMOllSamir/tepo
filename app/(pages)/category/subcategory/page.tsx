import Link from "next/link";
import React from "react";
import logo from "../../../../public/assist/Logo.svg";
import Image from "next/image";


import { Metadata } from "next";
import { SubCategory as SubCategoryType } from "@/app/types/productsTypes";


export const metadata: Metadata = {
  title: "Sub Categories",
};

export default async function Subcategory() {
  let data = await fetch(
    "https://ecommerce.routemisr.com/api/v1/subcategories",
    {
      next: {
        revalidate: 3600,
      },
    }
  );
  let { data: subCategories }: { data: SubCategoryType[] } = await data.json();

  return (
    <div className=" my-10 container gap-5 mx-auto grid place-items-baseline sm:grid-cols-2 px-16  sm:px-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-6 ">
      {subCategories.map((subCategory) => (
        <Link
          href={`/category/subcategory/${subCategory.slug}`}
          key={subCategory._id}
          className="mx-auto flex flex-col   w-full h-full justify-center text-red-600 items-center px-5 py-2 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-500 "
        >
          <Image
            src={logo}
            alt="Sub Categories"
            className="w-3/4 aspect-square drop-shadow-xl blur-sm hover:blur-0 transition-all duration-500  "
            width={200}
            height={200}
          />
          <h3 className="text-lg text-center  font-bold ">
            {subCategory?.name}
          </h3>
        </Link>
      ))}
    </div>
  );
}
