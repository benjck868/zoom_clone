'use client'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Sidebar() {
    const pathname = usePathname()
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white lg:w-[264px] max-sm:hidden'>
        <div className='flex flex-1 flex-col gap-6 '>
            {
                sidebarLinks.map((link, index)=>{
                    const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`)
                    return(
                        <Link key={index} href={link.route} className={cn('flex gap-4 items-center p-4 rounded-lg justify-start hover-sidebar-menu',{'bg-blue-1':isActive})}>
                        <Image src={link.imgUrl} alt={link.label} height={24} width={24} className=''/>
                        <p className='text-lg font-semibold max-lg:hidden'>{link.label}</p></Link>
                    )
                })
            }
        </div>
    </section>
  )
}
