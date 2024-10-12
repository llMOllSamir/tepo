
"use client"
import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import axios, { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { FaSpinner } from 'react-icons/fa6'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
    email: string
}

export default function ResetPassword({ email }: Props) {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const router = useRouter()
    const resetPassword = async ({ newPassword }: { newPassword: string }) => {
        try {
            setLoading(true)
            setError(null)
            await axios.put<{ message: string }>("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", { email, newPassword })
            router.replace("/auth/login")
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
    const resetPasswordSchema = yup.object({
        newPassword: yup.string().required("Please enter your password").min(6, "Password must be at least 6 characters"),
    })

    const { register, handleSubmit, formState: { errors } } = useForm<{ newPassword: string }>({
        resolver: yupResolver(resetPasswordSchema),
        mode: "onChange"
    })

    return (
        <form className='w-full py-10 px-5' onSubmit={handleSubmit(resetPassword)}>
            {error && <p className='font-bold text-red-600 text-sm my-4'>{error}</p>}
            <label className='w-full flex flex-col gap-2 mb-5 text-black dark:text-white  font-medium'>
                New Password :
                <input type="password" placeholder="Set Your New Password"
                    className={`w-full text-black dark:text-white dark:placeholder:text-gray-200 border-2 ${errors.newPassword ? "border-red-600" : "border-black"} rounded-lg px-4 py-1 bg-transparent  caret-red-400 outline-none`}
                    {...register('newPassword')} />
                {errors.newPassword && <span className='font-bold text-red-600 text-sm'>{errors.newPassword.message}</span>}
            </label>
            <button type='submit' className='w-full text-white bg-red-600 px-5 py-2 rounded-3xl flex justify-center items-center '>
                {loading ? <FaSpinner className='animate-spin' size={"1.5em"} /> : "Reset Password"}
            </button>
            <p className='text-center  text-sm mt-5'>
                I Remember My Password ?  <Link href="/auth/login" className='text-red-600 font-bold '>Login</Link>
            </p>

        </form>
    )
}
