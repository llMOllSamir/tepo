import Card from '@/app/components/card/Card';
import { Brand, Product } from '@/app/types/productsTypes';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react'

type BrandDetailsProps = {
    params: {
        brandSlug: string
    }
}
export function generateMetadata({ params }: BrandDetailsProps): Metadata {
    const { brandSlug } = params
    return {
        title: "brands : " + brandSlug
    }
}

export default async function BrandDetails({ params }: BrandDetailsProps) {
    const { brandSlug } = params

    let data = await fetch(
        `https://ecommerce.routemisr.com/api/v1/brands?slug=${brandSlug}`,
        { next: { revalidate: 3600 } }
    ).then(res => res.json()).catch(err => ({ data: [] }));
    let { data: brand }: { data: Brand[] } = data
    let response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products?brand[in]=${brand?.length && brand[0]?._id}`
    ).then(res => res.json()).catch(err => ({ data: [] }));
    let { data: products }: { data: Product[] } = response


    return (
        <div className=" my-10 ">
            <div className='container gap-10 mx-auto grid sm:grid-cols-2 px-16  sm:px-2 grid-cols-1 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5'>
                {products?.map((product) => (
                    <Card key={product._id} product={product} />
                ))}
            </div>
            {(products?.length === 0 || products === undefined) && (
                <div className="   gap-6 flex flex-col justify-center items-center">
                    <h1 className="font-extrabold text-red-600 w-full text-center   text-base md:text-xl lg:text-2xl xl:text-3xl">
                        There is No Products Form {brand ? brand[0].name : "brands"} Yet
                    </h1>
                    <Link
                        href={"/brand"}
                        className="px-5 py-2 rounded-2xl text-sm md:text-lg bg-red-600 text-white font-semibold"
                    >
                        Check Brands
                    </Link>
                </div>
            )}
        </div>
    );
}
