'use client'
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function MobileNav() {
    const pathname = usePathname()
  return (
    <section className='w-full max-w-[264px]'>
        <Sheet>
            <SheetTrigger asChild><Image src={"/icons/hamburger.svg"} alt='menu icon' height={36} width={36} className='cursor-pointer sm:hidden'/></SheetTrigger>
            <SheetContent side={'left'} className='border-none bg-dark-1'>
                <Link href="/" title='Home' className='flex items-center gap-1'>
                    <Image src={"/icons/logo.svg"} alt='app logo' height={32} width={32} className='max-sm:size-10'/>
                    <p className='text-[26px] font-extrabold text-white max-sm:hidden'>Yoom</p>
                </Link>
                <div className='flex flex-col justify-between overflow-y-auto h-[calc(100vh-72px)]'>
                    <SheetClose asChild>
                        <section className='flex flex-col h-full gap-6 pt-16 text-white'>
                            {
                                sidebarLinks.map((link, index)=>{
                                    const isActive = pathname === link.route
                                    return(
                                        <SheetClose asChild key={index}>
                                            <Link key={index} href={link.route} className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60',{'bg-blue-1':isActive})}>
                                            <Image src={link.imgUrl} alt={link.label} height={20} width={20} className=''/>
                                            <p className='font-semibold'>{link.label}</p></Link>
                                        </SheetClose>
                                    )
                                })
                            }
                        </section>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    </section>
  )
}
