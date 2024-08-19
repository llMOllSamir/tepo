import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: "Wish List",
    description: "This Is Your Favorites Products "
}
type Props = {
    children: React.ReactNode
}
export default function layout({ children }: Props) {
    return (
        <>
            {children}
        </>
    )
}
