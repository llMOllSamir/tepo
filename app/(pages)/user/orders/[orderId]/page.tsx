"use client"

import { useAppSelector } from '@/app/hooks/storeHooks'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo } from 'react'
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaCircleXmark } from "react-icons/fa6";


type OrderDetailsProps = {
    params: {
        orderId: string
    }
}

export default function UserOrdersById({ params }: OrderDetailsProps) {
    const { orderId } = params
    const { allOrders } = useAppSelector((state) => state.order)

    const order = useMemo(() => {
        return allOrders.find(order => order._id === orderId)
    }, [allOrders, orderId])

    const handleDate = (str: string): string => {
        const date = new Date(str).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        return date
    }

    return (
        <section className='grow capitalize'>
            <h1 className='text-2xl font-bold text-red-600 px-5 my-10'>Order Details ( {order?.id} )</h1>
            <div className='px-5 md:px-10 w-full shadow-lg rounded-lg py-5  grid grid-cols-1 md:grid-cols-2  gap-3 '>

                <div className='flex  items-center gap-5'>
                    <h2 className='text-xl font-bold text-red-600 w-28'> total price </h2>:  <p className='text-lg font-bold '>{order?.totalOrderPrice} EGP</p>
                </div>
                <div className='flex  items-center gap-5'>
                    <h2 className='text-xl font-bold text-red-600 w-28'> Is Delivered </h2>:
                    <p className='text-lg font-bold '>{order?.isDelivered ? <AiOutlineCheckCircle className='text-green-600' size={"1.5rem"} /> : <FaCircleXmark className='text-red-600' size={"1.5rem"} />}</p>
                </div>
                <div className='flex  items-center gap-5'>
                    <h2 className='text-xl font-bold text-red-600 w-28'>Payment </h2>:
                    <p className='text-lg font-bold  '>{order?.paymentMethodType}</p>
                </div>
                <div className='flex  items-center gap-5'>
                    <h2 className='text-xl font-bold text-red-600 w-28'> Is Paid </h2>:
                    <p className='text-lg font-bold '>{order?.isPaid ? <AiOutlineCheckCircle className='text-green-600' size={"1.5rem"} /> : <FaCircleXmark className='text-red-600' size={"1.5rem"} />}</p>
                </div>
                <div className={`flex  items-center gap-5 `}>
                    <h2 className='text-xl font-bold text-red-600 w-28'> Order Date </h2>:
                    <p className='text-lg font-bold '>{handleDate(order?.createdAt || "")}</p>
                </div>
                <div className={`flex  items-center gap-5 `}>
                    <h2 className='text-xl font-bold text-red-600 w-28'> Paid Date </h2>:
                    <p className='text-lg font-bold '>{order?.paidAt ? handleDate(order.paidAt) : "Not Paid Yet"}</p>
                </div>
                <div className={`flex  items-center gap-5  `}>
                    <h2 className='text-xl font-bold text-red-600 w-28'> Address </h2>:
                    <p className='text-lg font-bold '>{order?.shippingAddress.details.concat(" , " + order?.shippingAddress.city)}</p>
                </div>
                <div className={`flex  items-center gap-5   `}>
                    <h2 className='text-xl font-bold text-red-600 w-28'> Phone </h2>:
                    <p className='text-lg font-bold '>{order?.shippingAddress.phone}</p>
                </div>
                <div className={`flex flex-col md:flex-row   md:items-center gap-5 md:col-span-2   `}>
                    <div className='flex items-center gap-5 self-start'><h2 className='text-xl font-bold text-red-600 w-28'> Products </h2>:</div>
                    <div className='grid grid-cols-2 md:gap-1 lg:gap-3 xl:grid-cols-3 gap-3' >
                        {order?.cartItems.map(product => (
                            <div key={product.product._id} className='flex items-center gap-2'>
                                <Link href={`/products/${product.product._id}`} >
                                    <Image src={product.product.imageCover} alt={product.product.title} width={100} height={100} className="size-16 rounded-lg object-cover shadow-md" />
                                </Link>
                                <div className='flex flex-col '>
                                    <p>{product.product.title.split(" ").slice(0, 3).join(" ")}</p>
                                    <p>Count : {product.count}</p>
                                    <p>Price : {product.price} EGP</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    )
}
