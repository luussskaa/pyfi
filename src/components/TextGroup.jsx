import Link from 'next/link'
import React from 'react'

export default function TextGroup({ heading, text, qty }) {
    return (
        <>
            {qty > 0 ?
                <p className="px-10 mb-3 text-xl font-semibold text-pink-600 select-none">{heading} ({qty})</p>
                :
                <p className="px-10 mb-3 text-xl font-semibold text-pink-600 select-none">{heading}</p>
            }
            <p className="px-10 mb-5 text-sm select-none">{text}</p>
        </>
    )
}