import Navbar from '@/components/Navbar'
import Sticky from '@/components/Sticky'
import React from 'react'
import Page from './page'

export default function Layout() {
    return (
        <div className='w-full min-[1281px]:w-2/6 mx-auto h-full flex-nowrap justify-center items-center bg-black text-white duration-300'>
            <Sticky title={'Meu dinheiro'} />
            <main className="flex flex-col items-start justify-start pt-10 pb-20 mb-5 bg-neutral-950 border border-t-0 border-neutral-800 rounded-b-3xl">
                <Page />
            </main>
            <Navbar />
        </div>
    )
}
