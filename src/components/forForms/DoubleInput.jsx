import React from 'react'

export default function DoubleInput({ title, handleFuncA, handleFuncB, A, B, valueA, valueB }) {
    return (
        <div className='container'>
            <label>{title}</label>
            <div className='flex'>
                <input onChange={handleFuncA} className='inputShort' type="number" name={A} id={A} value={valueA} placeholder='1' />
                <input onChange={handleFuncB} className='inputShort' type="number" name={B} id={B} value={valueB} placeholder='12' />
            </div>
        </div>
    )
}
