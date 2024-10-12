"use client"
import { useAppDispatch } from '@/app/hooks/storeHooks'
import { UserAddress } from '@/app/types/sliceTypes'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from "yup"
import { addUserAddress as addUserAddressAction } from "@/app/Redux/slices/userSlice"

export default function AddAddress({ close }: { close: React.Dispatch<SetStateAction<boolean>> }) {

    const dispatch = useAppDispatch()
    type AddressData = Omit<UserAddress, '_id'>

    const AddressSchema = Yup.object({
        name: Yup.string().required("Please enter your name"),
        details: Yup.string().required("Please enter your details"),
        phone: Yup.string().required("Please enter your phone").matches(/^(010|011|012|015)[0-9]{8}$/, "Phone Number must be Egyptian valid Number"),
        city: Yup.string().required("Please enter your city"),
    })
    const { formState, register, handleSubmit } = useForm({ mode: "onChange", resolver: yupResolver(AddressSchema) })
    const { errors } = formState

    const addUserAddress = (data: AddressData) => {
        dispatch(addUserAddressAction(data))
        close(false)
    }

    return (
        <form onSubmit={handleSubmit(addUserAddress)} className='flex flex-col gap-3 w-full   '>
            <div className="flex justify-start items-center gap-x-3 w-full">
                <label htmlFor="name" className='w-14 '>Name :</label>
                <input
                    type="text"
                    id="name"
                    className='grow border px-2 border-gray-300 rounded bg-transparent'
                    placeholder="Name"
                    {...register("name")}
                />
                {errors.name && <p className="text-red-600">{errors.name.message}</p>}
            </div>
            <div className="flex justify-start items-center gap-x-3 w-full">
                <label htmlFor="details" className='w-14'>Details :</label>
                <input
                    type="text"
                    id="details"
                    className='grow border px-2 border-gray-300 rounded bg-transparent'
                    placeholder="Details"
                    {...register("details")}
                />
                {errors.details && <p className="text-red-600">{errors.details.message}</p>}
            </div>
            <div className="flex justify-start items-center gap-x-3 w-full">
                <label htmlFor="phone" className='w-14'>Phone :</label>
                <input
                    type="tel"
                    id="phone"
                    className='grow border px-2 border-gray-300 rounded bg-transparent'
                    placeholder="Phone Number Must be Egyptian valid Number"
                    {...register("phone")}
                />
                {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
            </div>
            <div className="flex justify-start items-center gap-x-3 w-full">
                <label htmlFor="city" className='w-14'>City :</label>
                <input
                    type="text"
                    id="city"
                    className='grow border px-2 border-gray-300 rounded bg-transparent'
                    placeholder="City"
                    {...register("city")}
                />
                {errors.city && <p className="text-red-600">{errors.city.message}</p>}
            </div>

            <button
                type="submit"
                className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
            >
                Submit
            </button>
        </form >
    )
}
