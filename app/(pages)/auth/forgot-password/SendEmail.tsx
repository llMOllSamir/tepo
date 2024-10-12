
"use client"
import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import axios, { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { FaSpinner } from 'react-icons/fa6'
import Link from 'next/link'

type Props = {
    setEmail: React.Dispatch<React.SetStateAction<string | null>>
}

export default function SendEmail({ setEmail }: Props) {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const forgotPassword = async ({ email }: { email: string }) => {
        try {
            setLoading(true)
            setError(null)
            await axios.post<{ message: string }>("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", { email })
            setEmail(email)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message);
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false)
        }

    }
    const emailSchema = yup.object({
        email: yup.string().email("Enter a valid email").required("Please enter your email"),
    })

    const { register, handleSubmit, formState: { errors } } = useForm<{ email: string }>({
        resolver: yupResolver(emailSchema),
        mode: "onChange"
    })

    return (
        <form className='w-full py-10 px-5' onSubmit={handleSubmit(forgotPassword)}>
            {error && <p className='font-bold text-red-600 text-sm my-4'>{error}</p>}
            <label className='w-full flex flex-col gap-2 mb-5 text-black dark:text-white  font-medium'>
                Email :
                <input type="email" placeholder="Email"
                    className={`w-full text-black dark:text-white dark:placeholder:text-gray-200 border-2 ${errors.email ? "border-red-600" : "border-black"} rounded-lg px-4 py-1 bg-transparent  caret-red-400 outline-none`}
                    {...register('email')} />
                {errors.email && <span className='font-bold text-red-600 text-sm'>{errors.email.message}</span>}
            </label>
            <button type='submit' className='w-full text-white bg-red-600 px-5 py-2 rounded-3xl flex justify-center items-center '>
                {loading ? <FaSpinner className='animate-spin' size={"1.5em"} /> : "Send Code"}
            </button>
            <p className='text-center  text-sm mt-5'>
                I Remember My Password ?  <Link href="/auth/login" className='text-red-600 font-bold '>Login</Link>
            </p>

        </form>
    )
}
