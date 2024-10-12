"use client"


import React from 'react'
import SendEmail from './SendEmail'
import ResetCode from './VerifyCode'
import ResetPassword from './ResetPassword'


 /******  f4bb80a1-ecea-4474-bef7-12f650fabd23  *******/export default function ForgotPassword() {
    const [email, setEmail] = React.useState<string | null>(null)
    const [code, setCode] = React.useState<string | null>(null)
    return (
        <section className='py-10'>
            <h1 className='text-2xl text-center text-red-600 font-bold mb-3 '>Forgot Password</h1>
            {
                !email ? <SendEmail setEmail={setEmail} /> :
                    !code ? <ResetCode setCode={setCode} /> :
                        <ResetPassword email={email} />
            }

        </section>
    )
}
