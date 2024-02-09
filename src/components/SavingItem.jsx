'use client'

import React, { useState } from 'react'
import Image from "next/image";

import poupanca from '../../public/poupanca.png'
import edit from '../../public/edit.png'
import withdraw from '../../public/withdraw.png'
import destroy from '../../public/destroy.png'
import confirm from '../../public/confirm.png'
import cancel from '../../public/cancel.png'

export default function SavingItem({ id, title, value, resourceOptions, editSaving, deleteSaving, withdrawSaving }) {

    const useThisValue = parseFloat(value)

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
        setButton(false)
    }

    const [withdraw2, setWithdraw] = useState(false)
    const handleWithdraw = () => {
        setWithdraw(!withdraw2)
        setName(title)
        setFormValue(useThisValue)
        setButton(false)
    }

    const allOff = () => {
        setOptions(false)
        setRemove(false)
        setEdit2(false)
        setWithdraw(false)
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

    const [option, setOption] = useState()
    const [buttonOption, setButtonOption] = useState()
    const handleOption = (e) => {
        setButtonOption(e.target.value)
        setButton(true)
    }

    return (
        <>
            {!options && !remove && !edit2 && !withdraw2 &&
                <div onClick={handleOptions} className="w-11/12 h-24 bg-neutral-200 bg-opacity-10 flex items-center mt-3 cursor-pointer rounded-3xl duration-300 md:hover:scale-105 mx-auto shadow-md">
                    <div className="w-28 flex justify-center items-center">
                        <Image src={poupanca} width={40} height={40} alt='poupança' />
                    </div>
                    <div className="w-4/6">
                        <div className="font-bold mt-5 mb-2">{title}</div>
                        <div className="text-lg mb-5">R$ {value}</div>
                    </div>
                </div >
            }
            {options && !remove && !edit2 && !withdraw2 &&
                <div onClick={handleOptions} onMouseLeave={allOff} className="w-11/12 h-24 bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-30 md:hover:scale-105 mx-auto shadow-md select-none">
                    <div onClick={handleEdit2}>
                        <Image className='mx-auto' src={edit} width={40} height={40} alt='editar pagamento' />
                        <span className='w-[40px] text-sm text-center'>Editar</span>
                    </div>
                    <div onClick={handleWithdraw}>
                        <Image className='mx-auto' src={withdraw} width={40} height={40} alt='editar pagamento' />
                        <span className='w-[40px] text-sm text-center'>Sacar</span>
                    </div>
                    <div onClick={handleRemove}>
                        <Image className='mx-auto' src={destroy} width={40} height={40} alt='deletar pagamento' />
                        <span className='w-[40px] text-sm text-center'>Excluir</span>
                    </div>
                </div>
            }
            {!options && remove && !edit2 && !withdraw2 &&
                <div onClick={handleRemove} onMouseLeave={allOff} className="w-11/12 h-[96px] bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-50 md:hover:scale-105 mx-auto shadow-md select-none">
                    <div className='font-bold'>
                        Excluir?
                    </div>
                    <div onClick={() => deleteSaving(id)} className='duration-300 hover:-translate-y-2'>
                        <Image className='mx-auto' src={confirm} width={40} height={40} alt='confirmar deleção' />
                    </div>
                    <div className='duration-300 hover:-translate-y-2' onClick={handleRemove}>
                        <Image className='mx-auto' src={cancel} width={40} height={40} alt='cancelar deleção' />
                    </div>
                </div>
            }
            {!options && !remove && edit2 && !withdraw2 &&
                <div onMouseLeave={allOff} className="w-11/12 bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 border border-neutral-500 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-50 mx-auto shadow-md select-none">
                    <form action={(formData) => {
                        editSaving(id, formData)
                    }} onSubmit={handleEdit2} className='w-full md:w-4/6 my-10'>
                        <div className='flex flex-col px-10 mb-5'>
                            <label className='mb-2 text-sm' htmlFor="name">Descrição</label>
                            <input onChange={handleName} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="text" name="name" id="name" value={name} placeholder='Pagamento no débito' />
                        </div>
                        <div className='flex flex-col px-10 mb-5'>
                            <label className='mb-2 text-sm' htmlFor="value">Valor</label>
                            <input onChange={handleValue} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="value" id="value" value={formValue} placeholder='0,00' />
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
            {!options && !remove && !edit2 && withdraw2 &&
                <form action={(formData) => {
                    withdrawSaving(id, formData)
                }} onSubmit={handleWithdraw} className="w-11/12 bg-neutral-900 bg-opacity-20 flex justify-evenly items-center mt-3 border border-neutral-500 cursor-pointer rounded-3xl duration-300 hover:bg-opacity-50 md:hover:scale-105 mx-auto shadow-md select-none">
                    <div className='flex flex-col px-10 my-5'>
                        <div className='flex flex-col mb-5'>
                            <label className='mb-2 text-sm' htmlFor="value">Valor a sacar</label>
                            <input onChange={handleValue} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' type="number" name="value" id="value" value={formValue} placeholder='0,00' />
                        </div>
                        <label className='mb-2 text-sm' htmlFor="option">Forma de pagamento</label>
                        <select onChange={handleOption} className='h-8 bg-white bg-opacity-20 rounded-md shadow-inner shadow-neutral-900 px-2' name="option" id="option" value={option}>
                            <option defaultValue={'Selecione...'} hidden>Selecione...</option>
                            {resourceOptions.filter(e => e.value >= parseFloat(useThisValue)).map(e =>
                                <option key={e.id} value={e.id}>{`${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                            )}
                        </select>
                    </div>
                    <div className='flex w-full justify-end pr-10'>
                        {button && buttonOption && formValue <= useThisValue &&
                            <button className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:invert">
                                <div className='invert mx-auto'>
                                    <Image src={confirm} alt='confirmar' width={50} height={50} className='invert opacity-30' />
                                </div>
                            </button>
                        }
                        <button onClick={handleWithdraw} className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:rotate-180">
                            <div className='invert mx-auto'>
                                <Image src={cancel} alt='cancelar' width={50} height={50} className='invert opacity-30' />
                            </div>
                        </button>
                    </div>
                </form>
            }
        </>
    )
}