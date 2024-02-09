'use client'

import React, { useState } from 'react'

import confirm from '../../public/confirm.png'
import cancel from '../../public/cancel.png'
import Image from 'next/image'
import Link from 'next/link'

export default function CreditCreator({ credit, credits }) {

    const totalCredit = credits.length !== 0 ? credits.map(e => e.value).reduce((a, b) => a + b).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'

    const creditQty = credits.length

    const [name, setName] = useState()
    const [buttonName, setbuttonName] = useState(false)
    const handleName = (e) => {
        setName(e.target.value)
        if (e.target.value !== '') {
            setbuttonName(true)
        } else {
            setbuttonName(false)
        }
    }

    const [value, setValue] = useState()
    const [buttonValue, setbuttonValue] = useState(false)
    const handleValue = (e) => {
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
    const handleClose = (e) => {
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
    const handleExpire = (e) => {
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

    const [creditForm, setResourceForm] = useState(false)
    const handleResourceForm = () => {
        setResourceForm(!creditForm)
        if (!creditForm) {
            setName()
            setValue()
            setClose()
            setExpire()
        }
    }

    return (
        <>
            {creditForm &&
                <form action={(formData) => {
                    credit(formData)
                }} onSubmit={handleResourceForm} className='w-full md:w-4/6 mb-5'>
                    <p className="px-10 mb-2 text-lg font-semibold">Novo cartão de crédito</p>
                    <p className="px-10  text-sm my-5">Utilize seus cartões para informar a existência de pagamentos no crédito e parcelamentos em "Meus gastos".</p>
                    <p className="px-10  text-xs font-semibold mb-5">Preencha todos os campos corretamente.</p>

                    <div className='flex flex-col px-10 mb-5'>
                        <label className='mb-2 text-sm' htmlFor="name">Apelido do cartão</label>
                        <input onChange={handleName} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="text" name="name" id="name" value={name} placeholder='Pagamento no débito' />
                    </div>
                    <div className='flex flex-col px-10 mb-5'>
                        <label className='mb-2 text-sm' htmlFor="value">Limite total</label>
                        <input onChange={handleValue} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="value" id="value" value={value} placeholder='0,00' />
                    </div>
                    <div className='flex flex-col px-10 mb-5'>
                        <label className='mb-2 text-sm'>Fecha em / Vence em</label>
                        <div className='flex'>
                            <input onChange={handleClose} className='w-[50px] h-8 mr-2 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="current" id="current" value={close} placeholder='1' />
                            <input onChange={handleExpire} className='w-[50px] h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="last" id="last" value={expire} placeholder='12' />
                        </div>
                    </div>
                    <div className='flex w-full justify-end pr-10'>
                        {buttonName && buttonValue && buttonClose && buttonExpire &&
                            <button className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:invert">
                                <div className='invert mx-auto'>
                                    <Image src={confirm} alt='confirmar' width={50} height={50} className='invert opacity-30' />
                                </div>
                            </button>
                        }
                        <button onClick={handleResourceForm} className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:rotate-180">
                            <div className='invert mx-auto'>
                                <Image src={cancel} alt='cancelar' width={50} height={50} className='invert opacity-30' />
                            </div>
                        </button>
                    </div>
                </form>
            }

            {!creditForm &&
                <>
                    {credits.length !== 0 ?
                        <>
                            <p className="px-10 mb-3 text-xl font-semibold">Cartões de crédito</p>
                            <p className="px-10 mb-5 text-sm">Aqui você pode acompanhar o uso dos seus cartões de crédito e a formação das faturas a serem pagas no próximo mês.</p>

                            <div className="w-11/12 flex-nowrap justify-center items-center px-10">
                                <button onClick={handleResourceForm} className="w-[120px] bg-neutral-900 bg-opacity-10 border-dashed border border-white shadow-md hover:scale-105 hover:bg-opacity-20 hover:shadow-md hover:border-solid rounded-full my-2 mr-3 px-5 py-2 duration-300 hover:text-opacity-20">+ cartão</button>
                            </div>

                            <p className="px-10 my-5 text-xs">Clique em um item para mais opções.</p>
                        </>
                        :
                        <>
                            <p className="px-10 mb-3 font-semibold">Você não possui cartões de crédito</p>
                            <p className="px-10 mb-5 text-sm">Você precisa de cartões de crédito para adicionar gastos pagos no crédito e parcelamentos.</p>

                            <div className="w-11/12 flex-nowrap justify-center items-center px-10">
                                <button onClick={handleResourceForm} className="w-[120px] bg-neutral-900 bg-opacity-10 border-dashed border border-white shadow-md hover:scale-105 hover:bg-opacity-20 hover:shadow-md hover:border-solid rounded-full my-2 mr-3 px-5 py-2 duration-300 hover:text-opacity-20">+ cartão</button>
                            </div>
                        </>
                    }
                </>
            }
        </>
    )
}
