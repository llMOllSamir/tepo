"use client"
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios'
import { FaSpinner } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { setToken, setUser } from '@/app/Redux/slices/userSlice'


export default function Login() {
    const [close, setClose] = useState(false)
    const [open, setOpen] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [failedLogin, setFailedLogin] = useState(null)
    const dispatch = useDispatch()
    const pathname = usePathname()
    const router = useRouter()

    const schema = yup.object({
        email: yup.string().email("Enter a valid email").required(),
        password: yup.string().required(),
    })
    const { formState, register, handleSubmit } = useForm({ resolver: yupResolver(schema) })
    const { errors } = formState
    const fetchData = async (data) => {
        try {
            setFailedLogin(null)
            setFetching(true)
            let res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", data)
            localStorage.setItem("token", JSON.stringify(res.data.token))
            localStorage.setItem("user", JSON.stringify(res.data.user))
            dispatch(setUser(res.data.user))
            dispatch(setToken(res.data.user))
            handleClose()
        } catch (error) {
            setFailedLogin(error?.response?.data?.message);
        } finally {
            setFetching(false)
        }
    }

    const handleClose = (path = null) => {
        setOpen(false)
        setTimeout(() => {
            if (path) {
                router.replace(path)
                setClose(true)
            } else {
                router.back()
                setClose(true)
            }
        }, 300)
    }
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        setOpen(true)
        setClose(false)
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])
    useEffect(() => {
        if (pathname === '/login') {
            setClose(false)
        }
    }, [pathname])

    if (close) return null
    return (
        <section className=" z-30 fixed inset-0 bg-gray-300 bg-opacity-50   flex  justify-center items-center  ">
            <div className={`md:fixed static top-36  right-0 w-96 ${open ? "h-96" : "h-0"} bg-white  shadow-lg transition-all duration-300 rounded-xl  shadow-gray-300 overflow-hidden select-none `}>
                <form onSubmit={handleSubmit(fetchData)} className='flex flex-col gap-5 p-5 py-10 w-full relative' >
                    <button onClick={() => { handleClose() }} className='absolute top-5 right-5 text-red-600'>X</button>
                    <h2 className='text-3xl text-black font-bold text-center '>Login</h2>
                    {failedLogin && <p className='text-red-600 text-center font-bold'>{failedLogin}</p>}
                    <label className='w-full flex flex-col gap-2 text-red-600 font-medium'>
                        Email :
                        <input type="text" placeholder="Email"
                            className={`w-full text-black border-2 ${errors.email ? "border-red-600" : "border-black"} rounded-lg px-4 py-1 caret-red-400 outline-none`}
                            {...register('email')} />
                        {errors.email && <span className='font-bold text-red-600'>{errors.email.message}</span>}
                    </label>
                    <label className='w-full flex flex-col gap-2  text-red-600 font-medium'>
                        Password :
                        <input type="password" placeholder="Password"
                            className={`w-full text-black border-2 ${errors.password ? "border-red-600" : "border-black"} rounded-lg px-4 py-1 caret-red-400 outline-none`}
                            {...register('password')} />
                        {errors.password && <span className='font-bold text-red-600'>{errors.password.message}</span>}
                    </label>

                    {
                        fetching ? <button type="button" className='w-1/2 mx-auto bg-red-600 px-5 py-2 rounded-lg text-white font-bold cursor-pointer flex justify-center items-center'  >
                            <FaSpinner className='animate-spin' size={20} />
                        </button>
                            : <input type="submit" className='w-1/2 mx-auto bg-red-600 px-5 py-2 rounded-lg text-white font-bold cursor-pointer' value={"Login"} />
                    }
                    <p className='text-center text-sm  font-bold'> Don&apos;t have an account ? <span className='text-red-600 cursor-pointer' onClick={() => { handleClose("/auth/signup") }}>Register</span></p>
                </form>
            </div>  
        </section>

    )
}
