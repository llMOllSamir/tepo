
import React from 'react'
import logo from "@/public/assist/Logo.svg"
import Image from 'next/image'


type Props = {

    children: React.ReactNode
}
export default function RootLayOut({ children }: Props) {
    return (
        <section className='flex flex-col justify-center items-center gap-5 select-none  py-10 sm:py-0'>
            <Image alt='logo' src={logo} width={500} height={500} className='size-24  ' />
            <div className='min-w-96 min-h-96 border-2 border-red-600 rounded-xl'>
                {children}
            </div>
        </section>
    )
}
