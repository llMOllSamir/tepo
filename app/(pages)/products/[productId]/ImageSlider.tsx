"use client"
import Image from 'next/image'
import React, { useState } from 'react'

type ImageSliderProps = {
    imageCover: string,
    images: string[],
    title: string
}
export default function ImageSlider({ imageCover, images, title }: ImageSliderProps) {
    const [imgSrc, setImgSrc] = useState(imageCover)


    return (
        <div className='py-5 flex flex-col gap-2  col-span-1 justify-center items-center lg:flex-row '>
            <div className='flex gap-3 order-2 lg:flex-col'>
                {
                    images.slice(0, 4).map((src, index) => <Image
                        onClick={() => { setImgSrc(src) }}
                        key={index}
                        loading='lazy'
                        src={src}
                        className=" mx-auto w-2/12 rounded-lg cursor-pointer lg:w-2/4  aspect-square "
                        alt={title}
                        width={200}
                        height={200}
                    />)
                }
            </div>
            <div className='px-10 sm:px-0 order-1 lg:order-2 w-full'>
                <Image
                    src={imgSrc}
                    loading='lazy'
                    className=" mx-auto  rounded-xl   w-full    aspect-[9/12] "
                    alt={title}
                    width={200}
                    height={200}
                />
            </div>


        </div>
    )
}
