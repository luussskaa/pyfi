'use client'

import React, { useState } from 'react'
import ResourceCard from './forItems/ResourceCard';
import OptionsCard from './forItems/OptionsCard';
import RemoveCard from './forItems/RemoveCard';
import Inputs from './forForms/Inputs';
import ConfirmButton from './forForms/ConfirmButton';
import CancelButton from './forForms/CancelButton';
import ExtractCard from './forItems/ExtractCard';

export default function ResourceItem({ id, title, value, resources, resourceOptions, savingOptions, expenses, totalExpenses, editResource, deleteResource, saveResource, savings, transferResource }) {

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

    const [extract, setExtract] = useState(false)
    const handleExtract = () => {
        setExtract(!extract)
        setName(title)
        setFormValue(useThisValue)
        setButton(false)
    }

    const [save, setSave] = useState(false)
    const handleSave = () => {
        setSave(!save)
        setName(title)
        setFormValue(useThisValue)
        setButton(false)
    }

    const [transfer, setTransfer] = useState(false)
    const handleTransfer = () => {
        setTransfer(!transfer)
        setName(title)
        setFormValue(useThisValue)
        setButton(false)
    }

    const allOff = () => {
        setOptions(false)
        setRemove(false)
        setEdit2(false)
        setExtract(false)
        setSave(false)
        setTransfer(false)
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

    const [buttonOption, setButtonOption] = useState()
    const handleOption = (e) => {
        setButtonOption(e.target.value)
        setButton(true)
    }

    return (
        <>
            {!options && !remove && !edit2 && !extract && !save && !transfer &&
                <ResourceCard handleOptions={handleOptions} title={title} value={value} expenses={expenses} />
            }
            {options && !remove && !edit2 && !extract && !save && !transfer &&
                <OptionsCard allOff={allOff} handleOptions={handleOptions} handleRemove={handleRemove} handleEdit2={handleEdit2} handleExtract={handleExtract} expenses={expenses} handleSave={value !== 0 && handleSave} savings={savings} resources={resources} handleTransfer={resourceOptions.length > 1 && handleTransfer} />
            }
            {!options && remove && !edit2 && !extract && !save && !transfer &&
                <RemoveCard allOff={allOff} handleRemove={handleRemove} destroy={deleteResource} id={id} />
            }
            {!options && !remove && edit2 && !extract && !save && !transfer &&
                <div className="editFormContainer hover:my-10 duration-300">
                    <form action={(formData) => {
                        editResource(id, formData)
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
            {!options && !remove && !edit2 && extract && !save && !transfer &&
                <ExtractCard allOff={allOff} title={title} value={value} expenses={expenses} total={value + totalExpenses} handleExtract={handleExtract} invoice={'débito'} />
            }
            {!options && !remove && !edit2 && !extract && save && !transfer &&
                <div className="editFormContainer hover:my-10 duration-300">
                    <form action={(formData) => {
                        saveResource(id, formData)
                    }} onSubmit={handleSave} className='w-full md:w-4/6 my-10'>

                        <Inputs type={'number'} title={'Valor a guardar'} handleFunc={handleValue} name={'value'} value={formValue} />

                        <div className='container'>
                            <label htmlFor="option">Guardar na poupança:</label>
                            <select onChange={handleOption} name="option" id="option">
                                <option defaultValue={'Selecione...'} hidden>Selecione...</option>
                                {savingOptions.map(e =>
                                    <option key={e.id} value={e.id}>{`${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                                )}
                            </select>
                        </div>

                        <div className='formButtonContainer'>
                            {button && buttonOption && formValue <= useThisValue &&
                                <ConfirmButton />
                            }
                            <CancelButton handleCancel={handleSave} />
                        </div>
                    </form>
                </div>
            }
            {!options && !remove && !edit2 && !extract && !save && transfer &&
                <div className="editFormContainer hover:my-10 duration-300">
                    <form action={(formData) => {
                        transferResource(id, formData)
                    }} onSubmit={handleTransfer} className='w-full md:w-4/6 my-10'>

                        <Inputs type={'number'} title={'Valor a transferir'} handleFunc={handleValue} name={'value'} value={formValue} />

                        <div className='container'>
                            <label htmlFor="option">Transferir para o recurso:</label>
                            <select onChange={handleOption} name="option" id="option">
                                <option defaultValue={'Selecione...'} hidden>Selecione...</option>
                                {resourceOptions.filter(e => e.id !== id).map(e =>
                                    <option key={e.id} value={e.id}>{`${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                                )}
                            </select>
                        </div>

                        <div className='formButtonContainer'>
                            {button && buttonOption && formValue <= useThisValue &&
                                <ConfirmButton />
                            }
                            <CancelButton handleCancel={handleTransfer} />
                        </div>
                    </form>
                </div>
            }
        </>
    )
}
