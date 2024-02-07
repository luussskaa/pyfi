'use server'

import Header from "@/components/Header";
import Sticky from "@/components/Sticky";
import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import TopGroup from "@/components/TextGroup";
import CreditItem from "@/components/CreditItem";


export default async function Home() {

    const { userId } = auth()
    const xataClient = getXataClient()

    const credits = await xataClient.db.Credit.filter({ userId }).getMany()
    const expenses = await xataClient.db.Expenses.filter({ userId }).getMany()

    const installmentExpenses = expenses.filter(expense => expense.type === 'installment')
    const creditExpenses = expenses.filter(expense => expense.type === 'credit')

    const useExpenses = [...installmentExpenses, ...creditExpenses]

    console.log(credits.filter(credit => credit.paymentId === credit.id))

    return (
        <>
            <Sticky title={'Meu crédito'} value={resources.length !== 0 ? resources.map(resource => resource.value).reduce((a, b) => a + b).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'} />

            <Header normal={'Confira abaixo as '} bold={'opções de crédito disponíveis'} />

            <TopGroup title={'Opções de crédito'} normal={'Opções de crédito mostram os '} bold={'limites disponíveis para pagamentos no crédito e como esses limites foram usados'} button={'opção'} where={'credito'} />

            {credits.map(credit => (
                <CreditItem key={credit.id} id={credit.id} title={credit.name} value={(credit.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} total={(credit.total).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} details={credit.details} expenses={JSON.parse(JSON.stringify(expenses.filter(expense => expense.paymentId === credit.id)))} />
            ))}
        </>
    )
}