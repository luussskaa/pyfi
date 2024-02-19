import Image from 'next/image'
import React from 'react'
import recurso from '../../../public/recurso.png'

export default function ResourceCard({ handleOptions, title, value, expenses }) {
    return (
        <div onClick={handleOptions} className="cardContainer">
            <div className="cardIconFrame">
                {expenses.length !== 0 &&
                    <span className="inline-block font-semibold">{expenses.length}X</span>
                }
                <Image src={recurso} width={40} height={40} alt='recurso' />
            </div>
            <div className="cardTextFrame">
                <div className="cardTitle">{title}</div>
                <div className="cardValue">R$ {(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
        </div >
    )
}
