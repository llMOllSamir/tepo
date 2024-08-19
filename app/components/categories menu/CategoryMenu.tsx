"use client";
import { useAppSelector } from "@/app/hooks/storeHooks";
import { SubCategory } from "@/app/types/productsTypes";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CategoryMenu() {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelected] = useState("");
  const { categoriesList } = useAppSelector((state) => state.category);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const router = useRouter();

  // get sub categories
  type SubCategoriesResponse = {
    data: SubCategory[];
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let getSubCategories = async (id: string) => {
    const res = await axios.get<SubCategoriesResponse>(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    setSubCategories(res.data.data)
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  // handel click
  const handleCategoryClick = () => {
    if (open) return router.push("/category");
    setOpen(true);
  };
  // handle Out
  const handleOut = () => {
    handleOpen();
    setSubCategories([]);
    setSelectedCategoryId("");
  };

  useEffect(() => {
    const timerID = setTimeout(() => {
      if (selectedCategoryId.length > 0) {
        getSubCategories(selectedCategoryId)
      }
    }, 100)
    return () => {
      clearTimeout(timerID)
    }
  }, [getSubCategories, selectedCategoryId])

  return (
    <section
      onMouseEnter={handleOpen}
      onMouseLeave={handleOut}
      className="relative h-full z-30 flex justify-center items-center "
    >
      <h2 onClick={handleCategoryClick} className="text-red-600 select-none cursor-pointer font-bold  md:text-base text-sm">
        Categories
      </h2>
      {open && (
        <ul className="absolute top-full z-30  py-4 select-none rounded-e-xl rounded-t-none bg-white  -start-7 w-52   shadow-black  shadow-md ">
          {categoriesList.length > 0 &&
            categoriesList.map((category) => (
              <li
                className="py-3 px-4 cursor-pointer font-semibold    hover:bg-red-600"
                key={category._id}
                onClick={handleOut}
                onMouseEnter={() => {
                  setSelectedCategoryId(category._id);
                  setSelected(category.name);
                }}
              >
                <Link className="w-full" href={`/category/${category.slug}`}>{category.name}</Link>
              </li>
            ))}
          {subCategories.length > 0 && (
            <li>
              <ul className="absolute start-full z-30  top-0 h-full overflow-auto  w-72 flex px-6 flex-col py-4   rounded-lg rounded-s-none shadow-md   shadow-black bg-gradient-to-l from-red-400 to-red-100 ">
                <p className="font-bold text-start py-3 text-red-600   text-lg">
                  {selectedCategory}
                </p>
                {subCategories.map((sub) => (
                  <li
                    className="py-3 px-4 cursor-pointer font-semibold w-full   hover:bg-red-600"
                    onClick={handleOut}
                    key={sub._id}
                  >
                    <Link className="w-full" href={`/category/subcategory/${sub.slug}`}>
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      )}
    </section>
  );
}
