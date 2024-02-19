import React from 'react'
import FormHeading from '../forForms/FormHeading'
import Inputs from '../forForms/Inputs'
import ConfirmButton from '../forForms/ConfirmButton'
import CancelButton from '../forForms/CancelButton'

export default function PendingForm({ addPending, handlePendingForm, handleName, name, handleValue, value, handleDay, day, buttonName, buttonValue, buttonDay }) {
    return (
        <form action={(formData) => {
            addPending(formData)
        }} onSubmit={handlePendingForm} className='w-full md:w-4/6 mb-10'>

            <FormHeading title={'Novo pagamento pendente'} obs={'⚠ Pagamentos pendentes são aqueles que ainda não foram efetuados. Você vai poder sinalizar o pagamento destas contas a qualquer momento.'} />

            <Inputs type={'text'} title='Descrição' handleFunc={handleName} name={'name'} value={name} placeholder={'Pagamento pendente'} />

            <Inputs type={'number'} title='Valor' handleFunc={handleValue} name={'value'} value={value} placeholder={'0,00'} />

            <Inputs type={'number'} title='Dia' handleFunc={handleDay} name={'day'} value={day} placeholder={'3'} />

            <div className='formButtonContainer'>
                {buttonName && buttonValue && buttonDay && day <= 31 &&
                    <ConfirmButton />
                }
                <CancelButton handleCancel={handlePendingForm} />
            </div>

        </form>
    )
}
