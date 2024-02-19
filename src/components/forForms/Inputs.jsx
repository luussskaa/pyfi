import React from 'react'

export default function Inputs({ type, title, handleFunc, name, value, placeholder }) {
    return (
        <>
            <div className='container'>
                <label htmlFor={name}>{title}</label>
                {name !== 'day' && name !== 'expire' ?
                    <input onChange={handleFunc} type={type} name={name} id={name} value={value} placeholder={placeholder} />
                    :
                    <input onChange={handleFunc} className='inputShort' type={type} name={name} id={name} value={value} placeholder={placeholder} />
                }
            </div>
        </>
    )
}
