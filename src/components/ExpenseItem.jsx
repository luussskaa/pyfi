'use client'

import React, { useState } from 'react'
import Image from "next/image";
import debit from '../../public/debit.png'
import credit from '../../public/credit.png'
import pending from '../../public/pending.png'
import edit from '../../public/edit.png'
import destroy from '../../public/destroy.png'
import pay from '../../public/pay.png'
import blocked from '../../public/blocked.png'
import confirm from '../../public/confirm.png'
import cancel from '../../public/cancel.png'
import Link from 'next/link';

export default function ExpenseItem({ id, paymentId, title, value, details, type, payment, editDebit, deleteDebit, recurrentDebit, editCredit, deleteCredit, editInstallment, deleteInstallment, editPending, deletePending, debitOptions, maxResource, creditOptions, maxCredit }) {

    const useThisValue = parseFloat(value.replace(',', '.'))

    const [options, setOptions] = useState(false)
    const handleOptions = () => {
        setOptions(!options)
    }

    const [remove, setRemove] = useState(false)
    const handleRemove = () => {
        setRemove(!remove)
    }

    const [edit2, setEdit2] = useState(false)
    const handleEdit2 = () => {
        setEdit2(!edit2)
        setName(title)
        setFormValue(useThisValue)
        setDay(details)
        setOption(payment[0])
        setCurrent(details.slice(0, slash))
        setLast(details.slice(slash + 3))
        setRecurrent(recurrentDebit)
        setButton(false)
    }

    const [pay2, setPay2] = useState(false)
    const handlePay2 = () => {
        setPay2(!pay2)
        setOption()
    }

    const allOff = () => {
        setOptions(false)
        setRemove(false)
        setEdit2(false)
        setPay2(false)
    }

    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }

    const [button, setButton] = useState(false)

    const [name, setName] = useState(title)
    const handleName = (e) => {
        setName(e.target.value)
        if (e.target.value !== '') {
            setButton(true)
        } else {
            setButton(false)
        }
    }

    const [formValue, setFormValue] = useState(useThisValue)
    const handleValue = (e) => {
        setFormValue(e.target.value)
        if (parseFloat(e.target.value) <= 0) {
            setButton(false)
        } else if (e.target.value !== '') {
            setButton(true)
        } else {
            setButton(false)
        }
    }

    const [day, setDay] = useState(details)
    const handleDay = (e) => {
        setDay(e.target.value)
        if (parseFloat(e.target.value) <= 0) {
            setButton(false)
        } else if (isFloat(parseFloat(e.target.value))) {
            setButton(false)
        } else if (e.target.value !== '') {
            setButton(true)
        } else {
            setButton(false)
        }
    }

    const [option, setOption] = useState(paymentId)
    const handleOption = (e) => {
        setOption(e.target.value)
        setButton(true)
    }

    const [recurrent, setRecurrent] = useState(recurrentDebit)
    const handleRecurrent = () => {
        setButton(true)
        setRecurrent(!recurrent)
    }

    const slash = details.indexOf(' / ')

    const [current, setCurrent] = useState(details.slice(0, slash)) // parseInt?
    const [last, setLast] = useState(details.slice(slash + 3))
    const handleCurrent = (e) => {
        setCurrent(e.target.value)
        if (parseFloat(e.target.value) <= 0) {
            setButton(false)
        } else if (isFloat(parseFloat(e.target.value))) {
            setButton(false)
        } else if (e.target.value !== '') {
            setButton(true)
        } else {
            setButton(false)
        }
    }
    const handleLast = (e) => {
        setLast(e.target.value)
        if (parseFloat(e.target.value) <= 0) {
            setButton(false)
        } else if (isFloat(parseFloat(e.target.value))) {
            setButton(false)
        } else if (e.target.value !== '') {
            setButton(true)
        } else {
            setButton(false)
        }
    }

    return (
        <>
            {type === 'debit' &&
                <>
                    {!options && !remove && !edit2 &&
                        <div onClick={handleOptions} className="w-11/12 h-24 bg-neutral-200 bg-opacity-10 flex items-center mt-3 cursor-pointer rounded-3xl duration-300 md:hover:scale-105 mx-auto shadow-md">
                            <div className="w-28 flex flex-col justify-center items-center">
                                <Image src={debit} width={40} height={40} alt='pagamento no débito' />
                                <div className="font-semibold">Dia {details}</div>
                            </div>
                            <div className="w-4/6">
                                <div className="font-bold mt-5 mb-2">{title}</div>
                                <div className="text-lg mb-5">R$ {value}</div>
                            </div >
                        </div>
                    }
                    {options && !remove && !edit2 &&
                        <div onClick={handleOptions} onMouseLeave={allOff} className="w-11/12 h-24 bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 border-neutral-500 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-30 md:hover:scale-105 mx-auto shadow-md select-none">
                            <div onClick={handleEdit2}>
                                <Image className='mx-auto' src={edit} width={40} height={40} alt='editar pagamento' />
                                <span className='w-[40px] text-sm text-center'>Editar</span>
                            </div>
                            <div onClick={handleRemove}>
                                <Image className='mx-auto' src={destroy} width={40} height={40} alt='deletar pagamento' />
                                <span className='w-[40px] text-sm text-center'>Excluir</span>
                            </div>
                        </div>
                    }
                    {!options && remove && !edit2 &&
                        <div onClick={handleRemove} onMouseLeave={allOff} className="w-11/12 h-[96px] bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-50 md:hover:scale-105 mx-auto shadow-md select-none">
                            <div className='font-bold'>
                                Excluir?
                            </div>
                            <div onClick={() => deleteDebit(id, paymentId, formValue)} className='duration-300 hover:-translate-y-2'>
                                <Image className='mx-auto' src={confirm} width={40} height={40} alt='confirmar deleção' />
                            </div>
                            <div className='duration-300 hover:-translate-y-2' onClick={handleRemove}>
                                <Image className='mx-auto' src={cancel} width={40} height={40} alt='cancelar deleção' />
                            </div>
                        </div>
                    }
                    {!options && !remove && edit2 &&
                        <div onMouseLeave={allOff} className="w-11/12 bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 border border-neutral-500 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-50 mx-auto shadow-md select-none">
                            <form action={(formData) => {
                                editDebit(id, recurrent, formData, paymentId)
                            }} onSubmit={handleEdit2} className='w-full md:w-4/6 my-10'>
                                <div className='flex flex-col px-10 mb-5'>
                                    <label className='mb-2 text-sm' htmlFor="name">Descrição</label>
                                    <input onChange={handleName} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="text" name="name" id="name" value={name} placeholder='Pagamento no débito' />
                                </div>
                                <div className='flex flex-col px-10 mb-5'>
                                    <label className='mb-2 text-sm' htmlFor="value">Valor</label>
                                    <input onChange={handleValue} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="value" id="value" value={formValue} placeholder='0,00' />
                                </div>
                                {parseFloat(useThisValue) <= maxResource ?
                                    <div className='flex flex-col px-10 mb-5'>
                                        <label className='mb-2 text-sm' htmlFor="option">Forma de pagamento</label>
                                        <select onChange={handleOption} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' name="option" id="option">
                                            <option value={option} hidden>{payment[0]}</option>
                                            {debitOptions.filter(e => e.value >= parseFloat(useThisValue)).filter(e => e.id !== paymentId).map(e =>
                                                <option key={e.id} value={e.id}>{`${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                                            )}
                                        </select>
                                    </div>
                                    : parseFloat(useThisValue) > 0 && parseFloat(useThisValue) > maxResource && <p className="px-10 mb-5">Você não possui recursos disponíveis para este pagamento. <Link href={'/'} className='font-semibold'>Confira seus recursos ↗</Link></p>
                                }
                                <div className='flex flex-col px-10 mb-5'>
                                    <label className='mb-2 text-sm' htmlFor="day">Dia</label>
                                    <input onChange={handleDay} className='w-[50px] h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="day" id="day" value={day} placeholder='3' />
                                </div>
                                <div className='flex flex-col items-start px-10 mb-5'>
                                    <label className='mb-2 text-sm' htmlFor="recurrent">Recorrente?</label>
                                    <div onClick={handleRecurrent} className='w-[32px] h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2 flex justify-center items-center' type="checkbox" name="recurrent" id="recurrent" value={day} placeholder='3'>{recurrent && '✓'}</div>
                                </div>
                                <div className='flex w-full justify-end pr-10'>
                                    {button &&
                                        < button className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:invert">
                                            <div className='invert mx-auto'>
                                                <Image src={confirm} alt='confirmar' width={50} height={50} className='invert opacity-30' />
                                            </div>
                                        </button>
                                    }
                                    <button onClick={handleEdit2} className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:rotate-180">
                                        <div className='invert mx-auto'>
                                            <Image src={cancel} alt='cancelar' width={50} height={50} className='invert opacity-30' />
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div >
                    }
                </>
            }
            {
                type === 'credit' &&
                <>
                    {!options && !remove && !edit2 &&
                        <div onClick={handleOptions} className="w-11/12 h-24 bg-neutral-200 bg-opacity-10 flex items-center mt-3 cursor-pointer rounded-3xl duration-300 md:hover:scale-105 mx-auto shadow-md">
                            <div className="w-28 flex flex-col justify-center items-center">
                                <Image src={credit} width={40} height={40} alt='pagamento no crédito' />
                                <div className="font-semibold">Dia {details}</div>
                            </div>
                            <div className="w-4/6">
                                <div className="font-bold mt-5 mb-2">{title}</div>
                                <div className="text-lg mb-5">R$ {value}</div>
                            </div>
                        </div>
                    }
                    {options && !remove && !edit2 &&
                        <div onClick={handleOptions} onMouseLeave={allOff} className="w-11/12 h-24 bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-30 md:hover:scale-105 mx-auto shadow-md select-none">
                            <div onClick={handleEdit2}>
                                <Image className='mx-auto' src={edit} width={40} height={40} alt='editar pagamento' />
                                <span className='w-[40px] text-sm text-center'>Editar</span>
                            </div>
                            <div onClick={handleRemove}>
                                <Image className='mx-auto' src={destroy} width={40} height={40} alt='deletar pagamento' />
                                <span className='w-[40px] text-sm text-center'>Excluir</span>
                            </div>
                        </div>
                    }
                    {!options && remove && !edit2 &&
                        <div onClick={handleRemove} onMouseLeave={allOff} className="w-11/12 h-[96px] bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-50 md:hover:scale-105 mx-auto shadow-md select-none">
                            <div className='font-bold'>
                                Excluir?
                            </div>
                            <div onClick={() => deleteCredit(id, paymentId, formValue)} className='duration-300 hover:-translate-y-2'>
                                <Image className='mx-auto' src={confirm} width={40} height={40} alt='confirmar deleção' />
                            </div>
                            <div className='duration-300 hover:-translate-y-2' onClick={handleRemove}>
                                <Image className='mx-auto' src={cancel} width={40} height={40} alt='cancelar deleção' />
                            </div>
                        </div>
                    }
                    {!options && !remove && edit2 &&
                        <div onMouseLeave={allOff} className="w-11/12 bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 border border-neutral-500 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-50 mx-auto shadow-md select-none">
                            <form action={(formData) => {
                                editCredit(id, formData, paymentId)
                            }} onSubmit={handleEdit2} className='w-full md:w-4/6 my-10'>
                                <div className='flex flex-col px-10 mb-5'>
                                    <label className='mb-2 text-sm' htmlFor="name">Descrição</label>
                                    <input onChange={handleName} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="text" name="name" id="name" value={name} placeholder='Pagamento no crédito' />
                                </div>
                                <div className='flex flex-col px-10 mb-5'>
                                    <label className='mb-2 text-sm' htmlFor="value">Valor</label>
                                    <input onChange={handleValue} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="value" id="value" value={formValue} placeholder='0,00' />
                                </div>
                                {parseFloat(useThisValue) <= maxCredit ?
                                    <div className='flex flex-col px-10 mb-5'>
                                        <label className='mb-2 text-sm' htmlFor="option">Forma de pagamento</label>
                                        <select onChange={handleOption} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' name="option" id="option" value={option}>
                                            <option value={option} hidden>{payment[0]}</option>
                                            {creditOptions.filter(e => e.value >= parseFloat(useThisValue)).filter(e => e.id !== paymentId).map(e =>
                                                <option key={e.id} value={e.id}>{`${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                                            )}
                                        </select>
                                    </div>
                                    : parseFloat(useThisValue) > 0 && parseFloat(useThisValue) > maxCredit && <p className="px-10 mb-5">Você não possui opções de crédito disponíveis para este pagamento. <Link href={'/credito'} className='font-semibold'>Confira suas opções de crédito ↗</Link></p>
                                }
                                <div className='flex flex-col px-10 mb-5'>
                                    <label className='mb-2 text-sm' htmlFor="day">Dia</label>
                                    <input onChange={handleDay} className='w-[50px] h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="day" id="day" value={day} placeholder='3' />
                                </div>
                                <div className='flex w-full justify-end pr-10'>
                                    {button &&
                                        <button className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:invert">
                                            <div className='invert mx-auto'>
                                                <Image src={confirm} alt='confirmar' width={50} height={50} className='invert opacity-30' />
                                            </div>
                                        </button>
                                    }
                                    <button onClick={handleEdit2} className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:rotate-180">
                                        <div className='invert mx-auto'>
                                            <Image src={cancel} alt='cancelar' width={50} height={50} className='invert opacity-30' />
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                </>
            }

            {
                type === 'installment' &&
                <>
                    {!options && !remove && !edit2 &&
                        <div onClick={handleOptions} onMouseLeave={allOff} className="w-11/12 h-24 bg-neutral-200 bg-opacity-10 flex items-center mt-3 cursor-pointer rounded-3xl duration-300 md:hover:scale-105 mx-auto shadow-md">
                            <div className="w-28 flex flex-col justify-center items-center">
                                <Image src={credit} width={40} height={40} alt='parcelamento' />
                                <div className="font-semibold">{details}</div>
                            </div>
                            <div className="w-4/6">
                                <div className="font-bold mt-5 mb-2">{title}</div>
                                <div className="text-lg mb-5">R$ {value}</div>
                            </div>
                        </div>
                    }
                    {options && !remove && !edit2 &&
                        <div onClick={handleOptions} onMouseLeave={allOff} className="w-11/12 h-24 bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-30 md:hover:scale-105 mx-auto shadow-md select-none">
                            <div onClick={handleEdit2}>
                                <Image className='mx-auto' src={edit} width={40} height={40} alt='editar parcelamento' />
                                <span className='w-[40px] text-sm text-center'>Editar</span>
                            </div>
                            <div onClick={handleRemove}>
                                <Image className='mx-auto' src={destroy} width={40} height={40} alt='deletar parcelamento' />
                                <span className='w-[40px] text-sm text-center'>Excluir</span>
                            </div>
                        </div>
                    }
                    {!options && remove && !edit2 &&
                        <div onClick={handleRemove} onMouseLeave={allOff} className="w-11/12 h-[96px] bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-50 md:hover:scale-105 mx-auto shadow-md select-none">
                            <div className='font-bold'>
                                Excluir?
                            </div>
                            <div onClick={() => deleteInstallment(id, paymentId, formValue, last)} className='duration-300 hover:-translate-y-2'>
                                <Image className='mx-auto' src={confirm} width={40} height={40} alt='confirmar deleção' />
                            </div>
                            <div className='duration-300 hover:-translate-y-2' onClick={handleRemove}>
                                <Image className='mx-auto' src={cancel} width={40} height={40} alt='cancelar deleção' />
                            </div>
                        </div>
                    }
                    {!options && !remove && edit2 &&
                        <div onMouseLeave={allOff} className="w-11/12 bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 border border-neutral-500 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-50 mx-auto shadow-md select-none">
                            <form action={(formData) => {
                                editInstallment(id, formData, paymentId)
                            }} onSubmit={handleEdit2} className='w-full md:w-4/6 my-10'>
                                <div className='flex flex-col px-10 mb-5'>
                                    <label className='mb-2 text-sm' htmlFor="name">Descrição</label>
                                    <input onChange={handleName} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="text" name="name" id="name" value={name} placeholder='Parcelamento' />
                                </div>
                                <div className='flex flex-col px-10 mb-5'>
                                    <label className='mb-2 text-sm' htmlFor="value">Valor da parcela</label>
                                    <input onChange={handleValue} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="value" id="value" value={formValue} placeholder='0,00' />
                                </div>
                                <div className='flex flex-col px-10 mb-5'>
                                    <label className='mb-2 text-sm'>Parcela atual / última</label>
                                    <div className='flex'>
                                        <input onChange={handleCurrent} className='w-[50px] h-8 mr-2 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="current" id="current" value={current} placeholder='1' />
                                        <input onChange={handleLast} className='w-[50px] h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="last" id="last" value={last} placeholder='12' />
                                    </div>
                                </div>
                                {parseFloat(useThisValue) > 0 && parseFloat(useThisValue) * parseFloat(last) <= maxCredit ?
                                    <div className='flex flex-col px-10 mb-5'>
                                        <label className='mb-2 text-sm' htmlFor="option">Forma de pagamento</label>
                                        <select onChange={handleOption} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' name="option" id="option" value={option}>
                                            <option value={option} hidden>{payment[0]}</option>
                                            {creditOptions.filter(e => parseFloat(e.value) >= parseFloat(useThisValue) * parseFloat(last)).filter(e => e.id !== paymentId).map(e =>
                                                <option key={e.id} value={e.id}>{`${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                                            )}
                                        </select>
                                    </div>
                                    : parseFloat(useThisValue) > 0 && parseFloat(useThisValue) * parseFloat(last) ? <p className="px-10 mb-5">Você não possui opções de crédito disponíveis para este parcelamento. <Link href={'/credito'} className='font-semibold'>Confira suas opções de crédito ↗</Link></p>
                                        : null
                                }
                                <div className='flex w-full justify-end pr-10'>
                                    {button && current <= last &&
                                        <button className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:invert">
                                            <div className='invert mx-auto'>
                                                <Image src={confirm} alt='confirmar' width={50} height={50} className='invert opacity-30' />
                                            </div>
                                        </button>
                                    }
                                    <button onClick={handleEdit2} className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:rotate-180">
                                        <div className='invert mx-auto'>
                                            <Image src={cancel} alt='cancelar' width={50} height={50} className='invert opacity-30' />
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                </>
            }

            {
                type === 'pending' &&
                <>
                    {!options && !remove && !edit2 && !pay2 &&
                        <div onClick={handleOptions} onMouseLeave={allOff} className="w-11/12 h-24 bg-neutral-200 bg-opacity-10 flex items-center mt-3 cursor-pointer rounded-3xl duration-300 md:hover:scale-105 mx-auto shadow-md">
                            <div className="w-28 flex flex-col justify-center items-center">
                                <Image src={pending} width={40} height={40} alt='pagamento pendente' />
                                <div className="font-semibold">Dia {details}</div>
                            </div>
                            <div className="w-4/6">
                                <div className="font-bold mt-5 mb-2">{title}</div>
                                <div className="text-lg mb-5">R$ {value}</div>
                            </div>
                        </div>
                    }
                    {options && !remove && !edit2 && !pay2 &&
                        <div onClick={handleOptions} onMouseLeave={allOff} className="w-11/12 h-24 bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-30 md:hover:scale-105 mx-auto shadow-md select-none">
                            <div onClick={handleEdit2}>
                                <Image className='mx-auto' src={edit} width={40} height={40} alt='editar pagamento' />
                                <span className='w-[40px] text-sm text-center'>Editar</span>
                            </div>
                            {parseFloat(useThisValue) <= maxResource ?
                                <div onClick={handlePay2}>
                                    <Image className='mx-auto' src={pay} width={40} height={40} alt='sinalizar pagamento' />
                                    <span className='w-[40px] text-sm text-center'>Pagar</span>
                                </div>
                                :
                                <div>
                                    <Image className='mx-auto' src={blocked} width={40} height={40} alt='não é possível sinalizar pagamento' />
                                    <span className='w-[40px] text-sm text-center'>Pagar</span>
                                </div>
                            }
                            <div onClick={handleRemove}>
                                <Image className='mx-auto' src={destroy} width={40} height={40} alt='deletar pagamento pendente' />
                                <span className='w-[40px] text-sm text-center'>Excluir</span>
                            </div>
                        </div>
                    }
                    {!options && remove && !edit2 && !pay2 &&
                        <div onClick={handleRemove} onMouseLeave={allOff} className="w-11/12 h-[96px] bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-50 md:hover:scale-105 mx-auto shadow-md select-none">
                            <div className='font-bold'>
                                Excluir?
                            </div>
                            <div onClick={() => deletePending(id)} className='duration-300 hover:-translate-y-2'>
                                <Image className='mx-auto' src={confirm} width={40} height={40} alt='confirmar deleção' />
                            </div>
                            <div className='duration-300 hover:-translate-y-2' onClick={handleRemove}>
                                <Image className='mx-auto' src={cancel} width={40} height={40} alt='cancelar deleção' />
                            </div>
                        </div>
                    }
                    {!options && !remove && !edit2 && pay2 &&
                        <div className="w-11/12 h-24 bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 border border-neutral-500 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-50 md:hover:scale-105 mx-auto shadow-md select-none">
                            {/* {parseFloat(useThisValue) <= maxResource ?
                                <div className='flex flex-col px-10 my-5'>
                                    <label className='mb-2 text-sm' htmlFor="option">Forma de pagamento</label>
                                    <select onChange={handleOption} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' name="option" id="option" value={option}>
                                        <option defaultValue={'Selecione...'} hidden>Selecione...</option>
                                        {debitOptions.filter(e => e.value >= parseFloat(useThisValue)).map(e =>
                                            <option value={e.id}>{`${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                                        )}
                                    </select>
                                </div>
                                : parseFloat(useThisValue) > 0 && parseFloat(useThisValue) > maxResource && <p className="px-10 text-sm my-5">Você não possui recursos disponíveis para este pagamento.</p>
                            } */}
                            <div className='flex flex-col px-10 my-5'>
                                <label className='mb-2 text-sm' htmlFor="option">Forma de pagamento</label>
                                <select onChange={handleOption} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' name="option" id="option" value={option}>
                                    <option defaultValue={'Selecione...'} hidden>Selecione...</option>
                                    {debitOptions.filter(e => e.value >= parseFloat(useThisValue)).map(e =>
                                        <option key={e.id} value={e.id}>{`${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                                    )}
                                </select>
                            </div>
                            <div className='flex w-full justify-end pr-10'>
                                {button && parseFloat(useThisValue) <= maxResource &&
                                    <button className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:invert">
                                        <div className='invert mx-auto'>
                                            <Image src={confirm} alt='confirmar' width={50} height={50} className='invert opacity-30' />
                                        </div>
                                    </button>
                                }
                                <button onClick={handlePay2} className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:rotate-180">
                                    <div className='invert mx-auto'>
                                        <Image src={cancel} alt='cancelar' width={50} height={50} className='invert opacity-30' />
                                    </div>
                                </button>
                            </div>
                        </div>
                    }
                    {!options && !remove && edit2 && !pay2 &&
                        <div onMouseLeave={allOff} className="w-11/12 bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 border border-neutral-500 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-50 mx-auto shadow-md select-none">
                            <form action={(formData) => {
                                editPending(id, formData)
                            }} onSubmit={handleEdit2} className='w-full md:w-4/6 my-10'>
                                <div className='flex flex-col px-10 mb-5'>
                                    <label className='mb-2 text-sm' htmlFor="name">Descrição</label>
                                    <input onChange={handleName} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="text" name="name" id="name" value={name} />
                                </div>
                                <div className='flex flex-col px-10 mb-5'>
                                    <label className='mb-2 text-sm' htmlFor="value">Valor</label>
                                    <input onChange={handleValue} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="value" id="value" value={formValue} />
                                </div>
                                <div className='flex flex-col px-10 mb-5'>
                                    <label className='mb-2 text-sm' htmlFor="day">Dia</label>
                                    <input onChange={handleDay} className='w-[50px] h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="day" id="day" value={day} />
                                </div>
                                <div className='flex w-full justify-end pr-10'>
                                    {button &&
                                        <button className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:invert">
                                            <div className='invert mx-auto'>
                                                <Image src={confirm} alt='confirmar' width={50} height={50} className='invert opacity-30' />
                                            </div>
                                        </button>
                                    }
                                    <button onClick={handleEdit2} className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:rotate-180">
                                        <div className='invert mx-auto'>
                                            <Image src={cancel} alt='cancelar' width={50} height={50} className='invert opacity-30' />
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                </>
            }
            {
                type === 'invoice' &&
                <div className="w-11/12 bg-neutral-900 bg-opacity-20 flex items-center mt-3 border border-neutral-500 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-50 md:hover:scale-105 mx-auto shadow-md">
                    <div className="w-28 flex flex-col justify-center items-center">
                        <Image src={pending} width={40} height={40} />
                        <div className="font-semibold">Dia {details}</div>
                    </div>
                    <div className="w-4/6">
                        <div className="font-bold mt-5 mb-2">{title}</div>
                        <div className="text-lg mb-5">R$ {value}</div>
                    </div>
                </div>
            }
        </>
    )
}
