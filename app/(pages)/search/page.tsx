"use client";
import Card from "@/app/components/card/Card";
import Translator from "@/app/components/Translator";
import { useAppDispatch, useAppSelector } from "@/app/hooks/storeHooks";
import { getProducts } from "@/app/Redux/slices/productSlice";
import React, { useEffect, useRef, useState } from "react";

export default function SearchPage() {
  const { isArabic } = useAppSelector((state) => state.lang);
  const { productList } = useAppSelector((state) => state.product);
  const [term, setTerm] = useState<string | null>("");
  const [placeHolder, setPlaceholder] = useState("")
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string | null>(null);
  const searchInput = useRef<HTMLInputElement>(null!);
  const dispatch = useAppDispatch();

  const handleTerm = () => {
    if (searchInput.current.value.length > 0) {
      setTerm(searchInput.current.value);
    } else {
      setTerm(null);
      setFilter(null);
    }
  };

  const filterProducts = () => {
    if (filter) {
      return productList.filter((product) =>
        product.title.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return [];
  };

  useEffect(() => {
    dispatch(getProducts(page));
  }, [dispatch, page]);

  useEffect(() => {
    let x = setTimeout(() => {
      setFilter(term);
    }, 500);
    return () => {
      clearTimeout(x);
    };
  }, [term]);
  useEffect(() => {

    if (isArabic) {
      setPlaceholder("ابحث باسم المنتج")
    } else {
      setPlaceholder("Product Name")
    }

  }, [isArabic])

  return (
    <section className="grow  my-5">
      <article className="text-center  select-none space-y-5">
        <h1 className="text-4xl text-red-700 font-extrabold ">Tepo Shopping</h1>
        <p className="text-lg font-bold ">
          <Translator english="Search About What You Want" arabic="دعنا نساعدك علي ايجاد منتجك الخاص" />
        </p>
      </article>
      <form className="flex justify-center items-center my-5">
        <input
          ref={searchInput}
          onChange={handleTerm}
          type="search"
          placeholder={placeHolder}
          className="outline-none border-2 text-red-600 text-lg border-red-600 placeholder-red-600 w-3/4 md:w-1/2 px-5 py-3 bg-transparent rounded-full "
        />
      </form>
      {
        filterProducts().length > 0 ?
          <div className=" container  grid grid-cols-1 sm:p-10 sm:grid-cols-2 md:p-0 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 p-20 gap-5 ">
            {
              filterProducts().map(product => <Card key={product._id} product={product} />)
            }
          </div> : <div className="flex justify-center items-center h-24">
            <p className="text-red-600 font-bold">
              Search For Your Product
            </p>
          </div>
      }
    </section>
  );
}
