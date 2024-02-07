import React from 'react'
import Image from "next/image";

import Link from 'next/link';

export default function SavingItem({ id, title, value }) {
    return (
        <>
            <Link href={`/poupancas/${id}/pagar`} className="w-11/12 bg-neutral-900 bg-opacity-20 flex items-center mt-3 border border-neutral-600 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-100 md:hover:scale-105 mx-auto shadow-md">
                <div className="w-28 flex justify-center items-center">
                    <Image src={poupanca} width={40} height={40} />
                </div>
                <div className="w-4/6">
                    <div className="font-bold mt-5 mb-2">{title}</div>
                    <div className="text-lg mb-5">R$ {value}</div>
                </div>
            </Link>
        </>
    )
}
