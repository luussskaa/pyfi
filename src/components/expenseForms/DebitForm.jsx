import React from 'react'
import Inputs from '../forForms/Inputs'
import RecurrencyCheckBox from '../forForms/RecurrencyCheckBox'
import ConfirmButton from '../forForms/ConfirmButton'
import CancelButton from '../forForms/CancelButton'
import FormHeading from '../forForms/FormHeading'
import Link from 'next/link'

export default function DebitForm({ addDebit, recurrent, handleDebitForm, handleName, name, handleValue, value, handleOption, debitOptions, handleDay, day, handleRecurrent, maxResource, buttonName, buttonValue, buttonDay, buttonOption }) {
    return (
        <form action={(formData) => {
            addDebit(recurrent, formData)
        }} onSubmit={handleDebitForm} className='w-full md:w-4/6 mb-10'>

            <FormHeading title={'Novo pagamento no débito'} obs={'⚠ O valor deste pagamento é deduzido automaticamente do recurso utilizado como forma de pagamento.'} />

            <Inputs type={'text'} title='Descrição' handleFunc={handleName} name={'name'} value={name} placeholder={'Pagamento no débito'} />

            <Inputs type={'number'} title='Valor' handleFunc={handleValue} name={'value'} value={value} placeholder={'0,00'} />

            {value <= maxResource ?
                <div className='container'>
                    <label htmlFor="option">Forma de pagamento</label>
                    <select onChange={handleOption} name="option" id="option">
                        <option defaultValue={'Selecione...'} hidden>Selecione...</option>
                        {debitOptions.filter(e => e.value >= value).map(e =>
                            <option key={e.id} value={e.id}>{`${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                        )}
                    </select>
                </div>
                : value > 0 && value > maxResource && <p className="px-10 mb-5">Você não possui recursos disponíveis para este pagamento. <Link href={'/'} className='font-semibold'>Confira seus recursos ↗</Link></p>
            }

            <Inputs type={'number'} title='Dia' handleFunc={handleDay} name={'day'} value={day} placeholder={'3'} />

            <RecurrencyCheckBox title={'Recorrente?'} handleRecurrent={handleRecurrent} recurrent={recurrent} />

            <div className='formButtonContainer'>
                {buttonName && buttonValue && buttonDay && day <= 31 && buttonOption &&
                    <ConfirmButton />
                }
                <CancelButton handleCancel={handleDebitForm} />
            </div>
        </form>
    )
}
