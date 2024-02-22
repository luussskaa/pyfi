'use client'

import React, { useState } from 'react'
import ExtractCard from '../components/forItems/ExtractCard';
import CreditCard from '../components/forItems/CreditCard';
import OptionsCard from '../components/forItems/OptionsCard';
import RemoveCard from '../components/forItems/RemoveCard';
import Inputs from '../components/forForms/Inputs';
import DoubleInput from '../components/forForms/DoubleInput';
import ConfirmButton from '../components/forForms/ConfirmButton';
import CancelButton from '../components/forForms/CancelButton';

export default function CreditItem({ id, title, value, total, detailsA, expenses, editCredit, deleteCredit, invoiceValues }) {

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
        // setClose(detailsA)
        setExpire(detailsA)
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

    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }

    // const [close, setClose] = useState(detailsA)
    // const handleClose = (e) => {
    //     setClose(e.target.value)
    //     if (parseFloat(e.target.value) <= 0) {
    //         setButton(false)
    //     } else if (isFloat(parseFloat(e.target.value))) {
    //         setButton(false)
    //     } else if (e.target.value !== '') {
    //         setButton(true)
    //     } else {
    //         setButton(false)
    //     }
    // }

    const [expire, setExpire] = useState(detailsA)
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
                <CreditCard handleOptions={handleOptions} title={title} value={value} expenses={expenses} />
            }
            {options && !remove && !edit2 && !extract &&
                <OptionsCard allOff={allOff} handleOptions={handleOptions} handleEdit2={handleEdit2} handleRemove={handleRemove} handleExtract={handleExtract} expenses={expenses} />
            }
            {!options && remove && !edit2 && !extract &&
                <RemoveCard allOff={allOff} handleRemove={handleRemove} destroy={deleteCredit} id={id} />
            }
            {!options && !remove && edit2 && !extract &&
                <div onMouseLeave={allOff} className="editFormContainer">
                    <form action={(formData) => {
                        editCredit(id, formData)
                    }} onSubmit={handleEdit2} className='w-full md:w-4/6 my-10'>

                        <Inputs type={'text'} title={'Apelido do cartão'} handleFunc={handleName} name={'name'} value={name} />

                        <Inputs type={'number'} title={'Limite total'} handleFunc={handleValue} name={'value'} value={formValue} />

                        <Inputs type={'number'} title='Fatura vence dia' handleFunc={handleExpire} name={'expire'} value={expire} placeholder={'3'} />

                        <div className='formButtonContainer'>
                            {button &&
                                <ConfirmButton />
                            }
                            <CancelButton handleCancel={handleEdit2} />
                        </div>
                    </form>
                </div>
            }
            {!options && !remove && !edit2 && extract && invoiceValues &&
                <>
                    <ExtractCard allOff={allOff} title={title} value={value} total={total} expenses={expenses} handleExtract={handleExtract} invoice={invoiceValues.filter(e => e.type !== 'pending').length !== 0 ? invoiceValues.filter(e => e.type !== 'pending').map(e => e.value).reduce((a, b) => a + b).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Sem fatura'} />
                </>
            }
        </>
    )
}
