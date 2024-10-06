"use client"

import Translator from '@/app/components/Translator'
import { useAppDispatch } from '@/app/hooks/storeHooks'
import React, { useEffect, useState } from 'react'
import { setPayMethod as setPayMethodAction } from "@/app/Redux/slices/orderSlice"
import Modal from '@/app/components/Modal'

export default function PaymentMethod() {
    const [payMethod, setPayMethod] = useState<string>("cash")
    const [open, setOpen] = useState(false)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(setPayMethodAction(payMethod))
        setOpen(false)
    }, [payMethod, dispatch])


    return (
        <div className='w-full shadow p-5 rounded shadow-gray-400  my-5'>
            <div className='flex w-full justify-between items-center  '>
                <h2 className='text-red-600 font-bold text-xl flex items-center gap-x-2 '>
                    <Translator arabic={`طريقة الدفع`} english={`Payment Method`} />
                    <span className='text-lg capitalize bg-red-600 text-white font-bold py-1 px-2 rounded  ' >{payMethod}</span>
                </h2>
                <button
                    onClick={() => setOpen(true)}
                    className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded  '>
                    <Translator arabic='تغيير' english='Change' />
                </button>
            </div>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <div className='bg-white dark:bg-gray-700   rounded-xl flex flex-col w-10/12 md:w-1/2 lg:w-4/12 shadow-lg p-5 ' >
                    <h2 className='text-red-600 font-bold text-xl flex items-center gap-x-2  '>
                        <Translator arabic={`طريقة الدفع`} english={`Payment Method`} />
                    </h2>
                    <hr className='border-none h-px bg-gray-400 bg-opacity-50 my-2 ' />
                    <div className='flex flex-col   gap-y-2'>
                        <label htmlFor="cash" className='flex items-center  gap-x-3 '>
                            <input
                                type="radio"
                                id="cash"
                                className='size-4    accent-red-600'
                                name="payment"
                                value="cash"
                                checked={payMethod === "cash"}
                                onChange={(e) => setPayMethod(e.target.value)}
                            />
                            <Translator arabic={`الدفع عند الاستلام`} english={`Cash on delivery`} />
                        </label>

                        <label htmlFor="card" className='flex items-center gap-x-3 '>
                            <input
                                type="radio"
                                id="card"
                                name="payment"
                                className='size-4    accent-red-600'
                                value="card"
                                checked={payMethod === "card"}
                                onChange={(e) => setPayMethod(e.target.value)} />
                            <Translator arabic={` الدفع بالبطاقة`} english={`Pay by card`} />
                        </label>

                    </div>
                </div>
            </Modal>
        </div>
    )
}
