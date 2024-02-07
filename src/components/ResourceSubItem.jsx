import React from 'react'

export default function ResourceSubItem({ title, value, details }) {
    return (
        <div className="bg-pink-800 flex flex-col justify-center pl-28 w-full text-white">
            <div className="font-bold mt-5 mb-2">{title}</div>
            <div className="text-lg mb-2">- R$ {value}</div>
            <div className="font-semibold mb-5">Dia {details}</div>
        </div>
    )
}