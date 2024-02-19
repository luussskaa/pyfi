'use client'

import React, { useState } from 'react'
import Image from "next/image";
import debit from '../../public/debit.png'
import credit from '../../public/credit.png'
import pending from '../../public/pending.png'
import Link from 'next/link';
import OptionsCard from './forItems/OptionsCard';
import RemoveCard from './forItems/RemoveCard';
import ExpenseCard from './forItems/ExpenseCard';
import Inputs from './forForms/Inputs';
import RecurrencyCheckBox from './forForms/RecurrencyCheckBox';
import ConfirmButton from './forForms/ConfirmButton';
import CancelButton from './forForms/CancelButton';
import DoubleInput from './forForms/DoubleInput';

export default function ExpenseItem({ id, paymentId, title, value, detailsA, detailsB, type, payment, editDebit, deleteDebit, recurrentDebit, editCredit, deleteCredit, editInstallment, deleteInstallment, editPending, deletePending, debitOptions, maxResource, creditOptions, maxCredit }) {

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
        setDay(detailsA)
        setOption(payment[0])
        setCurrent(detailsA)
        setLast(detailsB)
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

    const [day, setDay] = useState(detailsA)
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

    const [current, setCurrent] = useState(detailsA)
    const [last, setLast] = useState(detailsB)
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

    console.log(option)

    return (
        <>
            {type === 'debit' &&
                <>
                    {!options && !remove && !edit2 &&
                        <ExpenseCard handleOptions={handleOptions} title={title} value={value} detailsA={detailsA} icon={debit} alt={'pagamento no débito'} />
                    }
                    {options && !remove && !edit2 &&
                        <OptionsCard allOff={allOff} handleOptions={handleOptions} handleEdit2={handleEdit2} handleRemove={handleRemove} />
                    }
                    {!options && remove && !edit2 &&
                        <RemoveCard allOff={allOff} handleRemove={handleRemove} destroy={deleteDebit} id={id} paymentId={paymentId} formValue={formValue} type={'expense'} />
                    }
                    {!options && !remove && edit2 &&
                        <div onMouseLeave={allOff} className='editFormContainer'>
                            <form action={(formData) => {
                                editDebit(id, recurrent, formData, paymentId)
                            }} onSubmit={handleEdit2} className='w-full md:w-4/6 my-10'>

                                <Inputs type={'text'} title={'Descrição'} handleFunc={handleName} name={'name'} value={name} />

                                <Inputs type={'number'} title={'Valor'} handleFunc={handleValue} name={'value'} value={formValue} />

                                {parseFloat(formValue) <= maxResource ?
                                    <div className='container'>
                                        <label htmlFor="option">Forma de pagamento</label>
                                        <select onChange={handleOption} name="option" id="option">
                                            <option value='Selecione...' hidden>Selecione...</option>
                                            {debitOptions.filter(e => e.value >= parseFloat(formValue)).map(e =>
                                                <option key={e.id} value={e.id}>{`${e.id === paymentId ? `★ ${e.name}` : `${e.name}`}  - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                                            )}
                                        </select>
                                    </div>
                                    : parseFloat(formValue) > 0 && parseFloat(formValue) > maxResource && <p className="px-10 mb-5">Você não possui recursos disponíveis para este pagamento. <Link href={'/'} className='font-semibold'>Confira seus recursos ↗</Link></p>
                                }

                                <Inputs type={'number'} title={'Dia'} handleFunc={handleDay} name={'day'} value={day} />

                                <RecurrencyCheckBox title={'Recorrente?'} handleRecurrent={handleRecurrent} recurrent={recurrent} />

                                <div className='formButtonContainer'>
                                    {button && parseFloat(formValue) <= maxResource &&
                                        <ConfirmButton />
                                    }
                                    <CancelButton handleCancel={handleEdit2} />
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
                        <ExpenseCard handleOptions={handleOptions} title={title} value={value} detailsA={detailsA} icon={credit} alt={'pagamento no crédito'} />
                    }
                    {options && !remove && !edit2 &&
                        <OptionsCard allOff={allOff} handleOptions={handleOptions} handleEdit2={handleEdit2} handleRemove={handleRemove} />
                    }
                    {!options && remove && !edit2 &&
                        <RemoveCard allOff={allOff} handleRemove={handleRemove} destroy={deleteCredit} id={id} paymentId={paymentId} formValue={formValue} type={'expense'} />
                    }
                    {!options && !remove && edit2 &&
                        <div onMouseLeave={allOff} className='editFormContainer'>
                            <form action={(formData) => {
                                editCredit(id, formData, paymentId)
                            }} onSubmit={handleEdit2} className='w-full md:w-4/6 my-10'>

                                <Inputs type={'text'} title={'Descrição'} handleFunc={handleName} name={'name'} value={name} />

                                <Inputs type={'number'} title={'Valor'} handleFunc={handleValue} name={'value'} value={formValue} />

                                {parseFloat(formValue) <= maxCredit ?
                                    <div className='container'>
                                        <label htmlFor="option">Forma de pagamento</label>
                                        <select onChange={handleOption} name="option" id="option" value={option}>
                                            <option value={paymentId}>{payment[0]}</option>
                                            {creditOptions.filter(e => e.value >= parseFloat(formValue)).filter(e => e.id !== paymentId).map(e =>
                                                <option key={e.id} value={e.id}>{`${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                                            )}
                                        </select>
                                    </div>
                                    : parseFloat(formValue) > 0 && parseFloat(formValue) > maxCredit && <p className="px-10 mb-5">Você não possui opções de crédito disponíveis para este pagamento. <Link href={'/credito'} className='font-semibold'>Confira suas opções de crédito ↗</Link></p>
                                }

                                <Inputs type={'number'} title={'Dia'} handleFunc={handleDay} name={'day'} value={day} />

                                <div className='formButtonContainer'>
                                    {button && parseFloat(formValue) <= maxCredit &&
                                        <ConfirmButton />
                                    }
                                    <CancelButton handleCancel={handleEdit2} />
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
                        <ExpenseCard handleOptions={handleOptions} title={title} value={value} detailsA={detailsA} detailsB={detailsB} icon={credit} alt={'parcelamento'} />
                    }
                    {options && !remove && !edit2 &&
                        <OptionsCard allOff={allOff} handleOptions={handleOptions} handleEdit2={handleEdit2} handleRemove={handleRemove} />
                    }
                    {!options && remove && !edit2 &&
                        <RemoveCard allOff={allOff} handleRemove={handleRemove} destroy={deleteInstallment} id={id} paymentId={paymentId} formValue={formValue} last={detailsB} type={'expense'} />
                    }
                    {!options && !remove && edit2 &&
                        <div onMouseLeave={allOff} className='editFormContainer'>
                            <form action={(formData) => {
                                editInstallment(id, formData, paymentId)
                            }} onSubmit={handleEdit2} className='w-full md:w-4/6 my-10'>
                                <Inputs type={'text'} title={'Descrição'} handleFunc={handleName} name={'name'} value={name} />

                                <Inputs type={'number'} title={'Valor'} handleFunc={handleValue} name={'value'} value={formValue} />

                                <DoubleInput title={'Parcela atual / última'} handleA={handleCurrent} handleB={handleLast} A={'current'} B={'last'} valueA={current} valueB={last} />

                                {parseFloat(useThisValue) > 0 && parseFloat(useThisValue) * parseFloat(last) <= maxCredit ?
                                    <div className='container'>
                                        <label htmlFor="option">Forma de pagamento</label>
                                        <select onChange={handleOption} name="option" id="option" value={option}>
                                            <option value={option} hidden>{payment[0]}</option>
                                            {creditOptions.filter(e => parseFloat(e.value) >= parseFloat(useThisValue) * parseFloat(last)).filter(e => e.id !== paymentId).map(e =>
                                                <option key={e.id} value={e.id}>{`${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                                            )}
                                        </select>
                                    </div>
                                    : parseFloat(useThisValue) > 0 && parseFloat(useThisValue) * parseFloat(last) ? <p className="px-10 mb-5">Você não possui opções de crédito disponíveis para este parcelamento. <Link href={'/credito'} className='font-semibold'>Confira suas opções de crédito ↗</Link></p>
                                        : null
                                }
                                <div className='formButtonContainer'>
                                    {button && current <= last &&
                                        <ConfirmButton />
                                    }
                                    <CancelButton handleCancel={handleEdit2} />
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
                        <ExpenseCard handleOptions={handleOptions} title={title} value={value} detailsA={detailsA} icon={pending} alt={'pagamento pendente'} />
                    }
                    {options && !remove && !edit2 && !pay2 &&
                        <OptionsCard allOff={allOff} handleOptions={handleOptions} handleEdit2={handleEdit2} handleRemove={handleRemove} handlePay2={handlePay2} useThisValue={useThisValue} maxResource={maxResource} />
                    }
                    {!options && remove && !edit2 && !pay2 &&
                        <RemoveCard allOff={allOff} handleRemove={handleRemove} destroy={deletePending} id={id} paymentId={paymentId} formValue={formValue} type={'expense'} />
                    }
                    {!options && !remove && !edit2 && pay2 &&
                        <div className="editFormContainer">
                            <div className='container'>
                                <label className='mt-5' htmlFor="option">Forma de pagamento</label>
                                <select onChange={handleOption} name="option" id="option" value={option}>
                                    <option defaultValue={'Selecione...'} hidden>Selecione...</option>
                                    {debitOptions.filter(e => e.value >= parseFloat(useThisValue)).map(e =>
                                        <option key={e.id} value={e.id}>{`${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                                    )}
                                </select>
                            </div>
                            <div className='formButtonContainer'>
                                {button && parseFloat(useThisValue) <= maxResource &&
                                    <ConfirmButton />
                                }
                                <CancelButton handleCancel={handlePay2} />
                            </div>
                        </div>
                    }
                    {!options && !remove && edit2 && !pay2 &&
                        <div onMouseLeave={allOff} className='editFormContainer'>
                            <form action={(formData) => {
                                editPending(id, formData)
                            }} onSubmit={handleEdit2} className='w-full md:w-4/6 my-10'>
                                <Inputs type={'text'} title={'Descrição'} handleFunc={handleName} name={'name'} value={name} />

                                <Inputs type={'number'} title={'Valor'} handleFunc={handleValue} name={'value'} value={formValue} />

                                <Inputs type={'number'} title={'Dia'} handleFunc={handleDay} name={'day'} value={day} />

                                <div className='formButtonContainer'>
                                    {button &&
                                        <ConfirmButton />
                                    }
                                    <CancelButton handleCancel={handleEdit2} />
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
