import Image from 'next/image'
import React from 'react'
import cancel from '../../../public/cancel.png'

export default function CancelButton({ handleCancel }) {
    return (
        <button onClick={handleCancel} className='w-[40px] h-[40px] hover:rounded-full hover:bg-red-800 duration-300'>
            <Image src={cancel} alt='cancelar' width={30} height={30} className='mx-auto' />
        </button>
    )
}
