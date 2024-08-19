"use client"

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import pic1 from "../../public/assist/Property 1=Frame 209.svg"
import pic2 from "../../public/assist/Property 1=Frame 210.svg"
import pic3 from "../../public/assist/Property 1=Frame 212.svg"
import { useRouter } from 'next/navigation';

type ImagesProps = string[]

export default function HomeSwipr() {
    const data: ImagesProps = [pic1, pic2, pic3]
    const route = useRouter()

    return (
        <Swiper
            className="w-full "
            spaceBetween={1}
            slidesPerView={1}
            centeredSlides={true}
            allowTouchMove={true}
            loop={data.length > 1}
            freeMode={true}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            modules={[Autoplay]}
        >
            {data.map((img, index) => (
                <SwiperSlide key={index} onClick={() => { route.push("/products") }}  >
                    <figure className='relative w-full  cursor-pointer   '>
                        <Image
                            className="  w-full  lg:aspect-square aspect-auto drop-shadow-2xl "
                            src={img}
                            width={500}
                            height={500}
                            loading='lazy'
                            alt={"image"}
                        />
                        <figcaption className='absolute mb-1  lg:mb-2 text-xl xl:mx-16  md:text-xl lg:text-2xl lg:mx-12 text-white   font-extrabold xl:text-3xl justify-center items-center flex bottom-0 start-0 bg-opacity-40 h-2/6 end-0 bg-gray-400'>
                            Great deals
                            with tepo</figcaption>
                    </figure>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
