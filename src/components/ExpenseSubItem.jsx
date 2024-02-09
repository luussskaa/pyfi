import React from 'react'

export default function ExpenseSubItem({ title, value, type, details }) {
    return (
        <div className='w-full border border-t-white border-x-0 border-b-0'>
            {type === 'credit' ?
                <div className="text-sm font-semibold mb-2 mt-5">Dia {details} ➡ {title}</div>
                :
                type === 'installment' ?
                    <div className="text-sm font-semibold mb-2 mt-5">{details} ➡ {title}</div>
                    :
                    type === 'pending' ?
                        <div className="text-sm font-semibold mb-2 mt-5">{details} ➡ {title}</div>
                        :
                        type === undefined &&
                        <div className="text-sm font-semibold mb-2 mt-5">Dia {details} ➡ {title}</div>
            }
            <div className="mb-5">- R$ {(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>

        </div>
    )
}