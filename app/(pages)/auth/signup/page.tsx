import SignUpForm from '@/app/components/SignUpForm'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: "Register"
}
export default function SignIn() {
    return (
        <SignUpForm />
    )
}
