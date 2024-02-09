'use client'

import React, { useState } from 'react'
import Image from "next/image";

import cartao from '../../public/cartao.png'
import invoice from '../../public/invoice.png'
import edit from '../../public/edit.png'
import destroy from '../../public/destroy.png'
import confirm from '../../public/confirm.png'
import cancel from '../../public/cancel.png'
import ExpenseSubItem from './ExpenseSubItem';

export default function ResourceItem({ id, title, value, total, details, expenses, totalExpenses, editCredit, deleteCredit }) {

    const useThisValue = parseFloat(total)

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
        setClose(details.slice(0, slash))
        setExpire(details.slice(slash + 3))
        setButton(false)
    }

    const [extract, setExtract] = useState(false)
    const handleExtract = () => {
        setExtract(!extract)
        setName(title)
        setFormValue(useThisValue)
        setButton(false)
    }

    const allOff = () => {
        setOptions(false)
        setRemove(false)
        setEdit2(false)
        setExtract(false)
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

    const slash = details.indexOf(' / ')

    const [close, setClose] = useState(parseInt(details.slice(0, slash)))
    const [expire, setExpire] = useState(parseInt(details.slice(slash + 3)))
    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }
    const handleClose = (e) => {
        setClose(e.target.value)
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
    const handleExpire = (e) => {
        setExpire(e.target.value)
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
            {!options && !remove && !edit2 && !extract &&
                <div onClick={handleOptions} className="w-11/12 h-24 bg-neutral-200 bg-opacity-10 flex items-center mt-3 cursor-pointer rounded-3xl duration-300 md:hover:scale-105 mx-auto shadow-md">
                    <div className="w-28 flex flex-col justify-center items-center">
                        {expenses.length !== 0 &&
                            <span className="inline-block font-semibold">{expenses.length}X</span>
                        }
                        <Image src={cartao} width={40} height={40} alt='recurso' />
                    </div>
                    <div className="w-4/6">
                        <div className="font-bold mb-2 mt-5">{title}</div>
                        <div className="text-lg mb-5">R$ {(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                </div >
            }
            {options && !remove && !edit2 && !extract &&
                <div onClick={handleOptions} onMouseLeave={allOff} className="w-11/12 h-24 bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-30 md:hover:scale-105 mx-auto shadow-md select-none">
                    <div onClick={handleEdit2}>
                        <Image className='mx-auto' src={edit} width={40} height={40} alt='editar pagamento' />
                        <span className='w-[40px] text-sm text-center'>Editar</span>
                    </div>
                    {expenses.length !== 0 &&
                        <div onClick={handleExtract}>
                            <Image className='mx-auto' src={invoice} width={40} height={40} alt='editar pagamento' />
                            <span className='w-[40px] text-sm text-center'>Extrato</span>
                        </div>
                    }
                    <div onClick={handleRemove}>
                        <Image className='mx-auto' src={destroy} width={40} height={40} alt='deletar pagamento' />
                        <span className='w-[40px] text-sm text-center'>Excluir</span>
                    </div>
                </div>
            }
            {!options && remove && !edit2 && !extract &&
                <div onClick={handleRemove} onMouseLeave={allOff} className="w-11/12 h-[96px] bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-50 md:hover:scale-105 mx-auto shadow-md select-none">
                    <div className='font-bold'>
                        Excluir?
                    </div>
                    <div onClick={() => deleteCredit(id)} className='duration-300 hover:-translate-y-2'>
                        <Image className='mx-auto' src={confirm} width={40} height={40} alt='confirmar deleção' />
                    </div>
                    <div className='duration-300 hover:-translate-y-2' onClick={handleRemove}>
                        <Image className='mx-auto' src={cancel} width={40} height={40} alt='cancelar deleção' />
                    </div>
                </div>
            }
            {!options && !remove && edit2 && !extract &&
                <div onMouseLeave={allOff} className="w-11/12 bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 border border-neutral-500 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-50 mx-auto shadow-md select-none">
                    <form action={(formData) => {
                        editCredit(id, formData)
                    }} onSubmit={handleEdit2} className='w-full md:w-4/6 my-10'>
                        <div className='flex flex-col px-10 mb-5'>
                            <label className='mb-2 text-sm' htmlFor="name">Apelido do cartão</label>
                            <input onChange={handleName} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="text" name="name" id="name" value={name} placeholder='Pagamento no débito' />
                        </div>
                        <div className='flex flex-col px-10 mb-5'>
                            <label className='mb-2 text-sm' htmlFor="value">Limite total</label>
                            <input onChange={handleValue} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="value" id="value" value={formValue} placeholder='0,00' />
                        </div>
                        <div className='flex flex-col px-10 mb-5'>
                            <label className='mb-2 text-sm'>Fecha em / Vence em</label>
                            <div className='flex'>
                                <input onChange={handleClose} className='w-[50px] h-8 mr-2 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="close" id="close" value={close} placeholder='1' />
                                <input onChange={handleExpire} className='w-[50px] h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="expire" id="expire" value={expire} placeholder='12' />
                            </div>
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
            {!options && !remove && !edit2 && extract &&
                <>
                    <div className="w-11/12 bg-neutral-900 bg-opacity-20 flex flex-col justify-center items-start px-10 mt-3 cursor-pointer rounded-3xl duration-300 mx-auto shadow-md">
                        <div className="w-full flex justify-center items-center">
                            <div className='w-10/12'>
                                <div className="font-bold mb-2 mt-5">{title}</div>
                                <div className="text-lg mb-1">R$ {(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                <div className="text mb-5">de R$ {(value + totalExpenses).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                <div className="text mb-5">( - R$ {(totalExpenses).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</div>
                            </div>
                            <button onClick={handleExtract} className="w-[50px] h-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:rotate-180">
                                <div className='invert mx-auto'>
                                    <Image src={cancel} alt='cancelar' width={50} height={50} className='invert opacity-30' />
                                </div>
                            </button>
                        </div>
                        {expenses.reverse().map(e =>
                            <ExpenseSubItem key={e.id} title={e.name} value={e.value} type={e.type} details={e.details} />
                        )}

                    </div>
                </>
            }
        </>
    )
}
