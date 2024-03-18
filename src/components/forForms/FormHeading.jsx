import React from 'react'

export default function FormHeading({ title, obs }) {
    return (
        <>
            <p className="px-10 mb-2 text-xl font-semibold text-pink-600 select-none">{title}</p>
            <p className="px-10 text-sm my-5 text-justify select-none">{obs}</p>
            <p className="px-10 text-sm font-semibold mb-5 select-none">Preencha todos os campos corretamente.</p>
        </>
    )
}
