"use client"

import { useAppDispatch, useAppSelector } from '@/app/hooks/storeHooks'
import { setAllOrders } from '@/app/Redux/slices/orderSlice'
import { OrderType } from '@/app/types/sliceTypes'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect } from 'react'

export default function UserOrders() {
    const dispatch = useAppDispatch()

    const { allOrders } = useAppSelector((state) => state.order)

    useEffect(() => {
        const getUserOrders = async () => {
            const data = await axios.get('https://ecommerce.routemisr.com/api/v1/orders', {
                headers: {
                    token: JSON.parse(localStorage.getItem('token') || '')
                }
            })
            dispatch(setAllOrders(data?.data?.data))
        }
        getUserOrders()
    }, [dispatch])

    return (
        <div>
            {
                allOrders.map((order: OrderType) => (
                    <div key={order._id}>
                        <Link href={`/user/orders/${order._id}`}>{order._id}</Link>
                    </div>
                ))
            }
        </div>
    )
}
