"use client"
import Card from '@/app/components/card/Card'
import { useAppSelector } from '@/app/hooks/storeHooks'
import useGetWishList from '@/app/hooks/useGetWishList'
import Link from 'next/link'
import React, { useCallback, useMemo } from 'react'
import { FaSpinner } from 'react-icons/fa6'

export default function Wishlist() {
    const { isLoading, wishList: data } = useGetWishList()
    const { wishList } = useAppSelector(state => state.WishList)

    const wishListData = useCallback(() => {
        return data.filter((product) => wishList.includes(product._id))
    }, [data, wishList])

    return (
        <section className="grow flex flex-col gap-7 justify-center items-center  select-none">
            {
                isLoading ? <div className="flex mx-auto justify-center items-center text-red-600  mt-20 ">
                    <FaSpinner className='  animate-spin' size={"4rem"} />
                </div> :
                    <React.Fragment>
                        <h1 className="font-bold mt-5 text-red-600 lg:text-4xl sm:text-3xl text-2xl ">My Favorites </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                            {wishListData().length > 0 ? wishListData().map((product) => (
                                <Card product={product} key={product._id} />
                            )) : <div className='col-span-12 flex flex-col justify-center mt-10 gap-5 items-center'>
                                <h2 className="font-bold text-black dark:text-white   lg:text-2xl sm:text-xl text-lg ">No Products In Your Wishlist</h2>
                                <Link href={"/products"} className='text-white bg-red-600 px-6 py-2 rounded-3xl'> Add More ... </Link>
                            </div>}
                        </div>
                    </React.Fragment>
            }
        </section>
    )
}
