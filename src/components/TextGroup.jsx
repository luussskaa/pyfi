import Link from 'next/link'
import React from 'react'

export default function TextGroup({ title, normal, bold, where }) {
    return (
        <>
            <h1 className="text-3xl font-bold mt-10 mb-5 px-8 md:px-10">• {title}</h1>
            <p className="px-8 md:px-10">{normal}<span className="font-bold">{bold}</span>.</p>
            <Link href={`${where}/adicionar`} className="w-3/6 h-14 flex justify-center items-center bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 rounded-full mt-8 mx-auto mb-5 font-bold shadow-md hover:scale-110 hover:bg-opacity-100 hover:shadow-md duration-300 text-4xl hover:border-solid">+</Link>
        </>
    )
}