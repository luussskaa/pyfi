'use client'

import Link from 'next/link'
import React from 'react'

import dinheiro from '../../public/dinheiro.png'
import gastos from '../../public/gastos.png'
import credito from '../../public/credito.png'
import Image from 'next/image'

export default function Navbar() {
    return (
        <div className='w-full flex md:hidden justify-center items-center'>
            <div className='w-full bottom-0 rounded-none md:w-[362px] h-20 flex justify-evenly items-center bg-neutral-900 bg-opacity-30 backdrop-blur-xl md:bottom-8 fixed duration-300'>
                <Link href='/'>
                    <Image src={dinheiro} alt='dinheiro' width={40} height={40} className='invert opacity-30 hover:opacity-100 duration-300' />
                </Link>
                <Link href='/gastos'>
                    <Image src={gastos} alt='dinheiro' width={40} height={40} className='invert opacity-30 hover:opacity-100 duration-300' />
                </Link>
                <Link href='/credito'>
                    <Image src={credito} alt='dinheiro' width={40} height={40} className='invert opacity-30 hover:opacity-100 duration-300' />
                </Link>
            </div>
        </div>
    )
}