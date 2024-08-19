import { Brand as BrandType } from "@/app/types/productsTypes";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Brands",
};

export default async function Brand() {
  const data = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
    next: {
      revalidate: 3600,
    },
  });
  const { data: brands }: { data: BrandType[] } = await data.json();

  return (
    <section className="grow">
      <div className=" my-10 container gap-10 mx-auto grid grid-cols-2 px-16  sm:px-2  sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5">
        {brands.length > 0 && brands.map((brand) => (
          <Link
            href={`/brand/${brand?.slug}`}
            key={brand._id}
            className="mx-auto "
          >
            <Image
              src={brand.image}
              alt={brand.slug}
              width={200}
              height={200}
              className="aspect-square rounded-3xl  shadow-lg dark:shadow-gray-400 hover:scale-125 transition-transform"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
