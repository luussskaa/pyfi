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
import { revalidatePath } from "next/cache";

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

  const finishedMonth = await xataClient.db.CurrentMonth.filter({ userId }).getMany()

  if (finishedMonth[0].year !== currentYear) {
    if (finishedMonth[0].month === 'Dezembro') {
      await xataClient.db.CurrentMonth.update(id, {
        month: months[0],
        year: currentYear
      })
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

  const expenses = await xataClient.db.Expenses.filter({ userId }).getMany()
  const credit = await xataClient.db.Credit.filter({ userId }).getMany()
  const debitExpenses = expenses.filter(e => e.type === 'debit') // remove
  const pendingExpenses = expenses.filter(e => e.type === 'pending') // keep and update details
  const creditExpenses = expenses.filter(e => e.type === 'credit') // sum up to invoice
  const installments = expenses.filter(e => e.type === 'installment') // update progress(details) and sum up to invoice

  const invoiceExpenses = [...creditExpenses, ...installments]

  for (let i = 0; i < debitExpenses.length; i++) {
    await xataClient.db.Expenses.delete(debitExpenses[i].id)
  }

  for (let i = 0; i < pendingExpenses.length; i++) {
    if (pendingExpenses[i].name.includes('(Janeiro)') || pendingExpenses[i].name.includes('(Fevereiro)') || pendingExpenses[i].name.includes('(Março)') || pendingExpenses[i].name.includes('(Abril)') || pendingExpenses[i].name.includes('(Maio)') || pendingExpenses[i].name.includes('(Junho)') || pendingExpenses[i].name.includes('(Julho)') || pendingExpenses[i].name.includes('(Agosto)') || pendingExpenses[i].name.includes('(Setembro)') || pendingExpenses[i].name.includes('(Outubro)') || pendingExpenses[i].name.includes('(Novembro)') || pendingExpenses[i].name.includes('(Dezembro)')) {
      return
    } else {
      await xataClient.db.Expenses.update(pendingExpenses[i].id, {
        name: `${pendingExpenses[i].name} (${finishedMonth[0].month})`,
      })
    }
  }

  for (let i = 0; i < installments.length; i++) {
    if (parseInt(installments[i].detailsA === parseInt(installments[i].detailsB))) {
      await xataClient.db.Expenses.delete(installments[i].id)
    } else {
      await xataClient.db.Expenses.update(installments[i].id, {
        detailsA: installments[i].detailsA + 1
      })
    }

    for (let i = 0; i < invoiceExpenses.length; i++) {
      for (let i = 0; i < credit.length; i++) {
        if (credit[i].id === invoiceExpenses[i].paymentId) {
          const checkInvoice = await xataClient.db.Expenses.read(credit[i].id)
          if (checkInvoice === null) {
            const createInvoice = await xataClient.db.Expenses.create(credit[i].id, {
              name: `Fatura: ${credit[i].name} (${finishedMonth[0].month})`,
              value: invoiceExpenses[i].value,
              detailsA: credit[i].detailsA,
              type: 'pending',
              paymentId: credit[i].id,
              userId
            })
          } else {
            const updateInvoice = await xataClient.db.Expenses.update(credit[i].id, {
              value: { $increment: invoiceExpenses[i].value }
            })
          }
        }
        await xataClient.db.Expenses.delete(invoiceExpenses[i].id)
      }
    }


    for (let i = 0; i < creditExpenses.length; i++) {
      await xataClient.db.Expenses.delete(creditExpenses[i].id)
    }

    redirect('/')

  }
}


export default async function Home() {

  const { userId } = auth()
  const xataClient = getXataClient()

  const currentMonth = await xataClient.db.CurrentMonth.filter({ userId }).getMany()
  if (currentMonth.length === 0) {
    addInitialMonth()
  }

  const resources = await xataClient.db.Resources.filter({ userId }).getMany()
  const expenses = await xataClient.db.Expenses.filter({ userId }).getMany()
  const savings = await xataClient.db.Savings.filter({ userId }).getMany()

  const totalExpenses = expenses.length !== 0 && expenses.filter(e => e.type === 'debit').length !== 0 && expenses.filter(e => e.type === 'debit').map(e => parseFloat(e.value)).reduce((a, b) => a + b)

  return (
    <>
      <Header month={currentMonth.length !== 0 && `${currentMonth[0].month} / ${currentMonth[0].year}`} title="Meu dinheiro" value={resources.length !== 0 && savings.length === 0 ? (resources.map(e => e.value).reduce((a, b) => a + b)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : resources.length === 0 && savings.length !== 0 ? (savings.map(e => e.value).reduce((a, b) => a + b)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : resources.length !== 0 && savings.length !== 0 ? (resources.map(e => e.value).reduce((a, b) => a + b) + savings.map(e => e.value).reduce((a, b) => a + b)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'} />

      <Close currentMonth={JSON.parse(JSON.stringify(currentMonth))} endMonth={endMonth} />

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
