import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import ExpenseItem from "@/components/ExpenseItem";
import ExpenseCreator from "@/components/ExpenseCreator";
import { redirect } from "next/navigation";

async function addDebit(rec, formData) {

    'use server'

    const { userId } = auth()
    const xataClient = getXataClient()

    const name = formData.get('name')
    const value = formData.get('value')
    const details = formData.get('day')
    const paymentId = formData.get('option')
    const type = 'debit'
    const recurrent = rec ? 'recurrent' : null

    await xataClient.db.Resources.update(paymentId, {
        value: { $decrement: parseFloat(value) }
    })

    await xataClient.db.Expenses.create({
        name,
        value: parseFloat(value),
        details,
        paymentId,
        type,
        recurrent,
        userId
    })

    redirect('/gastos')

}

async function deleteDebit(id, paymentId, value) {

    'use server'

    const xataClient = getXataClient()

    await xataClient.db.Resources.update(paymentId, {
        value: { $increment: parseFloat(value) }
    })

    await xataClient.db.Expenses.delete(id)

    redirect('/gastos')

}

async function addCredit(formData) {

    'use server'

    const { userId } = auth()
    const xataClient = getXataClient()

    const name = formData.get('name')
    const value = formData.get('value')
    const details = formData.get('day')
    const paymentId = formData.get('option')
    const type = 'credit'

    await xataClient.db.Credit.update(paymentId, {
        value: { $decrement: parseFloat(value) }
    })

    await xataClient.db.Expenses.create({
        name,
        value: parseFloat(value),
        details,
        paymentId,
        type,
        userId
    })

    redirect('/gastos')

}

async function deleteCredit(id, paymentId, value) {

    'use server'

    const xataClient = getXataClient()

    await xataClient.db.Credit.update(paymentId, {
        value: { $increment: parseFloat(value) }
    })

    await xataClient.db.Expenses.delete(id)

    redirect('/gastos')

}

async function addInstallment(formData) {

    'use server'

    const { userId } = auth()
    const xataClient = getXataClient()

    const name = formData.get('name')
    const value = formData.get('value')
    const details = `${formData.get('current')} / ${formData.get('last')}`
    const paymentId = formData.get('option')
    const type = 'installment'

    await xataClient.db.Credit.update(paymentId, {
        value: {
            $decrement: parseFloat(value) * parseFloat(formData.get('last'))
        }
    })

    await xataClient.db.Expenses.create({
        name,
        value: parseFloat(value),
        details,
        paymentId,
        type,
        userId
    })

    redirect('/gastos')

}

async function deleteInstallment(id, paymentId, value, last) {

    'use server'

    const xataClient = getXataClient()

    await xataClient.db.Credit.update(paymentId, {
        value: { $increment: (parseFloat(value) * parseFloat(last)) }
    })

    await xataClient.db.Expenses.delete(id)

    redirect('/gastos')

}

async function addPending(formData) {

    'use server'

    const { userId } = auth()
    const xataClient = getXataClient()

    const name = formData.get('name')
    const value = formData.get('value')
    const details = formData.get('day')
    const type = 'pending'

    await xataClient.db.Expenses.create({
        name,
        value: parseFloat(value),
        details,
        type,
        userId
    })

    redirect('/gastos')

}

async function deletePending(id) {

    'use server'

    const xataClient = getXataClient()

    await xataClient.db.Expenses.delete(id)

    redirect('/gastos')

}

async function editDebit(id, rec, formData, oldPaymentMethodId) {

    'use server'

    const xataClient = getXataClient()

    const name = formData.get('name')
    const value = formData.get('value')
    const details = formData.get('day')
    const paymentId = formData.get('option')
    const recurrent = rec ? 'recurrent' : null

    const oldExpense = await xataClient.db.Expenses.read(id)

    await xataClient.db.Resources.update(oldPaymentMethodId, {
        value: { $increment: parseFloat(oldExpense.value) }
    })

    await xataClient.db.Resources.update(paymentId, {
        value: { $decrement: parseFloat(value) }
    })

    await xataClient.db.Expenses.update(id, {
        name,
        value: parseFloat(value),
        details,
        paymentId,
        recurrent,
    })

    redirect('/gastos')

}

async function editCredit(id, formData, oldPaymentMethodId) {

    'use server'

    const xataClient = getXataClient()

    const name = formData.get('name')
    const value = formData.get('value')
    const details = formData.get('day')
    const paymentId = formData.get('option')

    const oldExpense = await xataClient.db.Expenses.read(id)

    await xataClient.db.Credit.update(oldPaymentMethodId, {
        value: { $increment: parseFloat(oldExpense.value) }
    })

    await xataClient.db.Credit.update(paymentId, {
        value: { $decrement: parseFloat(value) }
    })

    await xataClient.db.Expenses.update(id, {
        name,
        value: parseFloat(value),
        details,
        paymentId
    })

    redirect('/gastos')

}

