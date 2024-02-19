import Image from 'next/image'
import React from 'react'
import poupanca from '../../../public/poupanca.png'

export default function SavingCard({ handleOptions, title, value }) {
    return (
        <div onClick={handleOptions} className="cardContainer">
            <div className="cardIconFrame">
                <Image src={poupanca} width={40} height={40} alt='poupança' />
            </div>
            <div className="cardTextFrame">
                <div className="cardTitle">{title}</div>
                <div className="cardValue">R$ {(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
        </div >
    )
}
