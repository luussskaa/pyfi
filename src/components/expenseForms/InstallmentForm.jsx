import React from 'react'
import CancelButton from '../forForms/CancelButton'
import ConfirmButton from '../forForms/ConfirmButton'
import Inputs from '../forForms/Inputs'
import FormHeading from '../forForms/FormHeading'
import Link from 'next/link'
import DoubleInput from '../forForms/DoubleInput'

export default function InstallmentForm({ addInstallment, handleInstallmentForm, handleName, name, handleValue, value, handleOption, creditOptions, maxCredit, buttonName, buttonValue, buttonOption, handleCurrent, current, handleLast, last, buttonCurrent, buttonLast }) {

    console.log(value, parseFloat(last), maxCredit)

    return (
        <form action={(formData) => {
            addInstallment(formData)
        }} onSubmit={handleInstallmentForm} className='w-full md:w-4/6 mb-10'>

            <FormHeading title={'Novo parcelamento'} obs={'⚠ O valor total de um parcelamento (valor da parcela X n° de parcelas) é deduzido automaticamente da opção de crédito utilizada como forma de pagamento.'} />

            <Inputs type={'text'} title='Descrição' handleFunc={handleName} name={'name'} value={name} placeholder={'Parcelamento'} />

            <Inputs type={'number'} title='Valor da parcela' handleFunc={handleValue} name={'value'} value={value} placeholder={'0,00'} />

            <DoubleInput title={'Parcela atual / Última parcela'} handleFuncA={handleCurrent} A={'current'} valueA={current} handleFuncB={handleLast} B={'last'} valueB={last} />

            {value > 0 && value * parseFloat(last) <= maxCredit ?
                <div className='container'>
                    <label htmlFor="option">Forma de pagamento</label>
                    <select onChange={handleOption} name="option" id="option">
                        <option defaultValue={'Selecione...'} hidden>Selecione...</option>
                        {creditOptions.filter(e => parseFloat(e.value) >= value * parseFloat(last)).map(e =>
                            <option key={e.id} value={e.id}>{`${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</option>
                        )}
                    </select>
                </div>
                : value > 0 && value > maxCredit && <p className="px-10 mb-5">Você não possui limite disponível para este parcelamento. <Link href={'/'} className='font-semibold'>Confira o crédito disponível ↗</Link></p>
            }

            <div className='formButtonContainer'>
                {buttonName && buttonValue && buttonOption && buttonCurrent && buttonLast && current <= last &&
                    <ConfirmButton />
                }
                <CancelButton handleCancel={handleInstallmentForm} />
            </div>

        </form>
    )
}