async function editInstallment(id, formData, oldPaymentMethodId) {

    'use server'

    const xataClient = getXataClient()

    const name = formData.get('name')
    const value = formData.get('value')
    const details = `${formData.get('current')} / ${formData.get('last')}`
    const paymentId = formData.get('option')

    const oldExpense = await xataClient.db.Expenses.read(id)

    const oldSlash = oldExpense.details.indexOf(' / ')

    await xataClient.db.Credit.update(oldPaymentMethodId, {
        value: { $increment: parseFloat(oldExpense.value) * parseFloat(oldExpense.details.slice(oldSlash + 3)) }
    })

    const slash = details.indexOf(' / ')

    await xataClient.db.Credit.update(paymentId, {
        value: { $decrement: parseFloat(value) * parseFloat(details.slice(slash + 3)) }
    })

    await xataClient.db.Expenses.update(id, {
        name,
        value: parseFloat(value),
        details,
        paymentId
    })


    redirect('/gastos')

}

async function editPending(id, formData) {

    'use server'

    const xataClient = getXataClient()

    const name = formData.get('name')
    const value = formData.get('value')
    const details = formData.get('day')

    await xataClient.db.Expenses.update(id, {
        name,
        value: parseFloat(value),
        details,
    })

    redirect('/gastos')

}

export default async function page() {

    const { userId } = auth()
    const xataClient = getXataClient()

    const exp = await xataClient.db.Expenses.filter({ userId }).getMany()

    const paidExpenses = exp.filter(e => e.type !== 'pending').reverse()
    const unpaidExpenses = exp.filter(e => e.type === 'pending')

    const expenses = [...unpaidExpenses, ...paidExpenses]

    const resources = await xataClient.db.Resources.filter({ userId }).getMany()
    const credit = await xataClient.db.Credit.filter({ userId }).getMany()

    const resourcesValues = resources.length !== 0 ? resources.map(e => e.value) : [0]
    const creditValues = credit.length !== 0 ? credit.map(e => e.value) : [0]

    const maxResource = Math.max(...resourcesValues)
    const maxCredit = Math.max(...creditValues)

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center mb-10">
                <div className="text-4xl font-semibold mb-2">Meus gastos</div>
                <div className="text-lg">R$ {expenses.length !== 0 ? expenses.map(expense => expense.value).reduce((a, b) => a + b).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'}</div>
            </div>

            <div className="w-11/12 mx-auto border border-white border-x-0 border-t-0 mb-10"></div>

            <div className="w-full h-auto">
                <ExpenseCreator
                    resources={JSON.parse(JSON.stringify(resources))}
                    expenses={JSON.parse(JSON.stringify(expenses))}
                    credits={JSON.parse(JSON.stringify(credit))}
                    debit={addDebit}
                    credit={addCredit}
                    installment={addInstallment}
                    pending={addPending}
                    debitOptions={JSON.parse(JSON.stringify(resources))}
                    creditOptions={JSON.parse(JSON.stringify(credit))}
                    maxResource={maxResource}
                    maxCredit={maxCredit} />
                {expenses.length !== 0 && expenses.map(expense => (
                    <ExpenseItem key={expense.id} id={expense.id}
                        paymentId={expense.paymentId}
                        title={expense.name}
                        value={(expense.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        details={expense.details}
                        type={expense.type}
                        payment={expense.type === 'debit' ? resources.filter(e => e.id === expense.paymentId).map(e => `${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`) : expense.type === 'credit' ? credit.filter(e => e.id === expense.paymentId).map(e => `${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`) : expense.type === 'installment' && credit.filter(e => e.id === expense.paymentId).map(e => `${e.name} - R$ ${(e.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)}
                        editDebit={editDebit}
                        deleteDebit={deleteDebit}
                        recurrentDebit={expense.type === 'debit' ? expense.recurrent : null}
                        editCredit={editCredit}
                        deleteCredit={deleteCredit}
                        editInstallment={editInstallment}
                        deleteInstallment={deleteInstallment}
                        editPending={editPending}
                        deletePending={deletePending}
                        debitOptions={JSON.parse(JSON.stringify(resources))}
                        creditOptions={JSON.parse(JSON.stringify(credit))}
                        maxResource={maxResource}
                        maxCredit={maxCredit} />
                ))}
            </div>
        </>
    )
}