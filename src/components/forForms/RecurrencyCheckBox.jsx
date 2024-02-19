import React from 'react'

export default function RecurrencyCheckBox({ handleRecurrent, recurrent }) {
    return (
        <div className='container'>
            <label htmlFor="recurrent">Pagamento recorrente?</label>
            <div onClick={handleRecurrent} className='w-[48px] h-12 border rounded-md border-white px-2 flex justify-center items-center text-xl' name="recurrent" id="recurrent">{recurrent && '✓'}</div>
            <p className="text-sm my-5">⚠ Pagamentos recorrentes são adicionados automaticamente em todos os meses.</p>
        </div>
    )
}
