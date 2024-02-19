import Image from 'next/image'
import React from 'react'

export default function ExpenseCard({ handleOptions, title, value, detailsA, detailsB, icon, alt }) {
    return (
        <div onClick={handleOptions} className="cardContainer">
            <div className="cardIconFrame">
                <Image src={icon} width={40} height={40} alt={alt} />
                {detailsB ?
                    <div className="font-semibold">{detailsA} / {detailsB}</div>
                    : <div className="font-semibold">Dia {detailsA}</div>
                }
            </div>
            <div className="cardTextFrame">
                <div className="cardTitle">{title}</div>
                <div className="cardValue">R$ {value}</div>
            </div >
        </div>
    )
}
