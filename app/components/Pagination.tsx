"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

type Props = {
    to: string
    metadata: {
        currentPage: number,
        numberOfPages: number,
        limit: number,
        nextPage?: number,
        prevPage?: number
    }
}



export default function Pagination({ metadata, to }: Props) {
    const router = useRouter()

    return (
        <div className='w-full my-5 flex justify-center items-center'>
            <div className='flex justify-center items-center'>
                <button className={`size-10 border border-gray-400 flex justify-center items-center rounded-s-lg disabled:bg-gray-400  disabled:bg-opacity-50  `}
                    onClick={() => router.push(`${to}?page=${metadata.prevPage}`)}
                    disabled={!metadata.prevPage}
                ><GrFormPrevious size={"1rem"} /></button>
                {[...new Array(metadata.numberOfPages)].map((_, index) =>
                    <button key={index}
                        onClick={() => router.push(`${to}?page=${index + 1}`)}
                        className={`size-10 border border-gray-400 flex justify-center  font-bold items-center ${metadata.currentPage === index + 1 ? "bg-red-600 text-white  " : ""} `} >
                        {index + 1}
                    </button>)}
                <button className={`size-10 border border-gray-400 flex justify-center items-center rounded-e-lg disabled:bg-gray-400 disabled:bg-opacity-50  `}
                    onClick={() => router.push(`${to}?page=${metadata.nextPage}`)}
                    disabled={!metadata.nextPage}><GrFormNext size={"1rem"} /></button>
            </div>
        </div>
    )
}
