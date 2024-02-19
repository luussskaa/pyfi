import React from 'react'

export default function Button({ title, handleClick }) {
    return (
        <button onClick={handleClick} className="bg-neutral-900 bg-opacity-10 border-dashed border border-white shadow-md rounded-full my-2 mr-3 px-5 py-2 duration-300 hover:border-solid hover:font-bold hover:scale-105">{title}</button>
    )
}