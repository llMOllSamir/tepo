import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import BtnCart from "../AddToCart";
import { Product } from "@/app/types/productsTypes";
import SwiperProvider from "./SwiperCardProvider";
import AddToWishList from "../AddToWishList";


type CardProps = React.ComponentProps<"div"> & {
  product: Product
}
export default function Card({ product }: CardProps) {
  return (
    <div className="card">
      <div className="box rounded-lg ">
        <div className="front flex justify-center cursor-pointer items-center">
          <SwiperProvider list={product} />
        </div>
        <div className="back">
          <Link className="w-full h-full" href={`/products/${product._id}`}>
            <figure className="w-3/4 flex justify-center   items-center mx-auto">
              <Image
                className="w-full"
                src={product.imageCover}
                width={100}
                height={100}
                alt={product.title}
              />
            </figure>
          </Link>
          <h2 className="text-start text-gray-600 dark:text-gray-400">
            {product.title.split(" ").slice(0, 3).join(" ")}
          </h2>
          <div className="flex gap-1 ">
            {"stars".split("").map((_, index) => (
              <FaStar
                fontSize={"large"}
                key={index}
                fill={
                  Math.round(product.ratingsAverage) > index
                    ? "gold"
                    : "hsl(0,0%,50%,25%)"
                }
              />
            ))}
          </div>
          <p className="font-semibold">{product.price} L.E</p>
          <div className="flex gap-3">
            <BtnCart product={product} className="capitalize grow flex justify-center text-sm items-center bg-red-500  text-white hover:bg-red-700 ms-auto me-2 py-2 px-6 rounded-2xl " />
            <AddToWishList productId={product._id} className="flex justify-center items-center " />
          </div> </div>
      </div>
    </div>
  );
}
