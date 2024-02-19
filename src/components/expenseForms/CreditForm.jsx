import React from 'react'
import FormHeading from '../forForms/FormHeading'
import Inputs from '../forForms/Inputs'
import ConfirmButton from '../forForms/ConfirmButton'
import CancelButton from '../forForms/CancelButton'
import Link from 'next/link'

export default function CreditForm({ addCredit, handleCreditForm, handleName, name, handleValue, value, handleOption, creditOptions, handleDay, day, maxCredit, buttonName, buttonValue, buttonDay, buttonOption }) {
    return (
        <form action={(formData) => {
            addCredit(formData)
        }} onSubmit={handleCreditForm} className='w-full md:w-4/6 mb-10'>

            <FormHeading title={'Novo pagamento no crédito'} obs={'⚠ O valor deste pagamento é deduzido automaticamente do limite disponível do cartão utilizado como forma de pagamento.'} />

            <Inputs type={'text'} title='Descrição' handleFunc={handleName} name={'name'} value={name} placeholder={'Pagamento no crédito'} />

            <Inputs type={'number'} title='Valor' handleFunc={handleValue} name={'value'} value={value} placeholder={'0,00'} />

            {value <= maxCredit ?
                <div className='container'>
                    <label htmlFor="option">Forma de pagamento</label>
                    <select onChange={handleOption} name="option" id="option">
                        <option defaultValue={'Selecione...'} hidden>Selecione...</option>
                        {creditOptions.filter(e => e.value >= value).map(e =>
                            <option key={e.id} value={e.id}>{`${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                        )}
                    </select>
                </div>
                : value > 0 && value > maxCredit && <p className="px-10 mb-5">Você não possui limite disponível para este pagamento. <Link href={'/'} className='font-semibold'>Confira o crédito disponível ↗</Link></p>
            }

            <Inputs type={'number'} title='Dia' handleFunc={handleDay} name={'day'} value={day} placeholder={'3'} />

            <div className='formButtonContainer'>
                {buttonName && buttonValue && buttonDay && day <= 31 && buttonOption &&
                    <ConfirmButton />
                }
                <CancelButton handleCancel={handleCreditForm} />
            </div>

        </form>
    )
}
