"use client"
import { useAppDispatch, useAppSelector } from '@/app/hooks/storeHooks'
import React from 'react'




export default function Cart() {
    const dispatch = useAppDispatch()
    const { cartList, numOfCartItems, totalCartPrice } = useAppSelector(state => state.cart)
    console.log(cartList);
    return (
        <div>Cart</div>
    )
}
