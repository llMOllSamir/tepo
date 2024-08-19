"use client"
import React, { MouseEventHandler, useEffect } from 'react'

type props = {
    children: React.ReactNode
    isOpen: boolean
    onClose: () => void
}
export default function Modal({ children, isOpen, onClose }: props) {

    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div
            onClick={handleClose}
            className="z-30 fixed inset-0 bg-gray-300 bg-opacity-50   flex  justify-center items-center">
            {children}\
        </div>
    )
}
