import FormGroup from '@/components/FormGroup'
import Sticky from '@/components/Sticky'
import { getXataClient } from '@/xata'
import { auth } from '@clerk/nextjs'
import React from 'react'

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

}

export default async function page() {

    const { userId } = auth()
    const xataClient = getXataClient()

    const resources = await xataClient.db.Resources.filter({ userId }).getMany()

    return (
        <>
            <Sticky title={'Meu dinheiro'} value={resources.length !== 0 ? resources.map(resource => resource.value).reduce((a, b) => a + b).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'} />

            <FormGroup title={'Novo recurso'} func={addResource} />
        </>
    )
}
