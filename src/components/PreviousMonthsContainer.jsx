'use client'

import React, { useState } from 'react'
import PreviousMonthsItem from './PreviousMonthsItem'

export default function PreviousMonthsContainer({ previousMonths, page }) {
    const [sub, setSub] = useState(false)
    const handleSub = () => setSub(!sub)
    return (
        <>
            {!sub ?
                <div className="w-full px-10 mt-5 flex flex-wrap justify-center select-none duration-300">
                    <div onClick={handleSub} className="font-semibold mt-2 mr-2 border border-purple-600 rounded-full py-1 px-2 text-purple-600 hover:text-black hover:bg-purple-600 duration-300 flex items-center select-none cursor-pointer">
                        Legenda
                    </div>
                </div>
                :
                <div className="w-full px-10 mt-5 flex flex-wrap justify-center scale-105 duration-300 active:scale-100 select-none">
                    {previousMonths.map(e =>
                        <PreviousMonthsItem key={e.id} name={e.name} value={page === 'dinheiro' ? e.money : page === 'gastos' ? e.expenses : page === 'credito' && e.credit} />
                    )}
                    <div onClick={handleSub} className="w-[40px] h-[40px] font-semibold mt-2 mr-2 border border-purple-600 rounded-full text-purple-600 hover:text-black hover:bg-purple-600 duration-300 flex justify-center items-center select-none cursor-pointer">
                        X
                    </div>
                </div>
            }
        </>

    )
}
