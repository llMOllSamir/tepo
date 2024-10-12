"use client"

import { useAppSelector } from '@/app/hooks/storeHooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'
import { RiMenuUnfold3Fill } from "react-icons/ri";

type Link = {
    title: string
    ref: string
}
export default function Aside() {
    const { user } = useAppSelector(state => state.user)
    const pathName = usePathname()
    const [open, setOpen] = useState(false)

    const handleClose = useCallback(() => {
        setOpen(prev => !prev)
    }, [])


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
        <>
            <aside className={`fixed z-40 overflow-hidden ${open ? " start-0 " : "-start-96"} top-20 md:overflow-auto transition-all duration-500 md:z-auto bg-white dark:bg-gray-800 md:block md:static  shadow-lg  py-10  select-none w-60 h-96 rounded `}>
                <p className='font-extrabold font-mono text-base text-center  '>Hello</p>
                <h2 className='font-extrabold font-mono text-xl  text-center text-red-600 my-3'> {user?.name}</h2>
                <ul className='mt-10 w-full flex flex-col   items-stretch divide-y-2  divide-gray-400'>
                    {
                        links.map(link => (
                            <li key={link.title} className='w-full py-3 ' onClick={handleClose} >
                                <Link
                                    className={`text-center cursor-pointer flex justify-center items-center text-lg w-full font-bold ${pathName === link.ref ? "text-red-600" : "text-black dark:text-white"} `}
                                    href={link.ref}>
                                    {link.title}
                                </Link>
                            </li>))
                    }
                </ul>
            </aside>
            <button
                onClick={handleClose}
                className={`md:hidden flex justify-center items-center size-8  border-0 fixed top-5 start-0 z-50 ${open ? "rotate-180" : "rotate-0"} transition-all duration-500 `}>
                <RiMenuUnfold3Fill size={"1.6rem"} color='white' />
            </button>

        </>
    )
}
