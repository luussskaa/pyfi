'use client'

import Image from 'next/image'
import React from 'react'
import logo from '../../../public/logo.png'
import { redirect } from 'next/navigation'

export default function page() {
    const handleClick = () => {
        redirect('/')
    }
    return (
        <>
            <div className='w-full flex justify-center items-center my-16'>
                <Image src={logo} alt='dinheiro' width={50} height={50} />
                <span className='select-none text-3xl'>pyfi</span>
            </div>

            <div className='text-xl text-center font-bold px-10 mb-12'>Gerencie suas finanças pessoais - <span className='text-purple-600'>com uma praticidade inédita</span>.</div>

            <button onClick={handleClick} className='mx-auto h-12 px-10 bg-pink-600 rounded-full hover:bg-pink-800 duration-300'>Entrar</button>
        </>
    )
}
