import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CreditItem from "@/components/CreditItem";
import CreditCreator from "@/components/CreditCreator";
import Header from "@/components/Header";
import Divider from "@/components/Divider";
import PreviousMonths from "@/components/PreviousMonthsItem";
import ChartContainer from "@/components/ChartContainer";
import PreviousMonthsContainer from "@/components/PreviousMonthsContainer";

async function addCredit(formData) {

    'use server'

    const { userId } = auth()
    const xataClient = getXataClient()

    const name = formData.get('name')
    const value = formData.get('value')
    const detailsA = formData.get('expire')

    await xataClient.db.Credit.create({
        name,
        value: parseFloat(value),
        total: parseFloat(value),
        detailsA: parseInt(detailsA),
        userId
    })

    redirect('/credito')

}

async function editCredit(id, formData) {

    'use server'

    const xataClient = getXataClient()

    const name = formData.get('name')
    const value = formData.get('value')
    const detailsA = formData.get('expire')

    const getCredit = await xataClient.db.Credit.read(id)
    const getOldValue = parseFloat(getCredit.value)
    const getOldTotal = parseFloat(getCredit.total)

    await xataClient.db.Credit.update(id, {
        name,
        value: parseFloat(value) - (getOldTotal - getOldValue),
        total: parseFloat(value),
        detailsA: parseInt(detailsA),
    })

    redirect('/credito')

}

async function deleteCredit(id) {

    'use server'

    const xataClient = getXataClient()

    await xataClient.db.Credit.delete(id)

    redirect('/credito')

}

export default async function Page() {

    const { userId } = auth()
    const xataClient = getXataClient()

    const currentMonth = await xataClient.db.CurrentMonth.filter({ userId }).getAll()

    const previousMonths = await xataClient.db.PreviousMonths.filter({ userId }).getAll()

    const credit = await xataClient.db.Credit.filter({ userId }).getAll()
    const expenses = await xataClient.db.Expenses.filter({ userId }).getAll()

    return (
        <>
            <Header currentMonth={currentMonth[0]} credit={JSON.parse(JSON.stringify(credit))} page={'credito'} />

            {previousMonths.length !== 0 &&
                <ChartContainer previousMonths={JSON.parse(JSON.stringify(previousMonths))} credit={JSON.parse(JSON.stringify(credit))} currentMonth={currentMonth} page={'credito'} />
            }

            {previousMonths.length !== 0 &&
                <PreviousMonthsContainer previousMonths={JSON.parse(JSON.stringify(previousMonths))} page={'credito'} />
            }

            <Divider />

            <div className="w-full h-auto">
                <CreditCreator
                    addCredit={addCredit}
                    credit={JSON.parse(JSON.stringify(credit))}
                    invoiceValues={JSON.parse(JSON.stringify(expenses.filter(expense => expense.paymentId === credit.id)))}
                />
                {credit.length !== 0 && credit.map(credit => (
                    <CreditItem
                        key={credit.id}
                        id={credit.id}
                        title={credit.name}
                        value={credit.value}
                        total={credit.value}
                        detailsA={credit.detailsA}
                        expenses={JSON.parse(JSON.stringify(expenses.filter(expense => expense.paymentId === credit.id)))}
                        invoiceValues={JSON.parse(JSON.stringify(expenses.filter(expense => expense.paymentId === credit.id)))}
                        editCredit={editCredit}
                        deleteCredit={deleteCredit} />
                ))}
            </div>
        </>
    )
}
