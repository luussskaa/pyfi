import Image from 'next/image'
import React from 'react'
import confirm from '../../../public/confirm.png'

export default function ConfirmButton() {
    return (
        <button className="w-[40px] h-[40px] mr-10 hover:rounded-full hover:bg-green-800 duration-300">
            <Image src={confirm} alt='confirmar' width={30} height={30} className='mx-auto' />
        </button>
    )
}
