"use client"

import { useAppDispatch, useAppSelector } from '@/app/hooks/storeHooks'
import { removeUser } from '@/app/Redux/slices/userSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from "yup"
export default function Profile() {
    const { user } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [isEditing, setIsEditing] = React.useState(false)
    const router = useRouter()
    type UserResetPassword = {
        currentPassword: string
        password: string
        rePassword: string
    }

    const resetPasswordSchema = Yup.object({
        currentPassword: Yup.string().required("Please enter your current password"),
        password: Yup.string().required("Please enter your new password").min(6, "Password must be at least 6 characters"),
        rePassword: Yup.string().required("Please confirm your new password").oneOf([Yup.ref('password')], 'Password must match'),
    })

    const { formState, register, handleSubmit, reset } = useForm<UserResetPassword>({ mode: "onChange", resolver: yupResolver(resetPasswordSchema) })
    const { errors } = formState

    const onSubmit = (data: UserResetPassword) => {
        axios.put("https://ecommerce.routemisr.com/api/v1/users/changeMyPassword", data, {
            headers: {
                token: JSON.parse(localStorage.getItem("token") || ""),
            }
        }).then(res => {
            dispatch(removeUser())
            router.replace("/auth/login")
        }).catch(err => {
            alert(err?.response?.data?.message)
            router.replace("/auth/login")
        })
    }
    const onReset = () => {
        reset({
            currentPassword: "",
            password: "",
            rePassword: ""
        })
        setIsEditing(false)
    }

    return (
        <section className='shadow-xl grow flex flex-col   px-16 py-10 '>
            <h1 className='font-bold text-2xl text-red-600 text-center mb-10 '>User Profile</h1>

            <div className='flex items-center gap-3 my-2'>
                <h2 className='font-bold  min-w-16'>Name</h2> :
                <p className='font-semibold'>{user?.name}</p>
            </div>
            <div className='flex items-center gap-3 my-2'>
                <h2 className='font-bold  min-w-16'>Email</h2> :
                <p className='font-semibold'>{user?.email}</p>
            </div>

            <div className='flex items-center gap-3 my-2'>
                <h2 className='font-bold  min-w-16'>Password</h2> :
                <p className='font-semibold'>**********</p>
                <button
                    className='text-red-600 border-red-600 border border-opacity-55 transition-all duration-300 text-sm hover:bg-red-600 hover:text-white rounded-lg px-2 py-px'
                    onClick={() => setIsEditing(!isEditing)}
                >
                    Change Password
                </button>
            </div>

            {
                isEditing && <form className='p-5 flex flex-col gap-3   rounded-lg ' onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="currentPassword" className='font-semibold  min-w-36'>Current Password</label>
                        <input
                            className={`border ${isEditing && "border-black"} outline-none py-px  rounded-lg w-full px-5 select-none bg-transparent`}
                            type="password"
                            {...register("currentPassword")}
                            placeholder='Current Password'
                            id="currentPassword"
                        />
                        {errors.currentPassword && <p className='text-red-600 text-sm font-bold min-w-fit' >{errors.currentPassword.message}</p>}
                    </div>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="password" className='font-semibold min-w-36 '>New Password</label>
                        <input
                            className={`border ${isEditing && "border-black"} outline-none py-px  rounded-lg w-full px-5 select-none bg-transparent`}
                            type="password"
                            {...register("password")}
                            id="password"
                            placeholder='New Password'
                        />
                        {errors.password && <p className='text-red-600 text-sm font-bold min-w-fit' >{errors.password.message}</p>}
                    </div>
                    <div className='flex items-center gap-3'>
                        <label htmlFor="rePassword" className='font-semibold min-w-36 '>Confirm Password</label>
                        <input
                            className={`border ${isEditing && "border-black"} outline-none py-px  rounded-lg w-full px-5 select-none bg-transparent`}
                            type="password"
                            {...register("rePassword")}
                            id="rePassword"
                            placeholder='Confirm Password'
                        />
                        {errors.rePassword && <p className='text-red-600 text-sm font-bold min-w-fit' >{errors.rePassword.message}</p>}
                    </div>

                    <div className='flex justify-center items-center gap-3'>
                        <button
                            className='text-red-600    border-red-600 border border-opacity-55   text-sm   rounded-lg p-2'
                            type="reset"

                        >
                            Cancel
                        </button>
                        <button
                            className='text-white bg-red-600 disabled:bg-gray-400    transition-all duration-300 text-sm hover:bg-red-700   rounded-lg p-2 px-5'
                            type="submit"
                            disabled={(!formState.isValid && !formState.isDirty)}
                        >
                            Save
                        </button>
                    </div>
                </form>
            }
        </section >
    )
}
