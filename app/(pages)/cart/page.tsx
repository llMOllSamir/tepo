"use client"
import { useAppDispatch, useAppSelector } from '@/app/hooks/storeHooks'
import React, { Suspense, useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa6'
import RecommendedProducts from '../products/[productId]/RecommendedProducts'
import Translator from '@/app/components/Translator'
import Link from 'next/link'
import Image from 'next/image'
import CartProduct from '@/app/components/CartProduct'
import emptyCart from "@/public/assist/Empty Cart.svg"
import { getCart } from '@/app/Redux/slices/cartSlice'


export default function Cart() {
    const { cartList, numOfCartItems, totalCartPrice } = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getCart())
    }, [dispatch])

    console.log(cartList);
    return (
        <>
            <section className='container my-5 md:my-0 gap-x-5 flex flex-col gap-y-10 md:flex-row justify-center md:justify-between md:items-stretch items-center capitalize'>
                {
                    cartList.length > 0 ?
                        <>
                            {/*  cart Details */}
                            <div className='  grow  shadow p-5 rounded shadow-gray-400  '>
                                <h2 className='text-red-600 font-bold text-xl'>
                                    <Translator arabic={`عربة التسوق (${numOfCartItems} منتج) `} english={`Shopping Cart (${numOfCartItems} items) `} />
                                </h2>
                                <hr className='border-none h-px bg-gray-400 bg-opacity-50 my-2 ' />
                                <div className='flex flex-col  divide-y divide-gray-400'>
                                    {cartList?.map(product => <CartProduct key={product._id} product={product} />)}
                                </div>
                            </div>
                            {/* cart summery */}
                            <div className=' md:self-start  md:w-4/12  xl:w-3/12  shadow p-5 rounded shadow-gray-400'>
                                <h2 className='text-red-600 font-semibold text-lg'>
                                    <Translator arabic='اجمالي السله' english='Cart summery' />
                                </h2>
                                <hr className='border-none h-px bg-gray-400 bg-opacity-50 my-2 ' />
                                <p className=' my-6'>
                                    <span className='font-semibold'>
                                        <Translator arabic='الاجمالي' english='Subtotal' />
                                    </span>
                                    <Translator arabic={`(${numOfCartItems} عنصر) :  ${totalCartPrice} جنيهاً`} english={`(${numOfCartItems} item) :  ${totalCartPrice} EGP`} />
                                </p>
                                <Link href={"/products"} className='bg-red-600 w-full text-white  flex  my-2 justify-center hover:animate-pulse items-center py-2 rounded-lg '>
                                    <Translator arabic='متابعه الشراء' english='continue shopping' />
                                </Link>
                                <Link href={""} className='dark:text-red-600 border-2 border-red-600 w-full text-black  hover:animate-pulse   flex my-2 justify-center items-center py-2 rounded-lg  '>
                                    <Translator arabic='الدفع' english=' Check out' />
                                </Link>
                            </div></>
                        :
                        <div className='grow w-full shadow p-5 md:w-3/4 rounded shadow-gray-400 flex flex-col justify-center items-start'>
                            <h2 className='text-red-600 font-bold text-2xl'>
                                <Translator arabic='عربة التسوق فارغة' english='Your cart is empty' />
                            </h2>
                            <Image className='size-72 mx-auto' src={emptyCart} alt="Empty Cart" />
                            <Link href={"/products"} className='bg-red-600 w-full md:w-1/2 mx-auto text-white  flex  my-2 justify-center  animate-pulse items-center py-2 rounded-lg '>
                                <Translator arabic='متابعه الشراء' english='continue shopping' />
                            </Link>
                        </div>
                }
            </section>
            {/* <Suspense fallback={
                <div className="flex mx-auto justify-center items-center text-red-600  ">
                    <FaSpinner className='  animate-spin' size={"4rem"} />
                </div>}>
                <RecommendedProducts subCategoryId='' />
            </Suspense> */}
        </>
    )
}
