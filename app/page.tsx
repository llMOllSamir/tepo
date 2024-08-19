import Image from "next/image";
import Link from "next/link";
import women from "../public/assist/women shopping.svg";
import bag from "../public/assist/bag.svg";
import offerPic from "../public/assist/pexels-gustavo-fring-4173116 1.svg";
import HomeSwipr from "./components/HomeSwipr";
import ElectronicesSwiper from "./components/ElectronicesSwiper";
import bags from "../public/assist/Bags.jpeg"
import Jeans from "../public/assist/Jeans.jpeg"
import shamizs from "../public/assist/shamizs.jpeg"
import blazers from "../public/assist/blazers.jpeg"


type Product = {
  src: string;
  title: string;
}
export default function Home() {

  const someProducts: Product[] = [
    { src: bags.src, title: "Bags" },
    { src: Jeans.src, title: "Jeans" },
    { src: shamizs.src, title: "shamizs" },
    { src: blazers.src, title: "blazers" },
  ];
  return (
    <section className="grow">
      <div className="container mx-auto grid grid-cols-1 gap-x-1 gap-y-5  md:grid-cols-2 px-10 md:px-24 mt-5">
        <HomeSwipr />
        <div className="flex flex-col justify-between h-full items-center gap-5">
          <figure className="w-full aspect-video relative ">
            <Link href={"/offers"}>
              <Image
                src={women}
                width={500}
                height={500}
                className=" w-full lg:w-3/4"
                alt="women"
              />
              <figcaption className="inset-0 absolute text-xl p-8 lg:w-3/4 bg-black bg-opacity-20 flex justify-start items-end lg:p-16 lg:mb-3 lg:text-3xl text-white font-extrabold">
                don’t miss our sale up to 50%
              </figcaption>
            </Link>
          </figure>
          <figure className="w-full aspect-video">
            <Image
              src={bag}
              width={500}
              height={500}
              alt="bag"
              className=" w-full lg:w-3/4"
            />
          </figure>
        </div>
      </div>

      <ElectronicesSwiper />

      <div className="flex justify-around px-3  gap-3   items-center select-none my-16 bg-gradient-to-r h-48 from-[#410707] to-[#A0F891] ">
        <div className="aspect-square  bg-[#A0F891] text-[#410707] rounded-full w-1/6 sm:w-24 sm:text-2xl text-lg md:w-36 md:text-4xl flex justify-center items-center ">
          50 %
        </div>
        <h3 className="text-white font-serif text-base w-3/6 sm:w-auto  text-center sm:text-xl md:text-4xl ">
          buy one get one free
        </h3>
        <Image
          className=" w-2/6  sm:w-40 md:w-48 "
          height={200}
          width={200}
          alt="offer"
          src={offerPic}
        />
      </div>

      <div className="container  grid grid-cols-1 gap-5 justify-center items-center mx-auto select-none   md:grid-cols-2 lg:grid-cols-4 ">
        {someProducts.map((img, index) => (
          <div
            className={`p-5 cursor-pointer  ${index % 2 ? "bg-gradient-to-r" : "bg-gradient-to-l"
              }  from-white to-black`}
            key={index}
          >
            <figure className="relative">
              <Image
                className="aspect-video w-full object-cover"
                src={img.src}
                alt="Photo"
                width={200}
                height={200}
              />
              <figcaption className="absolute inset-x-0 bottom-0 h-16 flex justify-start px-5 text-white  text-4xl ">
                {img.title}
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
}
