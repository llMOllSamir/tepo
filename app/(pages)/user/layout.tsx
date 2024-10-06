import { Metadata } from 'next'
import React from 'react'
import Aside from './components/Aside'


export const metadata: Metadata = {
    title: "Profile",
}

type Props = {
    children: React.ReactNode
}

export default function layout({ children }: Props) {
    return (
        <section className='lg:container flex gap-5 items-stretch '>
            <Aside />
            {children}
        </section>
    )
}
