'use client'
import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

type MeetingModalProps = {
    isOpen : boolean
    onClose : ()=>void
    title: string
    className?: string
    children?: ReactNode
    handleClick?: ()=>void
    buttonText?: string
    image?: string
    buttonIcon?: string
}

export default function MeetingModal({isOpen, onClose, title, className, children, handleClick, buttonText, image, buttonIcon}:MeetingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className='flex flex-col w-full max-w-[520px] gap-6 border-none bg-dark-1 px-6 py-9 text-white'>
            <div className='flex flex-col gap-6'>
                {
                    image && (
                        <div className='flex justify-center'>
                            <Image src={image} alt="image" height={72} width={72} />
                        </div>
                    )
                }
                <h1 className={cn('text-3xl font-bold leading-[42px]',className)}>{title}</h1>
                {children}
                <Button className='bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0' onClick={handleClick}>
                {buttonIcon && (
                    <Image src={buttonIcon} alt="button icon" height={13} width={13} />
                )} &nbsp;
                {buttonText || 'Schedule Meeting'}</Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}
