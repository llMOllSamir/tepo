"use client"
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks'
import { CartProduct as ProductType } from '../types/sliceTypes'
import Image from 'next/image'
import { removeFromCart, updateCart } from '../Redux/slices/cartSlice'
import Translator from './Translator'
import { FaSpinner } from 'react-icons/fa6'

type Props = {
    product: ProductType
}

export default function CartProduct({ product }: Props) {
    const { status } = useAppSelector(state => state.cart)
    const dispatch = useAppDispatch()
    return (
        <div className='flex gap-5 py-2 my-3'>
            <Image src={product.product?.imageCover} alt="cart" width={100} height={100} className='size-32 object-cover shadow-md  p-2 ' />
            <div className='flex flex-col justify-between items-start '>
                <h3 className='text-base font-semibold '>{product.product?.title}</h3>
                <p className='text-sm'>
                    <Translator arabic={`${product.price} جنيهاً`} english={`${product.price} EGP `} />
                </p>
                <button onClick={() => dispatch(removeFromCart(product.product._id))}
                    className='hover:text-red-500  transition-colors duration-1000 font-bold text-sm '>
                    <Translator arabic='حذف' english='Delete' />
                </button>
                {(product.product?.quantity * 1 - product.product?.sold * 1) <= 5 ?
                    <p className='text-red-500 font-bold text-sm'>
                        <Translator arabic={`فقط ${(product.product?.quantity * 1 - product.product?.sold * 1)} منتج متوفر`} english={`Only ${(product.product?.quantity * 1 - product.product?.sold * 1)} Left In Stock`} />
                    </p> : <p></p>
                }
            </div>
            <div className='flex flex-col justify-start items-center gap-10 ms-auto'>
                <p className='text-lg font-bold'>
                    <Translator arabic={`${product.price * product.count} جنيهاً`} english={`EGP ${product.price * product.count} `} />
                </p>
                <div className='flex text-lg font-semibold'>
                    <button className='text-white bg-red-600 flex justify-center items-center size-8  border-0' onClick={() => dispatch(updateCart({ count: product.count - 1, productId: product.product._id }))}>-</button>
                    <p className='flex justify-center items-center h-8 min-w-8  '>
                        {status.loading && status.product === product.product._id ? <FaSpinner className='animate-spin' /> : product.count}
                    </p>
                    <button className='text-white bg-green-600 flex justify-center items-center size-8 border-0' onClick={() => dispatch(updateCart({ count: product.count + 1, productId: product.product._id }))}>+</button>
                </div>
            </div>
        </div>
    )
}
