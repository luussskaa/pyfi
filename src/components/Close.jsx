import React from 'react'

export default function Close() {
    return (
        <>
            <p className="text-2xl px-10 mt-5">Já concluiu <span className="font-bold">as atividades do mês</span>?</p>
            <button className="w-5/6 h-16 bg-black rounded-r-full mt-5 mb-8 text-white font-bold text-2xl text-start pl-8 shadow-md shadow-neutral-400 hover:text-black hover:bg-white duration-300">Fechar mês</button>
        </>
    )
}
