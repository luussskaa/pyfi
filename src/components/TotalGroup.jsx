import React from 'react'

export default function TotalGroup({ title, total, qty }) {
    return (
        <div className="w-11/12 h-14 mb-5 px-5 py-2 mx-auto flex justify-between items-center text-pink-600 border border-pink-600 rounded-full hover:bg-pink-600 duration-300 hover:text-black">
            {qty > 0 ?
                <div className="w-4/6 font-semibold">{title} ({qty})</div>
                :
                <div className="w-4/6 font-semibold">{title}</div>
            }
            <div className="w-full flex flex-col justify-center items-end font-semibold">R$ {total}</div>
        </div>
    )
}
