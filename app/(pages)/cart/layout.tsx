import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: "Cart",
    description: "This Is Your Cart Details You Can Finish Your Payment Here"
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
