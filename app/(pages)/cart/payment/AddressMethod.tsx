"use client"

import { useAppDispatch, useAppSelector } from '@/app/hooks/storeHooks'
import { setOrderAddress as setAddMethodAction } from "@/app/Redux/slices/orderSlice"
import Modal from '@/app/components/Modal'
import Translator from '@/app/components/Translator'
import { useEffect, useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import AddAddress from './AddAddress'

export default function AddressMethod() {
    const { address } = useAppSelector(state => state.user)
    const [selectedAddress, setSelectedAddress] = useState<{ details: string; phone: string; city: string } | null>(null)
    const [addressModal, setAddressModal] = useState(false)
    const [open, setOpen] = useState(false)
    const dispatch = useAppDispatch()



    useEffect(() => {
        dispatch(setAddMethodAction(selectedAddress))
        setOpen(false)
    }, [selectedAddress, dispatch])

    return (
        <div className='w-full shadow p-5 rounded shadow-gray-400  my-5 '>
            <div className='flex w-full justify-between items-start  '>
                <div>
                    <h2 className='text-red-600 font-bold text-xl flex items-center gap-x-2 '>
                        <Translator arabic={`عنوان الشحن`} english={`Shipping Address`} /> *
                    </h2>
                    {selectedAddress ?
                        <div>
                            <p className='my-3'>
                                <span className='font-semibold'>
                                    <Translator arabic='العنوان' english='Address' />
                                </span> : {selectedAddress?.details}
                            </p>
                            <p className='my-3'>
                                <span className='font-semibold'>
                                    <Translator arabic='الهاتف' english='Phone' />
                                </span> : {selectedAddress?.phone}
                            </p>
                            <p className='my-3'>
                                <span className='font-semibold'>
                                    <Translator arabic='المدينة' english='City' />
                                </span> : {selectedAddress?.city}
                            </p>
                        </div> :
                        <h2 className='  font-bold text-lg flex items-center  my-3'>
                            <Translator arabic='اختر عنوان' english='Select Address' />
                        </h2>
                    }
                </div>
                <button
                    onClick={() => setOpen(true)}
                    className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded '>
                    <Translator arabic='تحديد' english='Select' />
                </button>
            </div>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <div className='bg-white dark:bg-gray-700   rounded-xl flex flex-col w-10/12 md:w-1/2 lg:w-4/12  shadow-lg p-5 '>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-red-600 font-bold text-xl flex items-center gap-x-2  '>
                            <Translator arabic={`عنوان الشحن`} english={`Shipping Address`} /> *
                        </h2>
                        {addressModal && <button onClick={() => setAddressModal(false)} className='bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded  '>Back</button>}
                    </div>
                    <hr className='border-none h-px bg-gray-400 bg-opacity-50 my-2 ' />
                    <div className='w-full grow flex flex-col gap-y-3' >
                        {
                            !addressModal ?
                                <>
                                    {address?.map((address) => (
                                        <label htmlFor={address._id} key={address._id} className='hover:bg-gray-400 cursor-pointer flex items-center gap-x-2 transition-all duration-300'>
                                            <input
                                                type="radio"
                                                name={address.name}
                                                className='accent-red-600 me-2 '
                                                id={address._id}
                                                checked={selectedAddress?.details === address.details}
                                                value={selectedAddress?.details}
                                                onChange={() => setSelectedAddress({ details: address.details, phone: address.phone, city: address.city })}
                                            />
                                            {address.name}
                                            <div className='ms-10'>

                                                <p>Details: {address?.details} , {address?.city}</p>
                                                <p>Phone {address?.phone}</p>
                                            </div>
                                        </label>
                                    ))}
                                    <button className='font-bold text-base flex items-center  my-5 text-red-600' onClick={() => setAddressModal(true)}>
                                        <IoMdAdd size={"1.2rem"} />
                                        <Translator arabic='اضافة عنوان جديد' english='Add New ' />
                                    </button></>
                                :
                                <AddAddress close={setAddressModal} />
                        }
                    </div>
                </div >
            </Modal >
        </div >
    )
}
