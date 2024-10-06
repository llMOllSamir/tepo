"use client"
import { useAppDispatch, useAppSelector } from '@/app/hooks/storeHooks'
import React, { useEffect } from 'react'
import Translator from '@/app/components/Translator'
import Link from 'next/link'
import Image from 'next/image'
import CartProduct from '@/app/components/CartProduct'
import emptyCart from "@/public/assist/Empty Cart.svg"
import { getCart } from '@/app/Redux/slices/cartSlice'
import Modal from '@/app/components/Modal'
import { emptyCart as emptyCartAction } from '@/app/Redux/slices/cartSlice'
import { setCartId } from '@/app/Redux/slices/orderSlice'


export default function Cart() {
    const { cartList, numOfCartItems, totalCartPrice, cartId } = useAppSelector(state => state.cart)
    const [showModal, setShowModal] = React.useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCart())
    }, [dispatch])

    useEffect(() => {
        dispatch(setCartId(cartId))
    }, [cartId, dispatch])


    return (
        <>
            <section className=' my-5 lg:w-10/12 lg:mx-auto md:my-0 gap-x-5 flex flex-col gap-y-10 md:flex-row justify-center md:justify-between md:items-stretch items-center capitalize'>
                {
                    cartList.length > 0 ?
                        <>
                            {/*  cart Details */}
                            <div className='  grow  shadow p-5 rounded shadow-gray-400  '>
                                <div className='flex w-full justify-between items-center  '>
                                    <h2 className='text-red-600 font-bold text-xl'>
                                        <Translator arabic={`عربة التسوق (${numOfCartItems} منتج) `} english={`Shopping Cart (${numOfCartItems} items) `} />
                                    </h2>
                                    <button onClick={() => setShowModal(true)}
                                        className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded  '>
                                        <Translator arabic='حذف الكل' english='Remove All' />
                                    </button>
                                    <Modal isOpen={showModal} onClose={() => { setShowModal(false) }}  >
                                        <div className='flex flex-col justify-center items-center  w-11/12 md:w-2/3 lg:w-1/2 bg-white   xl:w-1/3 mx-auto shadow shadow-gray-700 p-10'>
                                            <h2 className='text-red-600  font-bold text-lg   w-full'>
                                                <Translator arabic='هل تريد حذف جميع المنتجات؟' english='Are you sure you want to delete all items?' />
                                            </h2>
                                            <div className='flex gap-5 my-5'>
                                                <button onClick={() => { setShowModal(false) }} className='  font-bold py-2 px-4 rounded border-red-600 border   '>
                                                    <Translator arabic='لا' english='No' />
                                                </button>
                                                <button onClick={() => { dispatch(emptyCartAction()); setShowModal(false) }} className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded  '>
                                                    <Translator arabic='نعم' english='Yes' />
                                                </button>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>

                                <hr className='border-none h-px bg-gray-400 bg-opacity-50 my-2 ' />
                                <div className='flex flex-col  divide-y divide-gray-400'>
                                    {cartList?.map(product => <CartProduct key={product._id} product={product} />)}
                                </div>
                            </div>
                            {/* cart summery */}
                            <div className=' md:self-start w-3/4 sm:w-5/12 md:w-6/12 lg:w-4/12  xl:w-3/12  shadow p-5 rounded shadow-gray-400'>
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
                                <Link href={"/cart/payment"} className='dark:text-red-600 border-2 border-red-600 w-full text-black  hover:animate-pulse   flex my-2 justify-center items-center py-2 rounded-lg  '>
                                    <Translator arabic='الدفع' english=' Check out' />
                                </Link>
                            </div>
                        </>
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
            </section >

        </>
    )
}
