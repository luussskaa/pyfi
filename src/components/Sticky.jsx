'use client'

import React from 'react'

import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import dinheiro from '../../public/dinheiro.png'
import gastos from '../../public/gastos.png'
import credito from '../../public/credito.png'
import Image from 'next/image'

export default function Sticky() {
    const { user, isLoaded } = useUser()
    return (
        <>
            <div className='w-full md:min-w-[362px] h-20 flex justify-between items-center bg-white bg-opacity-10 backdrop-blur-xl duration-300 max-[280px]:px-5 min-[281px]:px-10 shadow-md box-border sticky top-0 md:top-5 mx-auto md:rounded-full'>
                <div>
                    <span className='select-none text-lg'>py</span>
                    <span className='select-none text-lg'>fi</span>

                </div>
                <div className='w-3/6 hidden md:flex mx-auto justify-between items-center'>
                    <Link href='/'>
                        <Image src={dinheiro} alt='dinheiro' width={40} height={40} className='invert opacity-30 hover:opacity-100 duration-300' />
                    </Link>
                    <Link href='/gastos'>
                        <Image src={gastos} alt='dinheiro' width={40} height={40} className='invert opacity-30 hover:opacity-100 duration-300' />
                    </Link>
                    <Link href='/credito'>
                        <Image src={credito} alt='dinheiro' width={40} height={40} className='invert opacity-30 hover:opacity-100 duration-300' />
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
