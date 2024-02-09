'use client'

import React, { useState } from 'react'

import confirm from '../../public/confirm.png'
import cancel from '../../public/cancel.png'
import Image from 'next/image'
import Link from 'next/link'

export default function ResourceCreator({ resource, resources }) {

    const totalResources = resources.length !== 0 ? resources.map(e => e.value).reduce((a, b) => a + b).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'

    const resourcesQty = resources.length

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

    const [resourceForm, setResourceForm] = useState(false)
    const handleResourceForm = () => {
        setResourceForm(!resourceForm)
        if (!resourceForm) {
            setName()
            setValue()
        }
    }

    return (
        <>
            {resourceForm &&
                <form action={(formData) => {
                    resource(formData)
                }} onSubmit={handleResourceForm} className='w-full md:w-4/6 mb-5'>
                    <p className="px-10 mb-2 text-lg font-semibold">Novo recurso</p>
                    <p className="px-10  text-sm my-5">Recursos são utilizados para pagamentos no débito.</p>
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
                        <button onClick={handleResourceForm} className="w-[50px] bg-neutral-900 bg-opacity-20 border-dashed border border-neutral-500 shadow-md hover:scale-105 hover:bg-opacity-50 hover:shadow-md hover:border-solid rounded-full m-2 p-2 duration-300 hover:text-opacity-20 hover:rotate-180">
                            <div className='invert mx-auto'>
                                <Image src={cancel} alt='cancelar' width={50} height={50} className='invert opacity-30' />
                            </div>
                        </button>
                    </div>
                </form>
            }

            {!resourceForm &&
                <>
                    {resources.length !== 0 ?
                        <>
                            <p className="px-10 mb-3 text-xl font-semibold">Recursos</p>
                            <p className="px-10 mb-5 text-sm">Aqui você pode acompanhar o uso do seu dinheiro.</p>

                            <div className="w-11/12 flex-nowrap justify-center items-center px-10">
                                <button onClick={handleResourceForm} className="w-[120px] bg-neutral-900 bg-opacity-10 border-dashed border border-white shadow-md hover:scale-105 hover:bg-opacity-20 hover:shadow-md hover:border-solid rounded-full my-2 mr-3 px-5 py-2 duration-300 hover:text-opacity-20">+ recurso</button>
                            </div>

                            <div className="w-full mt-10 mb-5 px-10 flex justify-between items-center">
                                <div className="text-lg font-semibold">Total</div>
                                <div className="w-full flex flex-col justify-center items-end">
                                    <span>R$ {totalResources}</span>
                                    {resourcesQty > 1 ?
                                        <span className="text-xs">em {resourcesQty} recursos</span>
                                        :
                                        <span className="text-xs">em um recurso</span>
                                    }
                                </div>
                            </div>

                            <p className="px-10 mb-5 text-xs">Clique em um item para mais opções.</p>
                        </>
                        :
                        <>
                            <p className="px-10 mb-3 font-semibold">Você não possui recursos</p>
                            <p className="px-10 mb-5 text-sm">Recursos representam o dinheiro que você pretende utilizar e são necessários para adicionar gastos pagos no débito e para quitar pagamentos pendentes.</p>

                            <div className="w-11/12 flex-nowrap justify-center items-center px-10">
                                <button onClick={handleResourceForm} className="w-[120px] bg-neutral-900 bg-opacity-10 border-dashed border border-white shadow-md hover:scale-105 hover:bg-opacity-20 hover:shadow-md hover:border-solid rounded-full my-2 mr-3 px-5 py-2 duration-300 hover:text-opacity-20">+ recurso</button>
                            </div>
                        </>
                    }
                </>
            }
        </>
    )
}
