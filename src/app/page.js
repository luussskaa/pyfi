'use server'

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

export default async function Home() {

  const { userId } = auth()
  const xataClient = getXataClient()

  const username = currentUser()
  const name = (await username).firstName

  const resources = await xataClient.db.Resources.filter({ userId }).getMany()
  const expenses = await xataClient.db.Expenses.filter({ userId }).getMany()
  const savings = await xataClient.db.Savings.filter({ userId }).getMany()

  return (
    <>
      <div className="ml-10 w-11/12 h-32 mt-32 bg-white flex flex-col text-blue-400 justify-center items-center border border-neutral-600 cursor-pointer rounded-l-lg duration-300 hover:bg-opacity-100 md:hover:scale-105 mx-auto shadow-md">Meu dinheiro</div>
      <div className="w-full flex justify-center items-center">
        <div className="ml-10 w-6/12 h-48 bg-white flex flex-col text-blue-400 justify-center items-center cursor-pointer rounded-l-lg duration-300 hover:bg-opacity-100 md:hover:scale-105 mx-auto">
          <div className="w-28 flex justify-center items-center invert mb-1">
            <Image src={recurso} width={40} height={40} />
          </div>
          <div className="text-lg font-bold ">Recursos</div>
          <div className="">R$ 9.000,00</div>
          <div className="w-10 h-10 flex justify-center items-center invert mb-1 rounded-full duration-300 bg-neutral-900 hover:-rotate-90 hover:duration-300">
            <Image src={edit} width={20} height={20} />
          </div>
        </div>
        <div className="mr-10 w-6/12 h-48 bg-white flex flex-col text-blue-400 justify-center items-center cursor-pointer rounded-r-lg duration-300 hover:bg-opacity-100 md:hover:scale-105 mx-auto">
          <div className="w-28 flex justify-center items-center invert mb-1">
            <Image src={poupanca} width={40} height={40} />
          </div>
          <div className="text-lg font-bold ">Poupança</div>
          <div className="">R$ 9.000,00</div>
          <div className="w-10 h-10 flex justify-center items-center invert mb-1 rounded-full duration-300 bg-neutral-900 hover:-rotate-90 hover:duration-300">
            <Image src={edit} width={20} height={20} />
          </div>
        </div>
      </div>

      <TextGroup title={'Meu dinheiro'} normal={'Recursos representam '} bold={'o dinheiro que você possui e onde ele foi usado'} where={'recursos'} />

      {resources.map(resource => (
        <ResourceItem key={resource.id} id={resource.id} title={resource.name} value={(resource.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} color={'7209B7'} type={resource.type} expenses={JSON.parse(JSON.stringify(expenses.filter(expense => expense.paymentId === resource.id)))} />
      ))}
    </>
  )
}
