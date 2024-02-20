import React from 'react'

export default function ExpenseSubItem({ title, value, type, detailsA, detailsB }) {
    return (
        <div className='w-full border border-t-white border-x-0 border-b-0'>
            {type === 'credit' ?
                <div className="text-sm font-semibold mb-2 mt-5">{title}</div>
                :
                type === 'installment' ?
                    <div className="text-sm font-semibold mb-2 mt-5">{title}</div>
                    :
                    type === 'pending' ?
                        <div className="text-sm font-semibold mb-2 mt-5">{title}</div>
                        :
                        type === 'debit' &&
                        <div className="text-sm font-semibold mb-2 mt-5">{title}</div>
            }
            {type !== 'installment' ?
                <>
                    <div className="mb-2">- R$ {(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="mb-5 text-sm font-semibold">Dia {detailsA}</div>
                </>
                :
                <>
                    <div className="mb-2">- R$ {((detailsB - (detailsA - 1)) * value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="mb-2 text-sm">({detailsB}X de R$ {(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</div>
                    <div className="mb-5 text-sm font-semibold">{detailsA} / {detailsB}</div>
                </>
            }

        </div>
    )
}