import React from 'react'

export default function FormHeading({ title, obs }) {
    return (
        <>
            <p className="px-10 mb-2 text-lg font-semibold text-pink-600">{title}</p>
            <p className="px-10 text-sm my-5 text-justify">{obs}</p>
            <p className="px-10 text-sm font-semibold mb-5">Preencha todos os campos corretamente.</p>
        </>
    )
}
