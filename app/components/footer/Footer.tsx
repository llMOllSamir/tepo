import React from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { CiTwitter } from "react-icons/ci";
import { RiYoutubeLine } from "react-icons/ri";
import Translator from "../Translator";
import Lang from "../lang/Lang";
import ScrollUp from "../ScrollUp";

function Footer() {
  return (
    <footer className=" md:grid mb-16 md:mb-0  cursor-default capitalize  grid- -3 gap-y-10 lg:px36 pt-0  py-10 px-4 md:px-16 bg-gray-800 text-white relative">
      <ScrollUp />
      <section className="my-6 md:my-0">
        <h4 className="text-[24px] mb-6  font-bold ">
          <Translator arabic="حول تيبو" english="about tepo" />
        </h4>
        <article className="flex flex-col  gap-y-2  ">
          <p>
            <Translator english="Privicy Policy" arabic="سياسة الخصوصية" />
          </p>
          <p>
            <Translator english="Tepo Careers" arabic="وظائف تيبو" />
          </p>
          <p>
            <Translator
              english="Terms and Condtions"
              arabic="الشروط والأحكام"
            />
          </p>
        </article>
      </section>
      <section className="my-6 md:my-0">
        <h4 className="text-[24px] mb-6 font-bold">
          <Translator arabic="دعنا نساعدك" english="let us help you" />
        </h4>
        <article className="flex flex-col  gap-y-2 ">
          <p>
            <Translator arabic="بيع علي تيبو" english="sell on tepo" />
          </p>
          <p>
            <Translator
              arabic="أعلن عن منتجك"
              english=" advertise your product"
            />
          </p>
          <p>
            <Translator arabic="التوصيل" english="delivery" />
          </p>
        </article>
      </section>
      <section className="my-6 md:my-0">
        <h4 className="text-[24px] mb-6 font-bold">
          <Translator arabic="طريقة الدفع او السداد" english="payment method" />
        </h4>
        <article className="flex flex-col  gap-y-2 ">
          <p>
            <Translator arabic="كارت بنكي" english="visa" />
          </p>
          <p>
            <Translator arabic="فوري" english="fawary" />
          </p>
          <p>
            <Translator arabic="فودافون كاش" english="vodafone cash" />
          </p>
        </article>
      </section>
      <section className="my-6 md:my-0">
        <h4 className="text-[24px] mb-6 font-bold">
          <Translator arabic="صمم بواسطة" english="designed by" />
        </h4>
        <address className="flex flex-col gap-y-3">
          <strong>
            <Translator arabic="منه المصري" english="Menna Elmasry" />
          </strong>
          <Link
            className="underline underline-offset-4"
            href={"mailto:mennaelmasry063@gmail.com"}
          >
            mennaelmasry063@gmail.com
          </Link>
          <Link
            className="underline underline-offset-4"
            href={"https://www.behance.net/mennaelmasry3"}
            target="_blank"
          >
            https://www.behance.net/mennaelmasry3
          </Link>
        </address>
      </section>
      <section className="my-6 md:my-0">
        <h4 className="text-[24px] mb-6 font-bold">
          <Translator english="Join Us" arabic="انضم إلينا" />
        </h4>
        <address className="text-2xl flex  items-center gap-5">
          <Link
            className="hover:scale-125 transition-transform duration-500"
            href={"https://www.instagram.com/mohamed_samir_elshami/"}
            target="_blank"
          >
            <FaInstagram />
          </Link>
          <Link
            className="hover:scale-125 transition-transform duration-500"
            href={"https://www.facebook.com/profile.php?id=100082859111033"}
            target="_blank"
          >
            <FiFacebook />
          </Link>
          <Link
            className="hover:scale-125 transition-transform duration-500"
            href={"https://twitter.com/?lang=ar"}
            target="_blank"
          >
            <CiTwitter />
          </Link>
          <Link
            className="hover:scale-125 transition-transform duration-500"
            href={"https://youtube.com/@Fekra-2025?si=0v-rE_pQ5pP86TeL"}
            target="_blank"
          >
            <RiYoutubeLine />
          </Link>
        </address>
      </section>
      <Lang />
      <h6 className="text-center text-sm col-span-3">All Rights Reserved &copy; 2024 <span className="text-red-600 font-bold">Mohamed Samir</span></h6>
    </footer>
  );
}

export default Footer;
