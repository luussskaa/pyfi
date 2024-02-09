import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CreditItem from "@/components/CreditItem";
import CreditCreator from "@/components/CreditCreator";

async function addCredit(formData) {

    'use server'

    const { userId } = auth()
    const xataClient = getXataClient()

    const name = formData.get('name')
    const value = formData.get('value')
    const details = `${formData.get('close')} / ${formData.get('expire')}`

    await xataClient.db.Credit.create({
        name,
        value: parseFloat(value),
        total: parseFloat(value),
        details,
        userId
    })

    redirect('/credito')


}

async function editCredit(id, formData) {

    'use server'

    const xataClient = getXataClient()

    const name = formData.get('name')
    const total = formData.get('value')
    const details = `${formData.get('close')} / ${formData.get('expire')}`

    await xataClient.db.Credit.update(id, {
        name,
        total: parseFloat(total),
        details
    })

    redirect('/credito')

}

async function deleteCredit(id) {

    'use server'

    const xataClient = getXataClient()

    await xataClient.db.Credit.delete(id)

    redirect('/credito')

}

export default async function page() {

    const { userId } = auth()
    const xataClient = getXataClient()

    const credit = await xataClient.db.Credit.filter({ userId }).getMany()
    const expenses = await xataClient.db.Expenses.filter({ userId }).getMany()

    const totalExpensesCredit = expenses.length !== 0 && expenses.filter(e => e.type === 'credit').length !== 0 && expenses.filter(e => e.type === 'credit').map(e => parseFloat(e.value)).reduce((a, b) => a + b)
    const totalExpensesInstallment = expenses.length !== 0 && expenses.filter(e => e.type === 'installment').length !== 0 && expenses.filter(e => e.type === 'installment').map(e => parseFloat(e.value * e.details.slice((e.details.indexOf(' / ')) + 3))).reduce((a, b) => a + b)
    const totalExpenses = totalExpensesCredit + totalExpensesInstallment

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center mb-10">
                <div className="text-4xl font-semibold mb-5">Meu crédito</div>
                <div className="text-sm font-semibold">Disponível</div>
                <div className="text-lg mb-2">R$ {credit.length !== 0 ? credit.map(credit => credit.value).reduce((a, b) => a + b).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'}</div>
                <div className="text-sm font-semibold">Total</div>
                <div className="text-lg">R$ {credit.length !== 0 ? credit.map(credit => credit.total).reduce((a, b) => a + b).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'}</div>
            </div>

            <div className="w-11/12 mx-auto border border-white border-x-0 border-t-0 mb-10"></div>

            <div className="w-full h-auto">
                <CreditCreator credit={addCredit}
                    credits={JSON.parse(JSON.stringify(credit))} />
                {credit.length !== 0 && credit.map(credit => (
                    <CreditItem
                        key={credit.id}
                        id={credit.id}
                        title={credit.name}
                        value={credit.value}
                        total={credit.total}
                        details={credit.details}
                        expenses={JSON.parse(JSON.stringify(expenses.filter(expense => expense.paymentId === credit.id)))}
                        totalExpenses={totalExpenses}
                        editCredit={editCredit}
                        deleteCredit={deleteCredit} />
                ))}
            </div>
        </>
    )
}
