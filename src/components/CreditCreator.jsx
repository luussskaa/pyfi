'use client'

import React, { useState } from 'react'
import TextGroup from './TextGroup'
import Button from './Button'
import Inputs from './forForms/Inputs'
import ConfirmButton from './forForms/ConfirmButton'
import CancelButton from './forForms/CancelButton'
import TotalGroup from './TotalGroup'
import Click4Options from './Click4Options'
import FormHeading from './forForms/FormHeading'

export default function CreditCreator({ addCredit, credit }) {

    const totalLimit = credit.length !== 0 ? credit.map(e => e.total).reduce((a, b) => a + b).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'

    const totalAvailable = credit.length !== 0 ? credit.map(e => e.value).reduce((a, b) => a + b).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'

    const qty = credit.length

    const [name, setName] = useState()
    const [buttonName, setbuttonName] = useState(false)
    const handleName = (e) => {
        console.log(e.target.value)
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

    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }

    // const [close, setClose] = useState()
    // const [buttonClose, setbuttonClose] = useState(false)
    // const handleClose = (e) => {
    //     console.log(e.target.value)
    //     setClose(e.target.value)
    //     if (parseFloat(e.target.value) <= 0) {
    //         setbuttonClose(false)
    //     } else if (isFloat(parseFloat(e.target.value))) {
    //         setbuttonClose(false)
    //     } else if (e.target.value !== '') {
    //         setbuttonClose(true)
    //     } else {
    //         setbuttonClose(false)
    //     }
    // }

    const [expire, setExpire] = useState()
    const [buttonExpire, setbuttonExpire] = useState(false)
    const handleExpire = (e) => {
        console.log(e.target)
        setExpire(e.target.value)
        if (parseFloat(e.target.value) <= 0) {
            setbuttonExpire(false)
        } else if (isFloat(parseFloat(e.target.value))) {
            setbuttonExpire(false)
        } else if (e.target.value !== '') {
            setbuttonExpire(true)
        } else {
            setbuttonExpire(false)
        }
    }

    const [creditForm, setResourceForm] = useState(false)
    const handleResourceForm = () => {
        setResourceForm(!creditForm)
        if (!creditForm) {
            setName()
            setValue()
            // setClose()
            setExpire()
        }
    }

    return (
        <>
            {creditForm &&
                <form action={(formData) => {
                    addCredit(formData)
                }} onSubmit={handleResourceForm} className='w-full md:w-4/6 mb-10'>
                    <FormHeading title={'Novo cartão de crédito'} obs={'Utilize seus cartões para informar a existência de pagamentos no crédito e de parcelamentos em "Meus gastos".'} />
                    <Inputs type={'text'} title='Apelido do cartão' handleFunc={handleName} name={'name'} value={name} placeholder={'Meu cartão de crédito'} />
                    <Inputs type={'number'} title='Limite total' handleFunc={handleValue} name={'value'} value={value} placeholder={'0,00'} />
                    <Inputs type={'number'} title='Fatura vence dia' handleFunc={handleExpire} name={'expire'} value={expire} placeholder={'3'} />
                    <div className='formButtonContainer'>
                        {buttonName && buttonValue && buttonExpire &&
                            <ConfirmButton />
                        }
                        <CancelButton handleCancel={handleResourceForm} />
                    </div>
                </form>
            }

            {!creditForm &&
                <>
                    {credit.length !== 0 ?
                        <>
                            <TextGroup heading={'Cartões de crédito'} text={'Aqui você pode acompanhar o uso dos seus cartões de crédito e a formação das faturas a serem pagas no próximo mês.'} qty={qty} />
                            <div className="buttonContainer">
                                <Button title={'+ cartão'} handleClick={handleResourceForm} />
                            </div>
                            {totalLimit !== totalAvailable ?
                                <>
                                    <TotalGroup title={'Limite disp.'} total={totalAvailable} name={'limite disponível'} />
                                    <TotalGroup title={'Limite orig.'} total={totalLimit} name={'limite total'} />
                                </>
                                :
                                <TotalGroup title={'Disponivel'} total={totalLimit} name={'limite disponível'} />
                            }
                            <Click4Options />
                        </>
                        :
                        <>
                            <TextGroup heading={'Você não possui cartões de crédito'} text={'Você precisa de cartões de crédito para adicionar gastos pagos no crédito e parcelamentos.'} />
                            <div className="buttonContainer">
                                <Button title={'+ cartão'} handleClick={handleResourceForm} />
                            </div>
                        </>
                    }
                </>
            }
        </>
    )
}
