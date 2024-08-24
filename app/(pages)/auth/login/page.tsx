import SignInForm from '@/app/components/SignInForm'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: "Log In"
}
export default function Login() {
    return (
        <SignInForm />
    )
}
