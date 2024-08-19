"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Product } from "@/app/types/productsTypes";

type SwiperProps = {
  list: Product
}

export default function SwiperProvider({ list }: SwiperProps) {
  return (
    <Swiper
      className="w-full"
      spaceBetween={5}
      slidesPerView={1}
      centeredSlides={true}
      loop={list?.images.length > 1}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      {list?.images?.map((img, index) => (
        <SwiperSlide className="w-full" key={index}>
          <Image
            className="w-full"
            src={img}
            width={100}
            height={100}
            alt={list.title}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
