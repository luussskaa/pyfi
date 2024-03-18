import ResourceItem from "@/components/ResourceItem";
import SavingItem from "@/components/SavingItem";
import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import ResourceCreator from "@/components/ResourceCreator";
import { redirect } from "next/navigation";
import SavingCreator from "@/components/SavingCreator";
import Close from "@/components/Close";
import Divider from "@/components/Divider";
import Header from "@/components/Header";
import { v4 } from "uuid";
import PreviousMonths from "@/components/PreviousMonthsItem";
import ChartBar from "@/components/ChartBar";
import ChartContainer from "@/components/ChartContainer";
import PreviousMonthsItem from "@/components/PreviousMonthsItem";
import PreviousMonthsContainer from "@/components/PreviousMonthsContainer";

async function addResource(formData) {

  'use server'

  const { userId } = auth()
  const xataClient = getXataClient()

  const name = formData.get('name')
  const value = formData.get('value')

  await xataClient.db.Resources.create({
    name,
    value: parseFloat(value),
    userId
  })

  redirect('/')

}

async function editResource(id, formData) {

  'use server'

  const xataClient = getXataClient()

  const name = formData.get('name')
  const value = formData.get('value')

  await xataClient.db.Resources.update(id, {
    name,
    value: parseFloat(value),
  })

  redirect('/')

}

async function deleteResource(id) {

  'use server'

  const xataClient = getXataClient()

  await xataClient.db.Resources.delete(id)

  redirect('/')

}

async function saveResource(id, formData) {

  'use server'

  const xataClient = getXataClient()

  const value = formData.get('value')
  const savingId = formData.get('option')

  await xataClient.db.Resources.update(id, {
    value: { $decrement: parseFloat(value) }
  })

  await xataClient.db.Savings.update(savingId, {
    value: { $increment: parseFloat(value) }
  })

  redirect('/')

}

async function transferResource(id, formData) {

  'use server'

  const xataClient = getXataClient()

  const value = formData.get('value')
  const resourceId = formData.get('option')

  await xataClient.db.Resources.update(id, {
    value: { $decrement: parseFloat(value) }
  })

  await xataClient.db.Resources.update(resourceId, {
    value: { $increment: parseFloat(value) }
  })

  redirect('/')

}

async function addSaving(formData) {

  'use server'

  const { userId } = auth()
  const xataClient = getXataClient()

  const name = formData.get('name')
  const value = formData.get('value')

  await xataClient.db.Savings.create({
    name,
    value: parseFloat(value),
    userId
  })

  redirect('/')


}

async function editSaving(id, formData) {

  'use server'

  const xataClient = getXataClient()

  const name = formData.get('name')
  const value = formData.get('value')

  await xataClient.db.Savings.update(id, {
    name,
    value: parseFloat(value),
  })

  redirect('/')

}

async function deleteSaving(id) {

  'use server'

  const xataClient = getXataClient()

  await xataClient.db.Savings.delete(id)

  redirect('/')

}

async function withdrawSaving(id, formData) {

  'use server'

  const xataClient = getXataClient()

  const value = formData.get('value')
  const resourceId = formData.get('option')

  await xataClient.db.Savings.update(id, {
    value: { $decrement: parseFloat(value) }
  })

  const saving = await xataClient.db.Savings.read(id)

  if (saving.value === 0) {
    await xataClient.db.Savings.delete(id)
  }

  await xataClient.db.Resources.update(resourceId, {
    value: { $increment: parseFloat(value) }
  })

  redirect('/')

}

async function addInitialMonth() {

  'use server'

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const { userId } = auth()
  const xataClient = getXataClient()

  await xataClient.db.CurrentMonth.create({
    month: months[currentMonth],
    year: currentYear,
    userId
  })

  redirect('/')

}

