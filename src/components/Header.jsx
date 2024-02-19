import React from 'react'

export default function Header({ month, title, value }) {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            {month !== undefined &&
                <div className="text-sm font-semibold mb-5 bg-pink-600 rounded-full py-1 px-2 text-white">{month}</div>
            }
            <div className="text-4xl font-semibold mb-2 text-pink-600">{title}</div>
            <div className="text-lg">R$ {value}</div>
        </div>
    )
}
