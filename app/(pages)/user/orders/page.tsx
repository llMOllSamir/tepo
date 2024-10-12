"use client"

import { useAppDispatch, useAppSelector } from '@/app/hooks/storeHooks'
import { setAllOrders } from '@/app/Redux/slices/orderSlice'
import { OrderType } from '@/app/types/sliceTypes'
import axios from 'axios'
import Link from 'next/link'
import React, { useCallback, useEffect } from 'react'

export default function UserOrders() {
    const dispatch = useAppDispatch()
    const [index, setIndex] = React.useState(0)
    const { allOrders } = useAppSelector((state) => state.order)

    const handleIndex = useCallback((state: "next" | "prev") => {
        switch (state) {
            case "next":
                setIndex(prev => {
                    if (allOrders.length - prev > 5) {
                        return prev + 5
                    }
                    return prev
                })
                break;
            case "prev":
                setIndex(prev => {
                    if (prev - 5 <= 0) {
                        return 0
                    }
                    return prev - 5
                })
                break;
            default:
                break;
        }
    }, [allOrders])

    useEffect(() => {
        const getUserOrders = async () => {
            const verified = await axios.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken', {
                headers: {
                    token: JSON.parse(localStorage.getItem("token") || "")
                }
            })
            const userId = verified?.data?.decoded?.id || ""
            const data = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user/' + userId)
            dispatch(setAllOrders(data?.data || []))
        }
        getUserOrders()
    }, [dispatch])




    const handleDate = (str: string): string => {
        const date = new Date(str).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        return date
    }


    return (
        allOrders.length > 0 &&
        <section className='grow'>
            <div className='flex flex-col gap-1'>
                <h1 className='text-2xl font-bold text-red-600 px-5 my-10'>My Orders</h1>
                {
                    allOrders.slice(0).reverse().slice(index, 5 + index).map((order: OrderType) => (
                        <div key={order._id} className='shadow-lg px-5 md:px-10 py-2 flex-col flex'>
                            <div className='grid grid-cols-2'>
                                <h2 className='font-bold'>Total Price: {order.totalOrderPrice}</h2>
                                <h2 className='font-bold'>Status: {order.isDelivered ? "Delivered" : "Not Delivered"}</h2>
                                <h2 className='font-bold'>Date: {handleDate(order.createdAt)}</h2>
                                <h2 className='font-bold'>Payment Method: {order.paymentMethodType}</h2>
                            </div>
                            <Link className='flex ms-auto text-red-600 font-semibold ' href={`/user/orders/${order._id}`}>Show More ...</Link>
                        </div>
                    ))
                }
            </div>

            <div className='flex w-full justify-end gap-5 mt-5'>
                <button
                    onClick={() => handleIndex("prev")}
                    disabled={index === 0}
                    className='border border-gray-400 px-3 py-1 rounded-lg disabled:bg-gray-400'
                >prev</button>
                <button
                    onClick={() => handleIndex("next")}
                    disabled={index === allOrders.length - 10}
                    className='bg-red-600 text-white hover:bg-red-700 transition-all duration-300 px-3 py-1 rounded-lg'
                >next</button>
            </div>

        </section>
    )
}
