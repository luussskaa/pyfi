import React from 'react'

export default function PreviousMonthsItem({ id, name, value }) {
    return (
        <div key={id} className="font-semibold mt-2 mr-2 border border-purple-600 rounded-full py-1 px-2 text-white hover:text-black hover:bg-purple-600 duration-300">{name.slice(0, 3)} → R$ {(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
    )
}
