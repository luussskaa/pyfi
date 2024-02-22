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

export default function ExpenseItem({ id, paymentId, title, value, detailsA, detailsB, type, editDebit, deleteDebit, recurrentDebit, editCredit, deleteCredit, editInstallment, deleteInstallment, editPending, deletePending, payPending, debitOptions, maxResource, creditOptions, maxCredit }) {

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
        setOption(false)
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

    const [option, setOption] = useState(false)
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
                                            <option value={false} hidden>Selecione...</option>
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
                                    {button && option &&
                                        < ConfirmButton />
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
                                            <option value={false} hidden>Selecione...</option>
                                            {creditOptions.filter(e => e.value >= parseFloat(formValue)).map(e =>
                                                <option key={e.id} value={e.id}>{`${e.id === paymentId ? `★ ${e.name}` : `${e.name}`} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                                            )}
                                        </select>
                                    </div>
                                    : parseFloat(formValue) > 0 && parseFloat(formValue) > maxCredit && <p className="px-10 mb-5">Você não possui opções de crédito disponíveis para este pagamento. <Link href={'/credito'} className='font-semibold'>Confira suas opções de crédito ↗</Link></p>
                                }

                                <Inputs type={'number'} title={'Dia'} handleFunc={handleDay} name={'day'} value={day} />

                                <div className='formButtonContainer'>
                                    {button && option &&
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

                                {parseFloat(formValue) > 0 && parseFloat(formValue) * parseFloat(last) <= maxCredit ?
                                    <div className='container'>
                                        <label htmlFor="option">Forma de pagamento</label>
                                        <select onChange={handleOption} name="option" id="option" value={option}>
                                            <option value={false} hidden>Selecione...</option>
                                            {creditOptions.filter(e => parseFloat(e.value) >= parseFloat(formValue) * parseFloat(last)).map(e =>
                                                <option key={e.id} value={e.id}>{`${e.id === paymentId ? `★ ${e.name}` : `${e.name}`} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                                            )}
                                        </select>
                                    </div>
                                    : parseFloat(formValue) > 0 && parseFloat(formValue) * parseFloat(last) ? <p className="px-10 mb-5">Você não possui opções de crédito disponíveis para este parcelamento. <Link href={'/credito'} className='font-semibold'>Confira suas opções de crédito ↗</Link></p>
                                        : null
                                }
                                <div className='formButtonContainer'>
                                    {button && current <= last && option &&
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
                        <OptionsCard allOff={allOff} handleOptions={handleOptions} handleEdit2={handleEdit2} handleRemove={handleRemove} handlePay2={handlePay2} formValue={formValue} maxResource={maxResource} />
                    }
                    {!options && remove && !edit2 && !pay2 &&
                        <RemoveCard allOff={allOff} handleRemove={handleRemove} destroy={deletePending} id={id} paymentId={paymentId} formValue={formValue} type={'expense'} />
                    }
                    {!options && !remove && !edit2 && pay2 &&
                        <div onMouseLeave={allOff} className='editFormContainer'>
                            <form action={(formData) => {
                                payPending(id, formData)
                            }} onSubmit={handlePay2} className='w-full md:w-4/6 my-10'>
                                <div className='container'>
                                    <label htmlFor="option">Forma de pagamento</label>
                                    <select onChange={handleOption} name="option" id="option" value={option}>
                                        <option value={false} hidden>Selecione...</option>
                                        {debitOptions.filter(e => e.value >= parseFloat(formValue)).map(e =>
                                            <option key={e.id} value={e.id}>{`${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                                        )}
                                    </select>
                                </div>
                                <div className='formButtonContainer'>
                                    {button && parseFloat(formValue) <= maxResource &&
                                        <ConfirmButton />
                                    }
                                    <CancelButton handleCancel={handlePay2} />
                                </div>
                            </form>
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
        </>
    )
}
