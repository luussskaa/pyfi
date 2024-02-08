'use client'

import React, { useState } from 'react'

import confirm from '../../public/confirm.png'
import cancel from '../../public/cancel.png'
import Image from 'next/image'
import Link from 'next/link'

export default function ExpenseCreator({ debit, credit, installment, pending, debitOptions, creditOptions, maxResource, maxCredit }) {

    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }

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

    const [day, setDay] = useState()
    const [buttonDay, setbuttonDay] = useState(false)
    const handleDay = (e) => {
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

    const [recurrent, setRecurrent] = useState(false)
    const handleRecurrent = () => {
        setRecurrent(!recurrent)
    }

    const [current, setCurrent] = useState()
    const [last, setLast] = useState()
    const [buttonCurrent, setbuttonCurrent] = useState(false)
    const [buttonLast, setbuttonLast] = useState(false)
    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }

    const handleCurrent = (e) => {
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
    const handleLast = (e) => {
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


    const [option, setOption] = useState()
    const [buttonOption, setbuttonOption] = useState(false)
    const handleOption = (e) => {
        setOption(e.target.value)
        if (parseFloat(e.target.value) <= 0) {
            setbuttonOption(false)
        } else if (e.target.value !== '') {
            setbuttonOption(true)
        } else {
            setbuttonOption(false)
        }
    }

    const [debitForm, setDebitForm] = useState(false)
    const handleDebitForm = () => {
        setDebitForm(!debitForm)
        if (!debitForm) {
            setName()
            setValue()
            setDay()
            setOption()
            setCurrent()
            setLast()
            setRecurrent()
        }
    }

    const [creditForm, setCreditForm] = useState(false)
    const handleCreditForm = () => {
        setCreditForm(!creditForm)
        if (!creditForm) {
            setName()
            setValue()
            setDay()
            setOption()
            setCurrent()
            setLast()
            setRecurrent()
        }
    }

    const [installmentForm, setInstallmentForm] = useState(false)
    const handleInstallmentForm = () => {
        setInstallmentForm(!installmentForm)
        if (!installmentForm) {
            setName()
            setValue()
            setDay()
            setOption()
            setCurrent()
            setLast()
            setRecurrent()
        }
    }

    const [pendingForm, setPendingForm] = useState(false)
    const handlePendingForm = () => {
        setPendingForm(!pendingForm)
        if (!pendingForm) {
            setName()
            setValue()
            setDay()
            setOption()
            setCurrent()
            setLast()
            setRecurrent()
        }
    }

    return (
        <>
            {debitForm &&
                <form action={(formData) => {
                    debit(recurrent, formData)
                }} onSubmit={handleDebitForm} className='w-full md:w-4/6'>
                    <p className="px-10 mb-2 text-lg font-semibold">Novo pagamento no débito</p>
                    <p className="px-10  text-sm my-5">⚠ O valor deste pagamento é deduzido automaticamente do recurso utilizado como forma de pagamento.</p>
                    <p className="px-10  text-xs font-semibold mb-5">Preencha todos os campos corretamente.</p>

                    <div className='flex flex-col px-10 mb-5'>
                        <label className='mb-2 text-sm' htmlFor="name">Descrição</label>
                        <input onChange={handleName} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="text" name="name" id="name" value={name} placeholder='Pagamento no débito' />
                    </div>
                    <div className='flex flex-col px-10 mb-5'>
                        <label className='mb-2 text-sm' htmlFor="value">Valor</label>
                        <input onChange={handleValue} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="value" id="value" value={value} placeholder='0,00' />
                    </div>
                    {value <= maxResource ?
                        <div className='flex flex-col px-10 mb-5'>
                            <label className='mb-2 text-sm' htmlFor="option">Forma de pagamento</label>
                            <select onChange={handleOption} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' name="option" id="option" value={option}>
                                <option defaultValue={'Selecione...'} hidden>Selecione...</option>
                                {debitOptions.filter(e => e.value >= value).map(e =>
                                    <option key={e.id} value={e.id}>{`${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                                )}
                            </select>
                        </div>
                        : value > 0 && value > maxResource && <p className="px-10 mb-5">Você não possui recursos disponíveis para este pagamento. <Link href={'/'} className='font-semibold'>Confira seus recursos ↗</Link></p>
                    }
                    <div className='flex flex-col px-10 mb-5'>
                        <label className='mb-2 text-sm' htmlFor="day">Dia</label>
                        <input onChange={handleDay} className='w-[50px] h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="day" id="day" value={day} placeholder='3' />
                    </div>
                    <div className='flex flex-col items-start px-10 mb-5'>
                        <label className='mb-2 text-sm' htmlFor="recurrent">Recorrente?</label>
                        <div onClick={handleRecurrent} className='w-[32px] h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2 flex justify-center items-center' type="checkbox" name="recurrent" id="recurrent" value={day} placeholder='3'>{recurrent && '✓'}</div>
                        <p className="text-sm my-5">⚠ Pagamentos recorrentes são adicionados automaticamente em todos os meses.</p>
                    </div>
                    <div className='flex w-full justify-end pr-10'>
                        {buttonName && buttonValue && buttonDay && day <= 31 && buttonOption &&
                            <button className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:invert">
                                <div className='invert mx-auto'>
                                    <Image src={confirm} alt='confirmar' width={50} height={50} className='invert opacity-30' />
                                </div>
                            </button>
                        }
                        <button onClick={handleDebitForm} className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:rotate-180">
                            <div className='invert mx-auto'>
                                <Image src={cancel} alt='cancelar' width={50} height={50} className='invert opacity-30' />
                            </div>
                        </button>
                    </div>
                </form>
            }

            {creditForm &&
                <form action={(formData) => {
                    credit(formData)
                }} onSubmit={handleCreditForm} className='w-full md:w-4/6'>
                    <p className="px-10 mb-2 text-lg font-semibold">Novo pagamento no crédito</p>
                    <p className="px-10  text-sm my-5">⚠ O valor deste pagamento é deduzido automaticamente da opção de crédito utilizada como forma de pagamento.</p>
                    <p className="px-10  text-xs font-semibold mb-5">Preencha todos os campos corretamente.</p>
                    <div className='flex flex-col px-10 mb-5'>
                        <label className='mb-2 text-sm' htmlFor="name">Descrição</label>
                        <input onChange={handleName} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="text" name="name" id="name" value={name} placeholder='Pagamento no crédito' />
                    </div>
                    <div className='flex flex-col px-10 mb-5'>
                        <label className='mb-2 text-sm' htmlFor="value">Valor</label>
                        <input onChange={handleValue} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="value" id="value" value={value} placeholder='0,00' />
                    </div>
                    {value <= maxCredit ?
                        <div className='flex flex-col px-10 mb-5'>
                            <label className='mb-2 text-sm' htmlFor="option">Forma de pagamento</label>
                            <select onChange={handleOption} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' name="option" id="option" value={option}>
                                <option defaultValue={'Selecione...'} hidden>Selecione...</option>
                                {creditOptions.filter(e => e.value >= value).map(e =>
                                    <option key={e.id} value={e.id}>{`${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                                )}
                            </select>
                        </div>
                        : value > 0 && value > maxCredit && <p className="px-10 mb-5">Você não possui opções de crédito disponíveis para este pagamento. <Link href={'/credito'} className='font-semibold'>Confira suas opções de crédito ↗</Link></p>
                    }
                    <div className='flex flex-col px-10 mb-5'>
                        <label className='mb-2 text-sm' htmlFor="day">Dia</label>
                        <input onChange={handleDay} className='w-[50px] h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="day" id="day" value={day} placeholder='3' />
                    </div>
                    <div className='flex w-full justify-end pr-10'>
                        {buttonName && buttonValue && buttonDay && day <= 31 && buttonOption &&
                            <button className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:invert">
                                <div className='invert mx-auto'>
                                    <Image src={confirm} alt='confirmar' width={50} height={50} className='invert opacity-30' />
                                </div>
                            </button>
                        }
                        <button onClick={handleCreditForm} className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:rotate-180">
                            <div className='invert mx-auto'>
                                <Image src={cancel} alt='cancelar' width={50} height={50} className='invert opacity-30' />
                            </div>
                        </button>
                    </div>
                </form>
            }

            {installmentForm &&
                <form action={(formData) => {
                    installment(formData)
                }} onSubmit={handleInstallmentForm} className='w-full md:w-4/6'>
                    <p className="px-10 mb-2 text-lg font-semibold">Novo parcelamento</p>
                    <p className="px-10  text-sm my-5">⚠ O valor total de um parcelamento (valor da parcela X n° de parcelas) é deduzido automaticamente da opção de crédito utilizada como forma de pagamento.</p>
                    <p className="px-10  text-xs font-semibold mb-5">Preencha todos os campos corretamente.</p>
                    <div className='flex flex-col px-10 mb-5'>
                        <label className='mb-2 text-sm' htmlFor="name">Descrição</label>
                        <input onChange={handleName} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="text" name="name" id="name" value={name} placeholder='Parcelamento' />
                    </div>
                    <div className='flex flex-col px-10 mb-5'>
                        <label className='mb-2 text-sm' htmlFor="value">Valor da parcela</label>
                        <input onChange={handleValue} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="value" id="value" value={value} placeholder='0,00' />
                    </div>
                    <div className='flex flex-col px-10 mb-5'>
                        <label className='mb-2 text-sm'>Parcela atual / última</label>
                        <div className='flex'>
                            <input onChange={handleCurrent} className='w-[50px] h-8 mr-2 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="current" id="current" value={current} placeholder='1' />
                            <input onChange={handleLast} className='w-[50px] h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="last" id="last" value={last} placeholder='12' />
                        </div>
                    </div>
                    {value > 0 && value * parseFloat(last) <= maxCredit ?
                        <div className='flex flex-col px-10 mb-5'>
                            <label className='mb-2 text-sm' htmlFor="option">Forma de pagamento</label>
                            <select onChange={handleOption} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' name="option" id="option" value={option}>
                                <option defaultValue={'Selecione...'} hidden>Selecione...</option>
                                {creditOptions.filter(e => parseFloat(e.value) >= value * parseFloat(last)).map(e =>
                                    <option key={e.id} value={e.id}>{`${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                                )}
                            </select>
                        </div>
                        : value > 0 && value * parseFloat(last) ? <p className="px-10 mb-5">Você não possui opções de crédito disponíveis para este parcelamento. <Link href={'/credito'} className='font-semibold'>Confira suas opções de crédito ↗</Link></p>
                            : null
                    }
                    <div className='flex w-full justify-end pr-10'>
                        {buttonName && buttonValue && buttonOption && buttonCurrent && buttonLast && current <= last &&
                            <button className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:invert">
                                <div className='invert mx-auto'>
                                    <Image src={confirm} alt='confirmar' width={50} height={50} className='invert opacity-30' />
                                </div>
                            </button>
                        }
                        <button onClick={handleInstallmentForm} className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:rotate-180">
                            <div className='invert mx-auto'>
                                <Image src={cancel} alt='cancelar' width={50} height={50} className='invert opacity-30' />
                            </div>
                        </button>
                    </div>
                </form>
            }

            {pendingForm &&
                <form action={(formData) => {
                    pending(formData)
                }} onSubmit={handlePendingForm} className='w-full md:w-4/6'>
                    <p className="px-10 mb-2 text-lg font-semibold">Novo pagamento pendente</p>
                    <p className="px-10  text-sm my-5">⚠ Pagamentos pendentes são aqueles que ainda não foram efetuados. Você vai poder sinalizar o pagamento destas contas a qualquer momento.</p>
                    <p className="px-10  text-xs font-semibold mb-5">Preencha todos os campos corretamente.</p>
                    <div className='flex flex-col px-10 mb-5'>
                        <label className='mb-2 text-sm' htmlFor="name">Descrição</label>
                        <input onChange={handleName} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="text" name="name" id="name" value={name} placeholder='Pagamento pendente' />
                    </div>
                    <div className='flex flex-col px-10 mb-5'>
                        <label className='mb-2 text-sm' htmlFor="value">Valor</label>
                        <input onChange={handleValue} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="value" id="value" value={value} placeholder='0,00' />
                    </div>
                    <div className='flex flex-col px-10 mb-5'>
                        <label className='mb-2 text-sm' htmlFor="day">Dia</label>
                        <input onChange={handleDay} className='w-[50px] h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="day" id="day" value={day} placeholder='3' />
                    </div>
                    <div className='flex w-full justify-end pr-10'>
                        {buttonName && buttonValue && buttonDay && day <= 31 &&
                            <button className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:invert">
                                <div className='invert mx-auto'>
                                    <Image src={confirm} alt='confirmar' width={50} height={50} className='invert opacity-30' />
                                </div>
                            </button>
                        }
                        <button onClick={handlePendingForm} className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:rotate-180">
                            <div className='invert mx-auto'>
                                <Image src={cancel} alt='cancelar' width={50} height={50} className='invert opacity-30' />
                            </div>
                        </button>
                    </div>
                </form>
            }

            {!debitForm && !creditForm && !installmentForm && !pendingForm &&
                <>
                    <p className="px-10 mb-3 font-semibold">Adicionar gastos</p>
                    <p className="px-10 mb-5 text-xs">Adicione um novo gasto pelo tipo de pagamento:</p>
                    <div className="w-11/12 flex-nowrap justify-center items-center px-10">
                        <button onClick={handleDebitForm} className="w-[120px] bg-neutral-900 bg-opacity-10 border-dashed border border-white shadow-md hover:scale-105 hover:bg-opacity-20 hover:shadow-md hover:border-solid rounded-full my-2 mr-3 px-5 py-2 duration-300 hover:text-opacity-20">+ débito</button>
                        <button onClick={handleCreditForm} className="w-[200px] bg-neutral-900 bg-opacity-10 border-dashed border border-white shadow-md hover:scale-105 hover:bg-opacity-20 hover:shadow-md hover:border-solid rounded-full my-2 mr-3 px-5 py-2 duration-300 hover:text-opacity-20">+ crédito (comum)</button>
                        <button onClick={handleInstallmentForm} className="w-[250px] bg-neutral-900 bg-opacity-10 border-dashed border border-white shadow-md hover:scale-105 hover:bg-opacity-20 hover:shadow-md hover:border-solid rounded-full my-2 mr-3 px-5 py-2 duration-300 hover:text-opacity-20">+ crédito (parcelamento)</button>
                        <button onClick={handlePendingForm} className="w-[150px] bg-neutral-900 bg-opacity-10 border-dashed border border-white shadow-md hover:scale-105 hover:bg-opacity-20 hover:shadow-md hover:border-solid rounded-full my-2 mr-3 px-5 py-2 duration-300 hover:text-opacity-20">+ pendente</button>
                    </div>
                </>
            }
        </>
    )
}
