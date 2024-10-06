"use client"

import { useAppSelector } from '@/app/hooks/storeHooks'
import axios from 'axios'
import React, { useEffect, useMemo } from 'react'


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

    return (
        <div>
            {
                order?.taxPrice
            }
        </div>
    )
}
