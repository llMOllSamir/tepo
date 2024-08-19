import Card from '@/app/components/card/Card'
import { Product } from '@/app/types/productsTypes'
import React from 'react'

type props = {
    subCategoryId: string
}
export default async function RecommendedProducts({ subCategoryId }: props) {

    let res = await fetch("https://ecommerce.routemisr.com/api/v1/products?subcategory[in]=" + subCategoryId)
    const { data }: { data: Product[] } = await res.json()

    return (
        <div className='grid grid-cols-2 gap-5  sm:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5'>
            {data.slice(0, 6).map(product => <Card key={product._id} product={product} />)}
        </div>
    )
}
