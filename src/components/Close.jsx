'use client'

import React from 'react'

export default function Close({ currentMonth, endMonth }) {
    return (
        <div className="w-11/12 flex justify-center items-center px-10">
            <button onClick={() => endMonth(currentMonth[0].id)} className="w-[250px] bg-neutral-900 bg-opacity-10 border-dashed border border-white shadow-md hover:scale-105 hover:bg-opacity-20 hover:shadow-md hover:border-solid rounded-full my-2 mr-3 px-5 py-2 duration-300 hover:text-opacity-20">FECHAR MÊS</button>
        </div>
    )
}