async function endMonth(id) {

  'use server'

  const { userId } = auth()
  const xataClient = getXataClient()

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const finishedMonth = await xataClient.db.CurrentMonth.filter({ userId }).getAll()

  // await xataClient.db.CurrentMonth.update(id, {
  //   month: months[3]
  // })

  if (finishedMonth[0].year !== currentYear) {
    if (finishedMonth[0].month === 'Dezembro') {
      await xataClient.db.CurrentMonth.update(id, {
        month: months[0],
        year: currentYear
      })
      const previousMonths = await xataClient.db.PreviousMonths.filter({ userId }).getAll()
      for (let i = 0; i < previousMonths.length; i++) {
        await xataClient.db.previousMonths.delete(previousMonths[i].id)
      }
    } else {
      await xataClient.db.CurrentMonth.update(id, {
        month: months[currentMonth],
        year: currentYear
      })
    }
  } else {
    await xataClient.db.CurrentMonth.update(id, {
      month: months[currentMonth + 1]
    })
  }

  let expenses = await xataClient.db.Expenses.filter({ userId }).getAll()
  const credit = await xataClient.db.Credit.filter({ userId }).getAll()
  const debitExpenses = expenses.filter(e => e.type === 'debit') // remove
  let pendingExpenses = expenses.filter(e => e.type === 'pending') // keep and update details
  const creditExpenses = expenses.filter(e => e.type === 'credit') // sum up to invoice
  const installments = expenses.filter(e => e.type === 'installment') // update progress(details) and sum up to invoice

  const resources = await xataClient.db.Resources.filter({ userId }).getAll()

  const registerMonthResultInPrevious = await xataClient.db.PreviousMonths.create({
    name: finishedMonth[0].month,
    money: parseFloat(resources.map(e => e.value).reduce((a, b) => a + b)),
    expenses: parseFloat(expenses.map(e => parseFloat(e.value)).reduce((a, b) => a + b)),
    credit: parseFloat(credit.map(e => e.value).reduce((a, b) => a + b)),
    userId
  })

  const invoiceExpenses = [...creditExpenses, ...installments]

  for (let i = 0; i < debitExpenses.length; i++) {
    await xataClient.db.Expenses.delete(debitExpenses[i].id)
  }

  for (let i = 0; i < installments.length; i++) {
    if (installments[i].detailsA === installments[i].detailsB) {
      await xataClient.db.Expenses.delete(installments[i].id)
    } else {
      await xataClient.db.Expenses.update(installments[i].id, {
        detailsA: installments[i].detailsA + 1
      })
    }
  }

  const idU = v4()

  for (let i = 0; i < invoiceExpenses.length; i++) {
    for (let i = 0; i < credit.length; i++) {
      if (credit[i].id === invoiceExpenses[i].paymentId) {
        const checkInvoice = await xataClient.db.Expenses.read(idU)
        if (checkInvoice === null) {
          const createInvoice = await xataClient.db.Expenses.create({
            id: idU,
            name: `Fatura: ${credit[i].name}`,
            value: invoiceExpenses[i].value,
            detailsA: credit[i].detailsA,
            type: 'pending',
            paymentId: credit[i].id,
            altered: 'toUpdate',
            userId
          })
        } else if (checkInvoice !== null) {
          const updateInvoice = await xataClient.db.Expenses.update(idU, {
            value: { $increment: invoiceExpenses[i].value }
          })
        }
      }
    }
  }

  expenses = await xataClient.db.Expenses.filter({ userId }).getAll()
  pendingExpenses = expenses.filter(e => e.type === 'pending')
  for (let i = 0; i < pendingExpenses.length; i++) {
    const checkPending = await xataClient.db.Expenses.read(pendingExpenses[i].id)
    if (checkPending !== null && checkPending.altered !== 'updated') {
      await xataClient.db.Expenses.update(pendingExpenses[i].id, {
        name: `${pendingExpenses[i].name} (${finishedMonth[0].month})`,
        altered: 'updated'
      })
    }
  }

  for (let i = 0; i < creditExpenses.length; i++) {
    await xataClient.db.Expenses.delete(creditExpenses[i].id)
  }

  redirect('/gastos')

}


export default async function Page() {

  const { userId } = auth()
  const xataClient = getXataClient()

  const getDay = new Date().getDate()
  let showClose = false

  if (getDay >= 25) {
    showClose = true
  }

  const currentMonth = await xataClient.db.CurrentMonth.filter({ userId }).getAll()
  if (currentMonth.length === 0) {
    addInitialMonth()
  }

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

  const getMonth = new Date().getMonth();

  const previousMonths = await xataClient.db.PreviousMonths.filter({ userId }).getAll()

  const resources = await xataClient.db.Resources.filter({ userId }).getAll()
  const savings = await xataClient.db.Savings.filter({ userId }).getAll()

  const expenses = await xataClient.db.Expenses.filter({ userId }).getAll()

  return (
    <>
      <Header currentMonth={currentMonth[0]} resources={JSON.parse(JSON.stringify(resources))} savings={JSON.parse(JSON.stringify(savings))} page={'dinheiro'} />

      {showClose && currentMonth.name === months[getMonth + 1] &&
        <Close currentMonth={JSON.parse(JSON.stringify(currentMonth))} endMonth={endMonth} />
      }

      {previousMonths.length !== 0 &&
        <ChartContainer previousMonths={JSON.parse(JSON.stringify(previousMonths))} resources={JSON.parse(JSON.stringify(resources))} savings={JSON.parse(JSON.stringify(savings))} currentMonth={currentMonth} page={'dinheiro'} />
      }

      {previousMonths.length !== 0 &&
        <PreviousMonthsContainer previousMonths={JSON.parse(JSON.stringify(previousMonths))} page={'dinheiro'} />
      }

      <Divider />

      <div className="w-full h-auto">
        <ResourceCreator
          addResource={addResource}
          resources={JSON.parse(JSON.stringify(resources))} />
        {resources.length !== 0 && resources.map(resource => (
          <ResourceItem
            key={resource.id}
            id={resource.id}
            title={resource.name}
            value={resource.value}
            resources={JSON.parse(JSON.stringify(resources))}
            resourceOptions={JSON.parse(JSON.stringify(resources))}
            savingOptions={JSON.parse(JSON.stringify(savings))}
            expenses={JSON.parse(JSON.stringify(expenses.filter(expense => expense.paymentId === resource.id)))}
            totalExpenses={expenses.filter(expense => expense.paymentId === resource.id).length !== 0 ? JSON.parse(JSON.stringify(expenses.filter(expense => expense.paymentId === resource.id).map(e => parseFloat(e.value)).reduce((a, b) => a + b))) : 0}
            editResource={editResource}
            deleteResource={deleteResource}
            saveResource={saveResource}
            savings={JSON.parse(JSON.stringify(savings))}
            transferResource={transferResource}
          />
        ))}
      </div>

      <Divider />

      <div className="w-full h-auto">
        <SavingCreator
          addSaving={addSaving}
          savings={JSON.parse(JSON.stringify(savings))} />
        {savings.length !== 0 && savings.map(saving => (
          <SavingItem
            key={saving.id}
            id={saving.id}
            title={saving.name}
            value={saving.value}
            resourceOptions={JSON.parse(JSON.stringify(resources))}
            editSaving={editSaving}
            deleteSaving={deleteSaving}
            withdrawSaving={withdrawSaving}
          />
        ))}
      </div>
    </>
  )
}
