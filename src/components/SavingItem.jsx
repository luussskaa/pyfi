'use client'

import React, { useState } from 'react'
import Image from "next/image";

import poupanca from '../../public/poupanca.png'
import edit from '../../public/edit.png'
import withdraw from '../../public/withdraw.png'
import destroy from '../../public/destroy.png'
import confirm from '../../public/confirm.png'
import cancel from '../../public/cancel.png'
import SavingCard from './forItems/SavingCard';
import OptionsCard from './forItems/OptionsCard';
import RemoveCard from './forItems/RemoveCard';
import ConfirmButton from './forForms/ConfirmButton';
import CancelButton from './forForms/CancelButton';
import Inputs from './forForms/Inputs';

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

    // const [option, setOption] = useState()
    const [buttonOption, setButtonOption] = useState()
    const handleOption = (e) => {
        setButtonOption(e.target.value)
        setButton(true)
    }

    return (
        <>
            {!options && !remove && !edit2 && !withdraw2 &&
                <SavingCard handleOptions={handleOptions} title={title} value={value} />
            }
            {options && !remove && !edit2 && !withdraw2 &&
                <OptionsCard allOff={allOff} handleOptions={handleOptions} handleEdit2={handleEdit2} handleRemove={handleRemove} handleWithdraw={handleWithdraw} />
            }
            {!options && remove && !edit2 && !withdraw2 &&
                <RemoveCard allOff={allOff} handleRemove={handleRemove} destroy={deleteSaving} id={id} />
            }
            {!options && !remove && edit2 && !withdraw2 &&
                <div className="editFormContainer duration-300">
                    <form action={(formData) => {
                        editSaving(id, formData)
                    }} onSubmit={handleEdit2} className='w-full md:w-4/6 my-10'>

                        <Inputs type={'text'} title={'Descrição'} handleFunc={handleName} name={'name'} value={name} />

                        <Inputs type={'number'} title={'Valor'} handleFunc={handleValue} name={'value'} value={formValue} />

                        <div className='formButtonContainer'>
                            {button &&
                                <ConfirmButton />
                            }
                            <CancelButton handleCancel={handleEdit2} />
                        </div>
                    </form>
                </div>
            }
            {!options && !remove && !edit2 && withdraw2 &&
                <div className="editFormContainer duration-300">
                    <form action={(formData) => {
                        withdrawSaving(id, formData)
                    }} onSubmit={handleWithdraw} className="w-full md:w-4/6 my-10">

                        <Inputs type={'number'} title={'Valor a sacar'} handleFunc={handleValue} name={'value'} value={formValue} />

                        <div className='container'>
                            <label htmlFor="option">Depositar no recurso:</label>
                            <select onChange={handleOption} name="option" id="option">
                                <option defaultValue={'Selecione...'} hidden>Selecione...</option>
                                {resourceOptions.map(e =>
                                    <option key={e.id} value={e.id}>{`${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                                )}
                            </select>
                        </div>

                        <div className='formButtonContainer'>
                            {button && buttonOption && formValue <= useThisValue &&
                                <ConfirmButton />
                            }
                            <CancelButton handleCancel={handleWithdraw} />
                        </div>
                    </form>
                </div>
            }
        </>
    )
}