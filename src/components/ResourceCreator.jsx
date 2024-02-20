'use client'

import React, { useState } from 'react'
import FormHeading from './forForms/FormHeading'
import Inputs from './forForms/Inputs'
import ConfirmButton from './forForms/ConfirmButton'
import CancelButton from './forForms/CancelButton'
import TextGroup from './TextGroup'
import Button from './Button'
import TotalGroup from './TotalGroup'
import Click4Options from './Click4Options'

export default function ResourceCreator({ addResource, resources }) {

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
                    addResource(formData)
                }} onSubmit={handleResourceForm} className='w-full md:w-4/6 mb-10'>
                    <FormHeading title={'Novo recurso'} obs={'Utilize seus recursos para informar a existência de pagamentos no débito e para quitar pagamentos pendentes em "Meus gastos".'} />
                    <Inputs type={'text'} title='Descrição' handleFunc={handleName} name={'name'} value={name} placeholder={'Meu dinheiro'} />
                    <Inputs type={'number'} title='Valor' handleFunc={handleValue} name={'value'} value={value} placeholder={'0,00'} />
                    <div className='formButtonContainer'>
                        {buttonName && buttonValue &&
                            <ConfirmButton />
                        }
                        <CancelButton handleCancel={handleResourceForm} />
                    </div>
                </form>
            }
            {!resourceForm &&
                <>
                    {resources.length !== 0 ?
                        <>
                            <TextGroup heading={'Recursos'} text={'Aqui você pode acompanhar o uso do seu dinheiro.'} qty={resourcesQty} />
                            <div className="buttonContainer">
                                <Button title={'+ recurso'} handleClick={handleResourceForm} />
                            </div>
                            <TotalGroup title={'Total'} total={totalResources} name={'total em recursos'} />
                            <Click4Options />
                        </>
                        :
                        <>
                            <TextGroup heading={'Você não possui recursos'} text={'Você precisa de recursos para adicionar pagamentos no débito e para quitar pagamentos pendentes.'} />
                            <div className="buttonContainer">
                                <Button title={'+ recurso'} handleClick={handleResourceForm} />
                            </div>
                        </>
                    }
                </>
            }
        </>
    )
}
