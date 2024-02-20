'use client'

import React, { useState } from 'react'

import DebitForm from './expenseForms/DebitForm'
import CreditForm from './expenseForms/CreditForm'
import InstallmentForm from './expenseForms/InstallmentForm'
import PendingForm from './expenseForms/PendingForm'
import Button from './Button'
import TextGroup from './TextGroup'
import MissingPayment from './MissingPayment'
import TotalGroup from './TotalGroup'
import Click4Options from './Click4Options'

export default function ExpenseCreator({ resources, expenses, credit, addDebit, addCredit, addInstallment, addPending, debitOptions, creditOptions, maxResource, maxCredit, debitExpenses, creditExpenses, installments, pendingExpenses }) {

    const qty = expenses.length

    const totalDebit = debitExpenses.length !== 0 ? debitExpenses.map(e => e.value).reduce((a, b) => a + b).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'
    const debitQty = debitExpenses.length

    const totalCredit = creditExpenses.length !== 0 ? creditExpenses.map(e => e.value).reduce((a, b) => a + b).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'
    const creditQty = creditExpenses.length

    const totalInstallments = installments.length !== 0 ? installments.map(e => e.value).reduce((a, b) => a + b).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'
    const installmentsQty = installments.length

    const totalPending = pendingExpenses.length !== 0 ? pendingExpenses.map(e => e.value).reduce((a, b) => a + b).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'
    const pendingQty = pendingExpenses.length

    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }

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

    const [day, setDay] = useState()
    const [buttonDay, setbuttonDay] = useState(false)
    const handleDay = (e) => {
        setDay(e.target.value)
        if (parseFloat(e.target.value) <= 0) {
            setbuttonDay(false)
        } else if (isFloat(parseFloat(e.target.value))) {
            setbuttonDay(false)
        } else if (e.target.value !== '') {
            setbuttonDay(true)
        } else {
            setbuttonDay(false)
        }
    }

    const [recurrent, setRecurrent] = useState(false)
    const handleRecurrent = () => {
        setRecurrent(!recurrent)
    }

    const [current, setCurrent] = useState()
    const [last, setLast] = useState()
    const [buttonCurrent, setbuttonCurrent] = useState(false)
    const [buttonLast, setbuttonLast] = useState(false)
    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }

    const handleCurrent = (e) => {
        setCurrent(e.target.value)
        if (parseFloat(e.target.value) <= 0) {
            setbuttonCurrent(false)
        } else if (isFloat(parseFloat(e.target.value))) {
            setbuttonCurrent(false)
        } else if (e.target.value !== '') {
            setbuttonCurrent(true)
        } else {
            setbuttonCurrent(false)
        }
    }
    const handleLast = (e) => {
        setLast(e.target.value)
        if (parseFloat(e.target.value) <= 0) {
            setbuttonLast(false)
        } else if (isFloat(parseFloat(e.target.value))) {
            setbuttonLast(false)
        } else if (e.target.value !== '') {
            setbuttonLast(true)
        } else {
            setbuttonLast(false)
        }
    }


    const [option, setOption] = useState()
    const [buttonOption, setbuttonOption] = useState(false)
    const handleOption = (e) => {
        setOption(e.target.value)
        if (parseFloat(e.target.value) <= 0) {
            setbuttonOption(false)
        } else if (e.target.value !== '') {
            setbuttonOption(true)
        } else {
            setbuttonOption(false)
        }
    }

    const [debitForm, setDebitForm] = useState(false)
    const handleDebitForm = () => {
        setDebitForm(!debitForm)
        if (!debitForm) {
            setName()
            setValue()
            setDay()
            setOption()
            setCurrent()
            setLast()
            setRecurrent()
        }
    }

    const [creditForm, setCreditForm] = useState(false)
    const handleCreditForm = () => {
        setCreditForm(!creditForm)
        if (!creditForm) {
            setName()
            setValue()
            setDay()
            setOption()
            setCurrent()
            setLast()
            setRecurrent()
        }
    }

    const [installmentForm, setInstallmentForm] = useState(false)
    const handleInstallmentForm = () => {
        setInstallmentForm(!installmentForm)
        if (!installmentForm) {
            setName()
            setValue()
            setDay()
            setOption()
            setCurrent()
            setLast()
            setRecurrent()
        }
    }

    const [pendingForm, setPendingForm] = useState(false)
    const handlePendingForm = () => {
        setPendingForm(!pendingForm)
        if (!pendingForm) {
            setName()
            setValue()
            setDay()
            setOption()
            setCurrent()
            setLast()
            setRecurrent()
        }
    }

    return (
        <>
            {debitForm &&
                <DebitForm addDebit={addDebit} recurrent={recurrent} handleDebitForm={handleDebitForm} handleName={handleName} name={name} handleValue={handleValue} value={value} handleOption={handleOption} debitOptions={debitOptions} handleDay={handleDay} day={day} handleRecurrent={handleRecurrent} maxResource={maxResource} buttonName={buttonName} buttonValue={buttonValue} buttonDay={buttonDay} buttonOption={buttonOption} />
            }

            {creditForm &&
                <CreditForm addCredit={addCredit} handleCreditForm={handleCreditForm} handleName={handleName} name={name} handleValue={handleValue} value={value} handleOption={handleOption} creditOptions={creditOptions} handleDay={handleDay} day={day} maxCredit={maxCredit} buttonName={buttonName} buttonValue={buttonValue} buttonDay={buttonDay} buttonOption={buttonOption} />
            }

            {installmentForm &&
                <InstallmentForm addInstallment={addInstallment} handleInstallmentForm={handleInstallmentForm} handleName={handleName} name={name} handleValue={handleValue} value={value} handleOption={handleOption} creditOptions={creditOptions} maxCredit={maxCredit} handleDay={handleDay} day={day} handleCurrent={handleCurrent} current={current} handleLast={handleLast} last={last} buttonName={buttonName} buttonValue={buttonValue} buttonOption={buttonOption} buttonCurrent={buttonCurrent} buttonLast={buttonLast} />
            }

            {pendingForm &&
                <PendingForm addPending={addPending} handlePendingForm={handlePendingForm} handleName={handleName} name={name} handleValue={handleValue} value={value} handleDay={handleDay} day={day} buttonName={buttonName} buttonValue={buttonValue} buttonDay={buttonDay} />
            }

            {!debitForm && !creditForm && !installmentForm && !pendingForm &&
                <>

                    <TextGroup heading={'Adicionar gastos'} text={'Adicione um novo gasto pelo tipo de pagamento:'} />

                    {resources.length === 0 &&
                        <MissingPayment text={'⚠ Você precisa de um recurso para poder adicionar pagamentos no débito e para quitar pagamentos pendentes!'} />
                    }
                    {credit.length === 0 &&
                        <MissingPayment text={'⚠ Você precisa de um cartão de crédito para poder adicionar pagamentos no crédito e parcelamentos!'} />
                    }

                    <div className="buttonContainer">
                        {resources.length !== 0 &&
                            <Button title={'+ débito'} handleClick={handleDebitForm} />
                        }
                        {credit.length !== 0 &&
                            <>
                                <Button title={'+ crédito'} handleClick={handleCreditForm} />
                                <Button title={'+ parcelamento'} handleClick={handleInstallmentForm} />
                            </>
                        }
                        {resources.length !== 0 &&
                            <Button title={'+ pendente'} handleClick={handlePendingForm} />
                        }
                    </div>

                    {expenses.length !== 0 ?
                        <>
                            <TextGroup heading={'Lançamentos do mês'} text={'Confira abaixo os gastos do mês.'} qty={qty} />
                            {debitExpenses.length !== 0 &&
                                <TotalGroup title={'Débito'} total={totalDebit} qty={debitQty} name={'gasto'} />
                            }
                            {creditExpenses.length !== 0 &&
                                <TotalGroup title={'Crédito'} total={totalCredit} qty={creditQty} name={'gasto'} />
                            }
                            {installments.length !== 0 &&
                                <TotalGroup title={'Parcelas'} total={totalInstallments} qty={installmentsQty} name={'gasto'} />
                            }
                            {pendingExpenses.length !== 0 &&
                                <TotalGroup title={'Pendentes'} total={totalPending} qty={pendingQty} name={'gasto'} />
                            }
                            <Click4Options />
                        </>
                        :
                        <TextGroup heading={'Ainda não há lançamentos neste mês'} text={'Adicione um novo gasto, se necessário.'} />
                    }
                </>
            }
        </>
    )
}
