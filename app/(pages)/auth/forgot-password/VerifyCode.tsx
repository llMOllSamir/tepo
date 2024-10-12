
"use client"
import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import axios, { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { FaSpinner } from 'react-icons/fa6'
import Link from 'next/link'

type Props = {
    setCode: React.Dispatch<React.SetStateAction<string | null>>
}

export default function ResetCode({ setCode }: Props) {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const forgotPassword = async ({ resetCode }: { resetCode: string }) => {
        try {
            setLoading(true)
            setError(null)
            const res = await axios.post<{ message: string }>("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", { resetCode })
            setCode(resetCode)
            console.log(res);
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
    const codeSchema = yup.object({
        resetCode: yup.string().required("Please enter your Code").length(6, "Code must be 6 characters"),
    })

    const { register, handleSubmit, formState: { errors } } = useForm<{ resetCode: string }>({
        resolver: yupResolver(codeSchema),
        mode: "onChange"
    })

    return (
        <form className='w-full py-10 px-5' onSubmit={handleSubmit(forgotPassword)}>
            {error && <p className='font-bold text-red-600 text-sm my-4'>{error}</p>}
            <label className='w-full flex flex-col gap-2 mb-5 text-black dark:text-white  font-medium'>
                Verify Code :
                <input type="text" placeholder=" Verify Code"
                    className={`w-full text-black dark:text-white dark:placeholder:text-gray-200 border-2 ${errors.resetCode ? "border-red-600" : "border-black"} rounded-lg px-4 py-1 bg-transparent  caret-red-400 outline-none`}
                    {...register('resetCode')} />
                {errors.resetCode && <span className='font-bold text-red-600 text-sm'>{errors.resetCode.message}</span>}
            </label>
            <button type='submit' className='w-full text-white bg-red-600 px-5 py-2 rounded-3xl flex justify-center items-center  '>
                {loading ? <FaSpinner className='animate-spin' size={"1.5em"} /> : "Verify Code"}
            </button>
            <p className='text-center  text-sm mt-5'>
                I Remember My Password ?  <Link href="/auth/login" className='text-red-600 font-bold '>Login</Link>
            </p>
        </form>
    )
}
