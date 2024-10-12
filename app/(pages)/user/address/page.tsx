"use client"

import Modal from '@/app/components/Modal'
import { useAppDispatch, useAppSelector } from '@/app/hooks/storeHooks'
import { removeAddress } from '@/app/Redux/slices/userSlice'
import React, { useState } from 'react'
import AddAddress from '../../cart/payment/AddAddress'

export default function Address() {
    const { address } = useAppSelector(state => state.user)
    const [openModel, setOpenModel] = useState(false)
    const dispatch = useAppDispatch()
    const handleOpen = () => setOpenModel(prev => !prev)

    return (
        <section className='grow '>
            <h1 className='text-2xl font-bold text-red-600 px-5 my-10'>Address</h1>
            {address.length > 0 ?
                <table className='w-full max-h-96 overflow-y-auto px-5 md:px-10  border-collapse'>
                    <thead>
                        <tr className=' mb-5'>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {address.map((address) => (
                            <tr key={address._id} className='text-center my-3 '>
                                <td>{address.name}</td>
                                <td>{address.phone}</td>
                                <td>{address.details}</td>
                                <td>{address.city}</td>
                                <td><button onClick={() => dispatch(removeAddress(address._id))} className='text-red-600 font-bold text-sm rounded-lg py-1 px-3 border border-red-600'>Delete</button></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={5} className=' text-center my-3'>
                                <button onClick={handleOpen} className='text-red-600 font-bold mx-auto flex  text-sm rounded-lg py-1 px-3 border border-red-600'>Add Address</button>
                            </td></tr>
                    </tbody>

                </table> :
                <div className='w-full flex flex-col gap-3 items-center px-5 md:px-10'>
                    <h2 className='text-xl font-bold '>No address Found</h2>
                    <button onClick={handleOpen} className='text-red-600 font-bold text-sm rounded-lg py-1 px-3 border border-red-600'>Add Address</button>
                </div>}
            <Modal isOpen={openModel} onClose={handleOpen}>
                <div className='shadow p-5 rounded shadow-gray-400 bg-white dark:bg-gray-800 min-w-96'>
                    <h2 className='text-2xl text-center font-bold text-red-600 px-5 my-10'>Add Address</h2>
                    <AddAddress close={setOpenModel} />
                </div>
            </Modal>
        </section>
    )
}
