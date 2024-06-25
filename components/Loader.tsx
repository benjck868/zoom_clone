import Image from 'next/image'
import React from 'react'

export default function Loader() {
  return (
    <div className='flex items-center justify-center h-screen w-full '>
        <Image src={'/icons/loading-circle.svg'} alt="loading svg" height={50} width={50} />
    </div>
  )
}
