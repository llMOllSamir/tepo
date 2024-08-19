


import React, { useEffect } from 'react'
import { Product } from '../types/productsTypes'
import axios from 'axios'


type WishListResponse = {
    count: number;
    data: Product[];
};

export default function useGetWishList() {
    const [isLoading, setIsLoading] = React.useState(false)
    const [wishList, setWishList] = React.useState<Product[]>([])


    const getWishList = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get<WishListResponse>(
                "https://ecommerce.routemisr.com/api/v1/wishlist",
                {
                    headers: {
                        token: JSON.parse(localStorage.getItem("token") || ""),
                    },
                }
            );
            setWishList(res.data.data.map((item) => ({ ...item, images: item.images.map((image) => `https://ecommerce.routemisr.com/Route-Academy-products/${image}`) })))
        } catch (error) {
            return
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getWishList()
    }, [])

    return (
        { isLoading, wishList }
    )
}
