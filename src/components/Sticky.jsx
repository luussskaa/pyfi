'use client'

import React from 'react'

import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import dinheiro from '../../public/dinheiro.png'
import gastos from '../../public/gastos.png'
import credito from '../../public/credito.png'
import logo from '../../public/logo.png'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Sticky() {
    const { user, isLoaded } = useUser()
    const pathname = usePathname()
    return (
        <>
            <div className='w-full md:min-w-[362px] h-20 flex justify-between items-center bg-neutral-900 bg-opacity-30 backdrop-blur-xl duration-300 max-[280px]:px-5 min-[281px]:px-10 box-border sticky top-0 mx-auto border border-y-0 border-x-neutral-800'>
                <div className='flex'>
                    <Image src={logo} alt='dinheiro' width={20} height={20} />
                    <span className='select-none text-lg'>pyfi</span>
                </div>
                <div className='w-3/6 hidden md:flex mx-auto justify-between items-center'>
                    <Link href='/'>
                        {pathname === '/' ?
                            <Image src={dinheiro} alt='dinheiro' width={40} height={40} className='invert opacity-100 duration-300' />
                            :
                            <Image src={dinheiro} alt='dinheiro' width={40} height={40} className='invert opacity-30 hover:opacity-100 duration-300' />
                        }
                    </Link>
                    <Link href='/gastos'>
                        {pathname === '/gastos' ?
                            <Image src={gastos} alt='dinheiro' width={40} height={40} className='invert opacity-100 duration-300' />
                            :
                            <Image src={gastos} alt='dinheiro' width={40} height={40} className='invert opacity-30 hover:opacity-100 duration-300' />
                        }
                    </Link>
                    <Link href='/credito'>
                        {pathname === '/credito' ?
                            <Image src={credito} alt='dinheiro' width={40} height={40} className='invert opacity-100 duration-300' />
                            :
                            <Image src={credito} alt='dinheiro' width={40} height={40} className='invert opacity-30 hover:opacity-100 duration-300' />
                        }
                    </Link>
                </div >
                <div>
                    {isLoaded && user ?
                        <UserButton />
                        :
                        <p>q</p>
                    }
                </div>
            </div>
        </>
    )
}
