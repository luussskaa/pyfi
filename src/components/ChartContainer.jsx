import React from 'react'
import ChartBar from './ChartBar'

export default function ChartContainer({ previousMonths, resources, savings, expenses, credit, currentMonth, page }) {

    let previousMonthsValues

    let currentMonthValue

    const chartBarLength = 137

    if (page === 'dinheiro') {

        previousMonthsValues = previousMonths.map(e => parseFloat(e.money))
        const max = Math.max(...previousMonthsValues)

        currentMonthValue = resources.length !== 0 && savings.length === 0 ? (resources.map(e => e.value).reduce((a, b) => a + b)) : resources.length === 0 && savings.length !== 0 ? (savings.map(e => e.value).reduce((a, b) => a + b)) : resources.length !== 0 && savings.length !== 0 ? (resources.map(e => e.value).reduce((a, b) => a + b) + savings.map(e => e.value).reduce((a, b) => a + b)) : '0,00'

        return (
            <div className="px-2 mt-5 flex flex-wrap mx-auto items-end">
                {previousMonths.map(e =>
                    <>
                        <ChartBar key={e.id} index={e.name.slice(0, 3)} value={(e.money === max && max > parseFloat(currentMonthValue) ? chartBarLength : e.money === max && max <= parseFloat(currentMonthValue) ? (e.money * chartBarLength) / parseFloat(currentMonthValue) : parseFloat(currentMonthValue) > max ? (e.money * chartBarLength) / parseFloat(currentMonthValue) : (e.money * chartBarLength) / max)} />
                    </>
                )}
                <ChartBar index={currentMonth[0].month.slice(0, 3)} value={parseFloat(currentMonthValue) > max ? chartBarLength : parseFloat(currentMonthValue) <= max && (parseFloat(currentMonthValue) * chartBarLength) / max} isCurrent={true} />
            </div>
        )

    } else if (page === 'gastos') {

        previousMonthsValues = previousMonths.map(e => parseFloat(e.expenses))
        const max = Math.max(...previousMonthsValues)

        currentMonthValue = expenses.length !== 0 ? expenses.map(e => e.value).reduce((a, b) => a + b) : '0,00'

        return (
            <div className="px-2 mt-5 flex flex-wrap mx-auto items-end">
                {previousMonths.map(e =>
                    <>
                        <ChartBar key={e.id} index={e.name.slice(0, 3)} value={(e.expenses === max && max > parseFloat(currentMonthValue) ? chartBarLength : e.expenses === max && max <= parseFloat(currentMonthValue) ? (e.expenses * chartBarLength) / parseFloat(currentMonthValue) : parseFloat(currentMonthValue) > max ? (e.expenses * chartBarLength) / parseFloat(currentMonthValue) : (e.expenses * chartBarLength) / max)} />
                    </>
                )}
                <ChartBar index={currentMonth[0].month.slice(0, 3)} value={parseFloat(currentMonthValue) > max ? chartBarLength : parseFloat(currentMonthValue) <= max && (parseFloat(currentMonthValue) * chartBarLength) / max} isCurrent={true} />
            </div>
        )

    } else if (page === 'credito') {

        previousMonthsValues = previousMonths.map(e => parseFloat(e.credit))
        const max = Math.max(...previousMonthsValues)

        currentMonthValue = credit.length !== 0 ? credit.map(e => e.value).reduce((a, b) => a + b) : '0,00'

        return (
            <div className="px-2 mt-5 flex flex-wrap mx-auto items-end">
                {previousMonths.map(e =>
                    <>
                        <ChartBar key={e.id} index={e.name.slice(0, 3)} value={(e.credit === max && max > parseFloat(currentMonthValue) ? chartBarLength : e.credit === max && max <= parseFloat(currentMonthValue) ? (e.credit * chartBarLength) / parseFloat(currentMonthValue) : parseFloat(currentMonthValue) > max ? (e.credit * chartBarLength) / parseFloat(currentMonthValue) : (e.credit * chartBarLength) / max)} />
                    </>
                )}
                <ChartBar index={currentMonth[0].month.slice(0, 3)} value={parseFloat(currentMonthValue) > max ? chartBarLength : parseFloat(currentMonthValue) <= max && (parseFloat(currentMonthValue) * chartBarLength) / max} isCurrent={true} />
            </div>
        )

    }

}
