"use client"
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks'
import { loginUser } from '../Redux/slices/userSlice'
import { FaSpinner } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'
export default function SignUpForm() {
    const { status, error } = useAppSelector(state => state.user)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const signUpSchema = yup.object({
        name: yup.string().required("Please enter your name"),
        email: yup.string().email("Enter a valid email").required("Please enter your email"),
        password: yup.string().required("Please enter your password").min(6, "Password must be at least 6 characters"),
        rePassword: yup.string().required("Please confirm your password").oneOf([yup.ref('password')], 'Passwords must match'),
        phone: yup.string().required("Please enter your phone").matches(/^(010|011|012|015)[0-9]{8}$/, "Phone Number must be Egyptian valid Number"),
    })

    type UserData = {
        name: string
        email: string
        password: string
        rePassword: string
        phone: string
    }

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema),
        mode: "onChange"
    })

    const handleLogin = (data: UserData) => {
        dispatch(loginUser(data))
    }

    useEffect(() => {
        if (status === "success") {
            router.replace("/auth/login")
        }
    }, [status, router])

    return (
        <form className='w-full py-10 px-5' onSubmit={handleSubmit(handleLogin)}>
            <h1 className='text-2xl text-center text-red-600 font-bold mb-10 '>Register</h1>
            {
                error && <p className='text-red-600 text-base text-center mb-5 font-bold'>{error}</p>
            }

            <label className='w-full flex flex-col gap-2 mb-5 text-black dark:text-white  font-medium'>
                Name :
                <input type="text" placeholder="Name"
                    className={`w-full text-black dark:text-white dark:placeholder:text-gray-200 border-2 ${errors.name ? "border-red-600" : "border-black"} rounded-lg px-4 py-1 bg-transparent  caret-red-400 outline-none`}
                    {...register('name')} />
                {errors.name && <span className='font-bold text-red-600 text-sm'>{errors.name.message}</span>}
            </label>

            <label className='w-full flex flex-col gap-2 mb-5 text-black dark:text-white  font-medium'>
                Email :
                <input type="email" placeholder="Email"
                    className={`w-full text-black dark:text-white dark:placeholder:text-gray-200 border-2 ${errors.email ? "border-red-600" : "border-black"} rounded-lg px-4 py-1 bg-transparent  caret-red-400 outline-none`}
                    {...register('email')} />
                {errors.email && <span className='font-bold text-red-600 text-sm'>{errors.email.message}</span>}
            </label>

            <label className='w-full flex flex-col gap-2 mb-5 text-black dark:text-white font-medium'>
                Password :
                <input type="password" placeholder="Password"
                    className={`w-full text-black dark:text-white dark:placeholder:text-gray-200 border-2 ${errors.password ? "border-red-600" : "border-black"} rounded-lg px-4 py-1 bg-transparent caret-red-400 outline-none`}
                    {...register('password')} />
                {errors.password && <span className='font-bold text-red-600 text-sm'>{errors.password.message}</span>}
            </label>

            <label className='w-full flex flex-col gap-2 mb-5 text-black dark:text-white font-medium'>
                Confirm Password :
                <input type="password" placeholder="Confirm Password "
                    className={`w-full text-black dark:text-white dark:placeholder:text-gray-200 border-2 ${errors.rePassword ? "border-red-600" : "border-black"} rounded-lg px-4 py-1 bg-transparent caret-red-400 outline-none`}
                    {...register('rePassword')} />
                {errors.rePassword && <span className='font-bold text-red-600 text-sm'>{errors.rePassword.message}</span>}
            </label>

            <label className='w-full flex flex-col gap-2 mb-5 text-black dark:text-white font-medium'>
                Phone :
                <input type="tel" placeholder="Phone"
                    className={`w-full text-black dark:text-white dark:placeholder:text-gray-200 border-2 ${errors.phone ? "border-red-600" : "border-black"} rounded-lg px-4 py-1 bg-transparent caret-red-400 outline-none`}
                    {...register('phone')} />
                {errors.phone && <span className='font-bold text-red-600 text-sm'>{errors.phone.message}</span>}
            </label>

            {
                status === "pending" ? <button type="button" className='  mx-auto bg-red-600 px-5 py-2 rounded-lg text-white font-bold cursor-pointer flex justify-center items-center'  >
                    <FaSpinner className='animate-spin' size={20} />
                </button>
                    : <input type="submit" className=' flex  mx-auto bg-red-600 px-5 py-2 rounded-lg text-white font-bold cursor-pointer' value={"Register"} />
            }

            <p className='text-center text-sm mt-5 dark:text-gray-200 font-bold'> I have an account ? <span className='text-red-600 cursor-pointer' onClick={() => { router.push("/auth/login"); }}>Login</span></p>
        </form >
    )
}
