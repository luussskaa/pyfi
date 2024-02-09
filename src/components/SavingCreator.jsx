'use client'

import React, { useState } from 'react'

import confirm from '../../public/confirm.png'
import cancel from '../../public/cancel.png'
import Image from 'next/image'
import Link from 'next/link'

export default function SavingCreator({ saving, savings }) {

    const totalSavings = savings.length !== 0 ? savings.map(e => e.value).reduce((a, b) => a + b).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'

    const savingsQty = savings.length

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

    const [savingForm, setSavingForm] = useState(false)
    const handleSavingForm = () => {
        setSavingForm(!savingForm)
        if (!savingForm) {
            setName()
            setValue()
        }
    }

    return (
        <>
            {savingForm &&
                <form action={(formData) => {
                    saving(formData)
                }} onSubmit={handleSavingForm} className='w-full md:w-4/6 mb-5'>
                    <p className="px-10 mb-2 text-lg font-semibold">Nova poupança</p>
                    <p className="px-10  text-sm my-5">Poupanças são valores que você pretende guardar.</p>
                    <p className="px-10  text-xs font-semibold mb-5">Preencha todos os campos corretamente.</p>

                    <div className='flex flex-col px-10 mb-5'>
                        <label className='mb-2 text-sm' htmlFor="name">Descrição</label>
                        <input onChange={handleName} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="text" name="name" id="name" value={name} placeholder='Pagamento no débito' />
                    </div>
                    <div className='flex flex-col px-10 mb-5'>
                        <label className='mb-2 text-sm' htmlFor="value">Valor</label>
                        <input onChange={handleValue} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="value" id="value" value={value} placeholder='0,00' />
                    </div>
                    <div className='flex w-full justify-end pr-10'>
                        {buttonName && buttonValue &&
                            <button className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:invert">
                                <div className='invert mx-auto'>
                                    <Image src={confirm} alt='confirmar' width={50} height={50} className='invert opacity-30' />
                                </div>
                            </button>
                        }
                        <button onClick={handleSavingForm} className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:rotate-180">
                            <div className='invert mx-auto'>
                                <Image src={cancel} alt='cancelar' width={50} height={50} className='invert opacity-30' />
                            </div>
                        </button>
                    </div>
                </form>
            }

            {!savingForm &&
                <>
                    {savings.length !== 0 ?
                        <>
                            <p className="px-10 mb-3 text-xl font-semibold">Poupanças</p>
                            <p className="px-10 mb-5 text-sm">Aqui fica o dinheiro que você tem guardado.</p>

                            <div className="w-11/12 flex-nowrap justify-center items-center px-10">
                                <button onClick={handleSavingForm} className="w-[150px] bg-neutral-900 bg-opacity-10 border-dashed border border-white shadow-md hover:scale-105 hover:bg-opacity-20 hover:shadow-md hover:border-solid rounded-full my-2 mr-3 px-5 py-2 duration-300 hover:text-opacity-20">+ poupança</button>
                            </div>

                            <div className="w-full mt-10 mb-5 px-10 flex justify-between items-center">
                                <div className="text-lg font-semibold">Total</div>
                                <div className="w-full flex flex-col justify-center items-end">
                                    <span>R$ {totalSavings}</span>
                                    {savingsQty > 1 ?
                                        <span className="text-xs">em {savingsQty} poupanças</span>
                                        :
                                        <span className="text-xs">em uma poupança</span>
                                    }
                                </div>
                            </div>

                            <p className="px-10 mb-5 text-xs">Clique em um item para mais opções.</p>
                        </>
                        :
                        <>
                            <p className="px-10 mb-3 font-semibold">Você não possui poupanças</p>
                            <p className="px-10 mb-5 text-sm">Aqui ficaria o dinheiro que você tem guardado.</p>

                            <div className="w-11/12 flex-nowrap justify-center items-center px-10">
                                <button onClick={handleSavingForm} className="w-[150px] bg-neutral-900 bg-opacity-10 border-dashed border border-white shadow-md hover:scale-105 hover:bg-opacity-20 hover:shadow-md hover:border-solid rounded-full my-2 mr-3 px-5 py-2 duration-300 hover:text-opacity-20">+ poupança</button>
                            </div>
                        </>
                    }
                </>
            }
        </>
    )
}
