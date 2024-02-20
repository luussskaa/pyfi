import React from 'react'
import ExpenseSubItem from '../ExpenseSubItem'
import CancelButton from '../forForms/CancelButton'

export default function ExtractCard({ allOff, title, value, total, expenses, handleExtract, invoice }) {
    return (
        <div onMouseLeave={allOff} className="w-full flex flex-col justify-center items-start px-10 mt-3 cursor-pointer rounded-3xl mx-auto shadow-md border border-white">
            <div className="w-full flex justify-center items-center">
                <div className='w-full'>
                    <div className="font-bold mb-2 mt-5">{title}</div>
                    <div className="text-lg mb-1">R$ {(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="text mb-5">de R$ {(total).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="text mb-5">( - R$ {(total - value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</div>
                    {invoice &&
                        <div className="text mb-5">Próx. Fatura: R$ {invoice}</div>
                    }
                </div>
                <div className='buttonFormContainer'>
                    <CancelButton handleCancel={handleExtract} />
                </div>
            </div>
            {expenses.map(e =>
                <ExpenseSubItem key={e.id} title={e.name} value={e.value} type={e.type} detailsA={e.detailsA} detailsB={e.detailsB} />
            )}

        </div>
    )
}
