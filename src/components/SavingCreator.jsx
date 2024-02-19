'use client'

import React, { useState } from 'react'
import TextGroup from './TextGroup'
import Button from './Button'
import TotalGroup from './TotalGroup'
import FormHeading from './forForms/FormHeading'
import Inputs from './forForms/Inputs'
import ConfirmButton from './forForms/ConfirmButton'
import CancelButton from './forForms/CancelButton'
import Click4Options from './Click4Options'

export default function SavingCreator({ addSaving, savings }) {

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
                    addSaving(formData)
                }} onSubmit={handleSavingForm} className='w-full md:w-4/6 mb-10'>
                    <FormHeading title={'Nova poupança'} obs={'Poupanças são valores que você pretende guardar para qualquer finalidade.'} />
                    <Inputs type={'text'} title='Descrição' handleFunc={handleName} name={'name'} value={name} placeholder={'Minha poupança'} />
                    <Inputs type={'number'} title='Valor' handleFunc={handleValue} name={'value'} value={value} placeholder={'0,00'} />
                    <div className='formButtonContainer'>
                        {buttonName && buttonValue &&
                            <ConfirmButton />
                        }
                        <CancelButton handleCancel={handleSavingForm} />
                    </div>
                </form>
            }
            {!savingForm &&
                <>
                    {savings.length !== 0 ?
                        <>
                            <TextGroup heading={'Poupanças'} text={'Aqui fica o dinheiro que você tem guardado.'} qty={savingsQty} />
                            <div className="buttonContainer">
                                <Button title={'+ poupança'} handleClick={handleSavingForm} />
                            </div>
                            <TotalGroup title={'Total'} total={totalSavings} name={'total em poupanças'} />
                            <Click4Options />
                        </>
                        :
                        <>
                            <TextGroup heading={'Você não possui poupanças'} text={'Aqui ficaria o dinheiro que você tem guardado.'} />
                            <div className="buttonContainer">
                                <Button title={'+ poupança'} handleClick={handleSavingForm} />
                            </div>
                        </>
                    }
                </>
            }
        </>
    )
}
