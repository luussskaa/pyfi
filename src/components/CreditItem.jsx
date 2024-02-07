'use client'

import React, { useState } from 'react'
import Image from "next/image";

import opcao from '../../public/opcao.png'
import Link from 'next/link';

export default function CreditItem({ id, title, value, total, details, expenses }) {
    const [showSubItem, setShowSubItem] = useState(false)
    const handleClick = () => {
        setShowSubItem(!showSubItem)
    }
    return (
        <>
            <Link href={`/recursos/${id}/editar`} className="w-11/12 bg-neutral-900 bg-opacity-20 flex items-center mt-3 border border-neutral-600 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-100 md:hover:scale-105 mx-auto shadow-md">
                <div className="w-28 flex flex-col justify-center items-center">
                    {expenses.length !== 0 &&
                        <span className="inline-block font-semibold mt-2">{expenses.length}X</span>
                    }
                    <Image src={opcao} width={40} height={40} />
                    <div className="font-semibold mb-2">{details}</div>
                </div>
                <div className="w-4/6">
                    <div className="font-bold mb-2 mt-5">{title}</div>
                    <div className="text-lg">R$ {value}</div>
                    <div className="text-sm mb-5">de R$ {total}</div>
                </div>
            </Link >
        </>
    )
}
