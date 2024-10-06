import Card from '@/app/components/card/Card'
import { Product } from '@/app/types/productsTypes'
import React from 'react'

type props = {
    subCategoryId: string
    productsItems?: number
}
export default async function RecommendedProducts({ subCategoryId, productsItems = 6 }: props) {

    let res = await fetch("https://ecommerce.routemisr.com/api/v1/products?subcategory[in]=" + subCategoryId)
    const { data }: { data: Product[] } = await res.json()

    return (
        data.slice(0, productsItems).map(product => <Card key={product._id} product={product} />)
    )
}
