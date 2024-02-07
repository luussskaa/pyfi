'use client'

import Link from 'next/link'
import React, { useState } from 'react'

export default function FormGroup({ title, func, options }) {
    const [name, setName] = useState()
    const [buttonName, setbuttonName] = useState(false)
    const handleChangeName = (e) => {
        setName(e.target.value)
        if (e.target.value !== '') {
            setbuttonName(true)
        } else {
            setbuttonName(false)
        }
    }

    const [value, setValue] = useState()
    const [buttonValue, setbuttonValue] = useState(false)
    const handleChangeValue = (e) => {
        setValue(e.target.value)
        if (parseFloat(e.target.value) <= 0) {
            setbuttonValue(false)
        } else if (e.target.value !== '') {
            setbuttonValue(true)
        } else {
            setbuttonValue(false)
        }
    }

    const [close, setClose] = useState()
    const [expire, setExpire] = useState()
    const [buttonClose, setbuttonClose] = useState(false)
    const [buttonExpire, setbuttonExpire] = useState(false)
    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }
    const handleChangeClose = (e) => {
        setClose(e.target.value)
        if (parseFloat(e.target.value) <= 0) {
            setbuttonClose(false)
        } else if (isFloat(parseFloat(e.target.value))) {
            setbuttonClose(false)
        } else if (e.target.value !== '') {
            setbuttonClose(true)
        } else {
            setbuttonClose(false)
        }
    }
    const handleChangeExpire = (e) => {
        setExpire(e.target.value)
        if (parseFloat(e.target.value) <= 0) {
            setbuttonExpire(false)
        } else if (isFloat(parseFloat(e.target.value))) {
            setbuttonExpire(false)
        } else if (e.target.value !== '') {
            setbuttonExpire(true)
        } else {
            setbuttonExpire(false)
        }
    }

    const [current, setCurrent] = useState()
    const [last, setLast] = useState()
    const [buttonCurrent, setbuttonCurrent] = useState(false)
    const [buttonLast, setbuttonLast] = useState(false)
    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }
    const handleChangeCurrent = (e) => {
        setCurrent(e.target.value)
        if (parseFloat(e.target.value) <= 0) {
            setbuttonCurrent(false)
        } else if (isFloat(parseFloat(e.target.value))) {
            setbuttonCurrent(false)
        } else if (e.target.value !== '') {
            setbuttonCurrent(true)
        } else {
            setbuttonCurrent(false)
        }
    }
    const handleChangeLast = (e) => {
        setLast(e.target.value)
        if (parseFloat(e.target.value) <= 0) {
            setbuttonLast(false)
        } else if (isFloat(parseFloat(e.target.value))) {
            setbuttonLast(false)
        } else if (e.target.value !== '') {
            setbuttonLast(true)
        } else {
            setbuttonLast(false)
        }
    }

    const [day, setDay] = useState()
    const [buttonDay, setbuttonDay] = useState(false)
    const handleChangeDay = (e) => {
        setDay(e.target.value)
        if (parseFloat(e.target.value) <= 0) {
            setbuttonDay(false)
        } else if (isFloat(parseFloat(e.target.value))) {
            setbuttonDay(false)
        } else if (e.target.value !== '') {
            setbuttonDay(true)
        } else {
            setbuttonDay(false)
        }
    }

    const [option, setOption] = useState()
    const [buttonOption, setbuttonOption] = useState(false)
    const handleChangeOption = (e) => {
        setOption(e.target.value)
        if (parseFloat(e.target.value) <= 0) {
            setbuttonOption(false)
        } else if (e.target.value !== '') {
            setbuttonOption(true)
        } else {
            setbuttonOption(false)
        }
    }

    return (
        <>
            {title.includes('Novo') &&
                <>
                    {title.includes('recurso') &&
                        <>
                            <form action={(formData) => {
                                func(formData)
                            }} className='w-full flex flex-col items-center justify-center'>
                                <h1 className="text-3xl font-bold mt-20 mb-10 px-8 md:px-10 w-full text-center">{title}</h1>
                                <label className='px-8 md:px-10 mb-2 w-full text-center font-semibold' htmlFor="name">Nome</label>
                                <input onChange={handleChangeName} className='mx-auto h-12 w-10/12 md:w-3/6 mb-8 rounded-full bg-white bg-opacity-20 shadow-inner shadow-neutral-900 px-5 text-center' type="text" name="name" id="name" value={name} />

                                <label className='px-8 md:px-10 mb-2 w-full text-center font-semibold' htmlFor="value">R$</label>
                                <input onChange={handleChangeValue} className='mx-auto h-12 w-10/12 md:w-3/6 mb-8 rounded-full bg-white bg-opacity-20 shadow-inner shadow-neutral-900 px-5 text-center' type="number" name="value" id="value" value={value} />
                                {/* 
                            <label className='px-8 md:px-10 mb-2 w-full text-center font-semibold' htmlFor="installment">Fecha em / Vence em</label>
                            <div className='flex mx-auto w-10/12 md:w-3/6 justify-between items-center mb-8'>
                                <input onChange={handleChangeClose} className='inline-block mx-auto h-12 w-6/12 rounded-l-full bg-white bg-opacity-20 shadow-inner shadow-neutral-900 text-center' type="number" name="current" id="installment" value={close} />
                                <input onChange={handleChangeExpire} className='inline-block mx-auto h-12 w-6/12 rounded-r-full bg-white bg-opacity-20 shadow-inner shadow-neutral-900 text-center' type="number" name="last" id="installment" value={expire} />
                            </div>

                            <label className='px-8 md:px-10 mb-2 w-full text-center font-semibold' htmlFor="installment">Parcela atual / Última parcela</label>
                            <div className='flex mx-auto w-10/12 md:w-3/6 justify-between items-center mb-8'>
                                <input onChange={handleChangeCurrent} className='inline-block mx-auto h-12 w-6/12 rounded-l-full bg-white bg-opacity-20 shadow-inner shadow-neutral-900 text-center' type="number" name="current" id="installment" value={current} />
                                <input onChange={handleChangeLast} className='inline-block mx-auto h-12 w-6/12 rounded-r-full bg-white bg-opacity-20 shadow-inner shadow-neutral-900 text-center' type="number" name="last" id="installment" value={last} />
                            </div>

                            <label className='px-8 md:px-10 mb-2 w-full text-center font-semibold' htmlFor="value">Dia</label>
                            <input onChange={handleChangeDay} className='mx-auto h-12 w-2/6 md:w-1/6 mb-8 rounded-full bg-white bg-opacity-20 shadow-inner shadow-neutral-900 px-5 text-center' type="number" name="value" id="value" value={day} />


                            <label className='px-8 md:px-10 mb-2 w-full text-center font-semibold' htmpaymentlFor="select">Forma de pagamento</label>
                            <select onChange={handleChangeOption} className='mx-auto h-12 w-10/12 md:w-3/6 mb-8 rounded-full bg-white bg-opacity-20 shadow-inner shadow-neutral-900 px-5 text-center' type="number" name="payment" id="select" value={option}>
                                <option defaultValue="Selecione..." hidden>Selecione...</option>
                                <option className='text-xl text-center text-black' value="1">Dinheiro</option>
                                <option className='text-xl text-center text-black' value="1">Dinheiro</option>
                            </select> */}


                                {buttonName && buttonValue ?
                                    <button className="w-3/6 h-14 flex justify-center items-center bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 rounded-full mt-8 mx-auto font-bold shadow-md hover:scale-110 hover:bg-opacity-100 hover:shadow-md duration-300 text-xl hover:border-solid">salvar</button>
                                    :
                                    <button disabled className="w-3/6 h-14 flex justify-center items-center bg-neutral-900 bg-opacity-20 rounded-full mt-8 mx-auto font-bold shadow-md text-xl">...</button>
                                }

                                <Link href={'/'} className="w-3/6 h-14 flex justify-center items-center bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 rounded-full mt-8 mx-auto font-bold shadow-md hover:scale-110 hover:bg-opacity-100 hover:shadow-md duration-300 text-xl hover:border-solid">Voltar</Link>

                            </form>
                        </>
                    }
                    {title.includes('crédito') &&
                        <>
                            <form action={(formData) => {
                                func(formData)
                            }} className='w-full flex flex-col items-center justify-center'>
                                <h1 className="text-3xl font-bold mt-20 mb-10 px-8 md:px-10 w-full text-center">{title}</h1>
                                <label className='px-8 md:px-10 mb-2 w-full text-center font-semibold' htmlFor="name">Nome</label>
                                <input onChange={handleChangeName} className='mx-auto h-12 w-10/12 md:w-3/6 mb-8 rounded-full bg-white bg-opacity-20 shadow-inner shadow-neutral-900 px-5 text-center' type="text" name="name" id="name" value={name} />

                                <label className='px-8 md:px-10 mb-2 w-full text-center font-semibold' htmlFor="value">Limite total</label>
                                <input onChange={handleChangeValue} className='mx-auto h-12 w-10/12 md:w-3/6 mb-8 rounded-full bg-white bg-opacity-20 shadow-inner shadow-neutral-900 px-5 text-center' type="number" name="value" id="value" value={value} />

                                <label className='px-8 md:px-10 mb-2 w-full text-center font-semibold' htmlFor="installment">Fecha em / Vence em</label>
                                <div className='flex mx-auto w-10/12 md:w-3/6 justify-between items-center mb-8'>
                                    <input onChange={handleChangeClose} className='inline-block mx-auto h-12 w-6/12 rounded-l-full bg-white bg-opacity-20 shadow-inner shadow-neutral-900 text-center' type="number" name="current" id="installment" value={close} />
                                    <input onChange={handleChangeExpire} className='inline-block mx-auto h-12 w-6/12 rounded-r-full bg-white bg-opacity-20 shadow-inner shadow-neutral-900 text-center' type="number" name="last" id="installment" value={expire} />
                                </div>




                                {buttonName && buttonValue && buttonClose && buttonExpire ?
                                    <button className="w-3/6 h-14 flex justify-center items-center bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 rounded-full mt-8 mx-auto font-bold shadow-md hover:scale-110 hover:bg-opacity-100 hover:shadow-md duration-300 text-xl hover:border-solid">salvar</button>
                                    :
                                    <button disabled className="w-3/6 h-14 flex justify-center items-center bg-neutral-900 bg-opacity-20 rounded-full mt-8 mx-auto font-bold shadow-md text-xl">...</button>
                                }

                                <Link href={'/credito'} className="w-3/6 h-14 flex justify-center items-center bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 rounded-full mt-8 mx-auto font-bold shadow-md hover:scale-110 hover:bg-opacity-100 hover:shadow-md duration-300 text-xl hover:border-solid">Voltar</Link>

                            </form>
                        </>
                    }
                </>
            }
        </>
    )
}