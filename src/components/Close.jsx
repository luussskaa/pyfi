'use client'

import React, { useState } from 'react'

export default function Close({ currentMonth, endMonth }) {
    const [confirm, setConfirm] = useState(false)
    const handleConfirm = () => {
        setConfirm(!confirm)
    }
    return (
        <div className="w-full flex flex-col items-center justify-center text-justify mt-10">

            {confirm ?
                <>
                    <p className="px-10 mb-3 font-semibold">Você já concluiu as atividades deste mês?</p>
                    <p className="px-10 mb-5 text-xs">Clique no botão abaixo para seguir em frente. Após fechar o mês, seus recursos, poupanças e cartões de crédito continuarão como estão. Traremos para o mês seguinte as contas que não foram pagas, assim como as contas recorrentes e as faturas formadas pelo uso de seus cartões de crédito.</p>
                </>
                :
                <>
                    <p className="px-10 mb-3 font-semibold">Você já concluiu as atividades deste mês?</p>
                    {/* <p className="px-10 mb-5 text-xs">Clique no botão abaixo para concluir o mês atual e começar o mês seguinte.</p> */}
                    <p className="px-10 mb-5 text-xs">Clique no botão abaixo para seguir em frente. Após fechar o mês, seus recursos, poupanças e cartões de crédito continuarão como estão. Traremos para o mês seguinte as contas que não foram pagas, assim como as contas recorrentes e as faturas formadas pelo uso de seus cartões de crédito.</p>
                </>
            }

            <div className="w-11/12 flex justify-center items-center px-10">

                {confirm ?
                    <>
                        <button onClick={() => endMonth(currentMonth[0].id)} className="w-[250px] bg-neutral-900 bg-opacity-10 border-dashed border border-white shadow-md hover:scale-105 hover:bg-opacity-20 hover:shadow-md hover:border-solid rounded-full my-2 mr-3 px-5 py-2 duration-300 hover:text-opacity-20">Continuar</button>
                        <button onClick={handleConfirm} className="w-[250px] bg-neutral-900 bg-opacity-10 border-dashed border border-white shadow-md hover:scale-105 hover:bg-opacity-20 hover:shadow-md hover:border-solid rounded-full my-2 mr-3 px-5 py-2 duration-300 hover:text-opacity-20">Cancelar</button>
                    </>
                    :
                    <button onClick={handleConfirm} className="w-[250px] bg-neutral-900 bg-opacity-10 border-dashed border border-white shadow-md hover:scale-105 hover:bg-opacity-20 hover:shadow-md hover:border-solid rounded-full my-2 mr-3 px-5 py-2 duration-300 hover:text-opacity-20">FECHAR MÊS</button>
                }

            </div>

        </div>
    )
}
