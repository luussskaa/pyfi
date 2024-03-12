import React from 'react'

export default function Header({ currentMonth, resources, savings, expenses, credit, page }) {

    const month = `${currentMonth.month} / ${currentMonth.year}`

    let title

    let currentMonthValue

    if (page === 'dinheiro') {

        title = 'Meu dinheiro'

        currentMonthValue = resources.length !== 0 && savings.length === 0 ? (resources.map(e => e.value).reduce((a, b) => a + b)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : resources.length === 0 && savings.length !== 0 ? (savings.map(e => e.value).reduce((a, b) => a + b)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : resources.length !== 0 && savings.length !== 0 ? (resources.map(e => e.value).reduce((a, b) => a + b) + savings.map(e => e.value).reduce((a, b) => a + b)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'
    } else if (page === 'gastos') {

        title = 'Meus gastos'

        currentMonthValue = expenses.length !== 0 ? expenses.map(expense => expense.value).reduce((a, b) => a + b).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'
    } else if (page === 'credito') {

        title = 'Meu crédito'

        currentMonthValue = credit.length !== 0 ? credit.map(credit => credit.value).reduce((a, b) => a + b).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            {month !== undefined &&
                <div className="text-sm font-semibold mb-5 bg-pink-600 rounded-full py-1 px-2 text-white">{month}</div>
            }
            <div className="text-4xl font-semibold mb-2 text-pink-600">{title}</div>
            <div className="text-lg">R$ {currentMonthValue}</div>
        </div>
    )
}
