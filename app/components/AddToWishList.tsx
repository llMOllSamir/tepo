"use client"
import React, { useCallback } from 'react'
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { removeFromWishList, addToWishList } from '../Redux/slices/WishListSlice';
import { useRouter } from 'next/navigation';

type Props = React.ComponentPropsWithRef<"button"> & {
    productId: string
}
export default function AddToWishList({ productId, ...props }: Props) {
    const { wishList } = useAppSelector(state => state.WishList)
    const { token } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const handleClick = useCallback(() => {
        if (token) {
            if (wishList.includes(productId)) {
                dispatch(removeFromWishList(productId))
            } else {
                dispatch(addToWishList(productId))
            }
        } else {
            router.push("/login")
        }
    }, [dispatch, productId, wishList, token, router])
    return (
        <button {...props} onClick={handleClick}  >
            {wishList.includes(productId) ? <MdFavorite fill='red' size={"28px"} /> : <MdFavoriteBorder fill='red' size={"28px"} />}
        </button>
    )
}
