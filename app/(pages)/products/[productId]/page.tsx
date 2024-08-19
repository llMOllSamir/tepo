import BtnCart from "@/app/components/AddToCart";
import React, { Suspense } from "react";
import { FaSpinner, FaStar } from "react-icons/fa6";
import ImageSlider from "./ImageSlider";
import Link from "next/link";
import { Metadata } from "next";
import { Product } from "@/app/types/productsTypes";
import RecommendedProducts from "./RecommendedProducts";

/**handle meta data description and title  */
type ProductDetailsProps = {
  params: {
    productId: string
  }
}
export async function generateMetadata({ params }: ProductDetailsProps): Promise<Metadata> {
  let { productId } = params;
  // fetch data
  const { data }: { data: Product } = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productId}`
  ).then((res) => res.json());

  return {
    title: {
      absolute: data.title
    },
    description: data.description,
  };
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
  let { productId } = params;
  /** fetching one product details by id and should be 24 litter */
  let getProductDetails = async () => {
    let res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`
    );
    const { data }: { data: Product } = await res.json();
    return data;
  };

  const data = await getProductDetails();

  return (
    <section className=" mx-auto select-none container  grid  grid-cols-1 sm:grid-cols-3">

      <ImageSlider title={data.title} imageCover={data.imageCover} images={data.images} />

      <div className="sm:col-span-2 h-full  divide-y-4 space-y-5  p-5">
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl font-serif font-bold">{data.title}</h1>
          <div className="flex gap-3">  {"stars".split("").map((_, index) => (
            <FaStar
              className="md:size-6 lg:size-8 size-5"
              key={index}
              fill={
                Math.round(data.ratingsAverage) > index
                  ? "gold"
                  : "hsl(0,0%,50%,25%)"
              }
            />
          ))}</div>
        </div>
        <div className="py-5 text-gray-500 space-y-8 dark:text-gray-300">
          <p className="font-semibold text-base  md:text-lg "> List Price : <span> {data.price} <sup> EGP</sup> </span></p>
          <p className="font-semibold text-base  md:text-lg "> Brand :<Link href={`/brand/${data.brand.slug}`} className="text-red-600">
            {data.brand.name}   </Link> </p>
          <p className="font-semibold text-base  md:text-lg ">
            {data.description}
          </p>
        </div>
        <div className="py-5">
          <BtnCart product={data} className="capitalize flex justify-center  text-sm items-center bg-red-500  text-white hover:bg-red-700 ms-auto me-2 py-2 px-6 rounded-2xl " />
        </div>
      </div>
      <div className="my-3 pt-3 border-t-2 border-gray-500 border-opacity-55 col-span-1 sm:col-span-3">
        <h3 className="font-semibold text-lg px-5 my-3">
          Products related to this item
        </h3>
        <Suspense fallback={
          <div className="flex mx-auto justify-center items-center text-red-600  ">
            <FaSpinner className='  animate-spin' size={"4rem"} />
          </div>}>
          <RecommendedProducts subCategoryId={data.subcategory[0]._id} />
        </Suspense>
      </div>
    </section>
  );
}
