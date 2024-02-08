import Header from "@/components/Header";
import ResourceItem from "@/components/ResourceItem";
import SavingItem from "@/components/SavingItem";
import Sticky from "@/components/Sticky";
import { getXataClient } from "@/xata";
import { auth, currentUser } from "@clerk/nextjs";
import TextGroup from "@/components/TextGroup";

import recurso from '../../public/recurso.png'
import poupanca from '../../public/poupanca.png'
import edit from '../../public/edit.png'
import Image from "next/image";
import ResourceCreator from "@/components/ResourceCreator";
import { redirect } from "next/navigation";
import SavingCreator from "@/components/SavingCreator";

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

export default async function Home() {

  const { userId } = auth()
  const xataClient = getXataClient()

  const resources = await xataClient.db.Resources.filter({ userId }).getMany()
  const expenses = await xataClient.db.Expenses.filter({ userId }).getMany()
  const savings = await xataClient.db.Savings.filter({ userId }).getMany()

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center mb-10">
        <div className="text-sm font-semibold mb-2">Fevereiro / 24</div>
        <div className="text-4xl font-semibold mb-2">Meu dinheiro</div>
        <div className="text-lg">R$ {resources.length !== 0 ? resources.map(e => e.value).reduce((a, b) => a + b).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'}</div>
      </div>


      {/* <div className="w-full flex mb-10 flex-col items-center justify-center">
        <p className="px-10 mb-3 font-semibold">⚠ Você já concluiu as atividades deste mês?</p>
        <p className="px-10 mb-5 text-xs">Clique no botão abaixo para começar o mês seguinte.</p>

        <div className="w-11/12 flex justify-center items-center px-10">
          <button className="w-[250px] bg-neutral-900 bg-opacity-10 border-dashed border border-white shadow-md hover:scale-105 hover:bg-opacity-20 hover:shadow-md hover:border-solid rounded-full my-2 mr-3 px-5 py-2 duration-300 hover:text-opacity-20">FECHAR MÊS</button>
        </div>

      </div> */}

      <div className="w-11/12 mx-auto border border-white border-x-0 border-t-0 mb-10"></div>

      <div className="w-full h-auto">
        <ResourceCreator resource={addResource}
          resources={JSON.parse(JSON.stringify(resources))} />
        {resources.length !== 0 && resources.map(resource => (
          <ResourceItem
            key={resource.id}
            id={resource.id}
            title={resource.name}
            value={resource.value}
            expenses={JSON.parse(JSON.stringify(expenses.filter(expense => expense.paymentId === resource.id)))}
            editResource={editResource}
            deleteResource={deleteResource} />
        ))}
      </div>

      <div className="w-11/12 mx-auto border border-white border-x-0 border-t-0 my-10"></div>

      <div className="w-full h-auto">
        <SavingCreator saving={addSaving}
          savings={JSON.parse(JSON.stringify(savings))} />
        {savings.length !== 0 && savings.map(saving => (
          <SavingItem
            key={saving.id}
            id={saving.id}
            title={saving.name}
            value={saving.value}
            editSaving={editSaving}
            deleteSaving={deleteSaving} />
        ))}
      </div>




      {/* {savings.map(saving => (
        <SavingItem key={saving.id} id={saving.id} title={saving.name} value={(saving.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} />
      ))} */}

    </>
  )
}
