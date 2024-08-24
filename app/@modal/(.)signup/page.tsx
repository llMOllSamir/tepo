"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios'
import { FaSpinner } from "react-icons/fa";
import { User } from '@/app/types/sliceTypes'
import Modal from '@/app/components/Modal'



export default function Login() {
    const [isModalOpen, setModalOpen] = useState(true);
    const [fetching, setFetching] = useState(false)
    const [failedLogin, setFailedLogin] = useState(null)
    const router = useRouter()

    // validation schema
    const schema = yup.object({
        name: yup.string().required("Please enter your name"),
        email: yup.string().email("Enter a valid email").required("Please enter your email"),
        password: yup.string().required("Please enter your password").min(6, "Password must be at least 6 characters"),
        rePassword: yup.string().required("Please confirm your password").oneOf([yup.ref('password')], 'Passwords must match'),
        phone: yup.string().required("Please enter your phone").matches(/^(010|011|012|015)[0-9]{8}$/, "Phone Number must be Egyptian valid Number"),
    })
    //  react form handler 
    const { formState, register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    })
    const { errors } = formState


    // fetching data Type response
    type ResponseData = {
        token: string
        user: User
        message: string

    }
    type UserData = {
        name: string
        email: string
        password: string
        rePassword: string
        phone: string
    }
    // Register function
    const fetchData = async (data: UserData) => {
        try {
            setFailedLogin(null)
            setFetching(true)
            const res = await axios.post<ResponseData>("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
            setModalOpen(false)
            router.replace("/login")
        } catch (error: any) {
            setFailedLogin(error?.response?.data?.message);
        } finally {
            setFetching(false)
        }
    }

    const handleClose = () => {
        setModalOpen(false)
        router.back()
    }


    return (
        <Modal isOpen={isModalOpen} onClose={handleClose}>

            <div className={`md:fixed static top-36 slide-down  right-0 w-96   bg-white dark:bg-gray-700 dark:text-white  shadow-lg transition-all duration-300 rounded-xl  shadow-gray-300 overflow-hidden select-none `}>
                <form onSubmit={handleSubmit(fetchData)} className='flex flex-col gap-2 p-5 py-10 w-full relative ' >
                    <button onClick={() => { handleClose() }} className='absolute top-5 right-5 text-red-600'>X</button>
                    <h2 className='text-3xl text-black dark:text-white font-bold text-center '>Register</h2>
                    {failedLogin && <p className='text-red-600 text-center font-bold'>{failedLogin}</p>}

                    <label className='w-full flex flex-col gap-2 text-red-600  font-medium'>
                        Name :
                        <input type="text" placeholder="name"
                            className={`w-full text-black dark:text-white dark:placeholder:text-gray-200 border-2 ${errors.name ? "border-red-600" : "border-black"} rounded-lg px-4 py-1 bg-transparent  caret-red-400 outline-none`}
                            {...register('name')} />
                        {errors.name && <span className='font-bold text-red-600'>{errors.name.message}</span>}
                    </label>

                    <label className='w-full flex flex-col gap-2 text-red-600  font-medium'>
                        Email :
                        <input type="email" placeholder="Email"
                            className={`w-full text-black dark:text-white dark:placeholder:text-gray-200 border-2 ${errors.email ? "border-red-600" : "border-black"} rounded-lg px-4 py-1 bg-transparent  caret-red-400 outline-none`}
                            {...register('email')} />
                        {errors.email && <span className='font-bold text-red-600'>{errors.email.message}</span>}
                    </label>

                    <label className='w-full flex flex-col gap-2  text-red-600 font-medium'>
                        Password :
                        <input type="password" placeholder="Password"
                            className={`w-full text-black dark:text-white dark:placeholder:text-gray-200 border-2 ${errors.password ? "border-red-600" : "border-black"} rounded-lg px-4 py-1 bg-transparent caret-red-400 outline-none`}
                            {...register('password')} />
                        {errors.password && <span className='font-bold text-red-600'>{errors.password.message}</span>}
                    </label>

                    <label className='w-full flex flex-col gap-2  text-red-600 font-medium'>
                        Confirm Password :
                        <input type="password" placeholder="Confirm Password"
                            className={`w-full text-black dark:text-white dark:placeholder:text-gray-200 border-2 ${errors.rePassword ? "border-red-600" : "border-black"} rounded-lg px-4 py-1 bg-transparent caret-red-400 outline-none`}
                            {...register('rePassword')} />
                        {errors.rePassword && <span className='font-bold text-red-600'>{errors.rePassword.message}</span>}
                    </label>

                    <label className='w-full flex flex-col gap-2  text-red-600 font-medium'>
                        Phone :
                        <input type="tel" placeholder="phone"
                            className={`w-full text-black dark:text-white dark:placeholder:text-gray-200 border-2 ${errors.phone ? "border-red-600" : "border-black"} rounded-lg px-4 py-1 bg-transparent caret-red-400 outline-none`}
                            {...register('phone')} />
                        {errors.phone && <span className='font-bold text-red-600'>{errors.phone.message}</span>}
                    </label>


                    {
                        fetching ? <button type="button" className='w-1/2 mx-auto bg-red-600 px-5 py-2 rounded-lg text-white font-bold cursor-pointer flex justify-center items-center'  >
                            <FaSpinner className='animate-spin' size={20} />
                        </button>
                            : <input type="submit" className='w-1/2 mx-auto bg-red-600 px-5 py-2 rounded-lg text-white font-bold cursor-pointer' value={"Register"} />
                    }
                    <p className='text-center text-sm  dark:text-gray-200 font-bold'>I have an account ? <span className='text-red-600 cursor-pointer' onClick={() => { router.replace("/login"); setModalOpen(false) }}>Login</span></p>
                </form>
            </div>
        </Modal>

    )
}
