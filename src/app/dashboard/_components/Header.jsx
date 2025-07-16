'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

const Header = () => {
    const path = usePathname();
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-md'>
      <Image src={'/logo.svg'} width={60} height={20}  alt='logo'/>
      <ul className='hidden md:flex gap-40'>
        <li className={`hover:text-blue-600 hover:font-bold transition-all cursor-pointer ${path == '/dashboard' && 'text-blue-600 font-bold'}`}>Dashboard</li>
        <li className={`hover:text-blue-600 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/questions' && 'text-blue-600 font-bold'}`}>Questions</li>
        <li className={`hover:text-blue-600 hover:font-bold transition-all cursor-pointer ${path == '/dashboard/start-interview' && 'text-blue-600 font-bold'}`}>Start a Interview</li>
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header