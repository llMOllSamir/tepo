"use client"

import { useAppSelector } from '@/app/hooks/storeHooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'

type Link = {
    title: string
    ref: string
}

export default function Aside() {
    const { user } = useAppSelector(state => state.user)
    const pathName = usePathname()

    const links: Link[] = useMemo(() => {
        return [
            { title: "Profile", ref: "/user" },
            {
                title: "Address", ref: "/user/address"
            },
            { title: "Orders", ref: "/user/orders" },
        ]
    }, [])
    return (
        <aside className='hidden md:block  shadow-lg  py-10   select-none w-60 h-96 rounded  '>
            <h2 className='font-extrabold font-mono text-base text-center  '>Hello</h2>
            <h1 className='font-extrabold font-mono text-xl  text-center text-red-600 my-3'> {user?.name}</h1>
            <ul className='mt-10 w-full flex flex-col   items-stretch divide-y-2  divide-gray-400'>
                {
                    links.map(link => (
                        <li key={link.title} className='w-full py-3 ' >
                            <Link
                                className={`text-center cursor-pointer flex justify-center items-center text-lg w-full font-bold ${pathName === link.ref ? "text-red-600" : "text-black dark:text-white"} `}
                                href={link.ref}>
                                {link.title}
                            </Link>
                        </li>))
                }
            </ul>
        </aside>
    )
}
