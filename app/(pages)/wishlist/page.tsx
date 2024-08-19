"use client"
import Card from '@/app/components/card/Card'
import useGetWishList from '@/app/hooks/useGetWishList'
import React from 'react'
import { FaSpinner } from 'react-icons/fa6'

export default function Wishlist() {
    const { isLoading, wishList } = useGetWishList()

    return (
        <section className="grow flex flex-col gap-7 justify-center items-center  select-none">
            {
                isLoading ? <div className="flex mx-auto justify-center items-center text-red-600  mt-20 ">
                    <FaSpinner className='  animate-spin' size={"4rem"} />
                </div> :
                    <React.Fragment>
                        <h1 className="font-bold mt-5 text-red-600 lg:text-4xl sm:text-3xl text-2xl ">My Favorites Products</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                            {wishList?.map((product) => (
                                <Card product={product} key={product._id} />
                            ))}
                        </div>
                    </React.Fragment>
            }
        </section>
    )
}
