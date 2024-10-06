"use client"
import Translator from '@/app/components/Translator'
import { useAppDispatch, useAppSelector } from '@/app/hooks/storeHooks'
import { useRouter } from 'next/navigation'
import React from 'react'
import PaymentMethod from './PaymentMethod'
import AddressMethod from './AddressMethod'
import { cardOrder, cashOrder } from '@/app/Redux/slices/orderSlice'
import { clearCart } from '@/app/Redux/slices/cartSlice'

export default function Payment() {
    const { cartId, orderAddress, payMethod } = useAppSelector(state => state.order)
    const { totalCartPrice } = useAppSelector(state => state.cart)
    const [loading, setLoading] = React.useState(false)
    const dispatch = useAppDispatch()
    const router = useRouter()
    // 
    const submitOrder = async () => {
        setLoading(true)
        switch (payMethod) {
            case "cash":
                const cash = await dispatch(cashOrder({
                    address: { shippingAddress: orderAddress },
                    cartId: cartId || ""
                }))
                cashOrder.fulfilled.match(cash) && router.replace("/allorders")
                setLoading(false)
                dispatch(clearCart())
                break;
            case "card":
                const card = await dispatch(cardOrder({
                    address: { shippingAddress: orderAddress },
                    cartId: cartId || ""
                }))
                cardOrder.fulfilled.match(card) && router.replace(card.payload.session.url)
                setLoading(false)
                dispatch(clearCart())
                break;
            default:
                setLoading(false)
                break;
        }
    }
    return (
        <section className=' my-5 lg:w-10/12 lg:mx-auto md:my-0 gap-x-5 flex flex-col gap-y-10 md:flex-row justify-center md:justify-between md:items-stretch items-center capitalize'>
            <div className='  grow  shadow p-5 rounded shadow-gray-400 w-full lg:w-1/2   '>
                <h2 className='text-red-600 font-bold text-xl'>
                    <Translator arabic={` تفاصيل الطلب`} english={`Order Details`} />
                </h2>
                <hr className='border-none h-px bg-gray-400 bg-opacity-50 my-2 ' />
                {/* handle Payment Method  */}
                <PaymentMethod />
                {/* handle Address Method  */}
                <AddressMethod />
            </div>
            {/* cart summery */}
            <div className=' md:self-start w-3/4 sm:w-5/12 md:w-6/12 lg:w-4/12  xl:w-3/12  shadow p-5 rounded shadow-gray-400'>
                <h2 className='text-red-600 font-semibold text-lg'>
                    <Translator arabic='اجمالي الطلب' english='Order summery' />
                </h2>
                <hr className='border-none h-px bg-gray-400 bg-opacity-50 my-2 ' />
                <p className=' my-6'>
                    <span className='font-semibold'>
                        <Translator arabic='الاجمالي' english='Subtotal' />
                    </span> : {totalCartPrice} EGP
                </p>
                <button
                    disabled={!cartId || !orderAddress || !payMethod}
                    onClick={submitOrder}
                    className='bg-red-600 w-full text-white  flex disabled:bg-gray-400  my-2 justify-center cursor-pointer items-center py-2 rounded-lg '>
                    {
                        loading ?
                            <div className='w-4 h-4 border-2 border-white rounded-full animate-spin mx-2'></div> :
                            <Translator arabic='تأكيد الشراء' english='Confirm Order' />
                    }
                </button>
            </div>
        </section>
    )
}
