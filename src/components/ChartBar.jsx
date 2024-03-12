import React from 'react'

export default function ChartBar({ index, value, isCurrent }) {
    return (
        <>
            {isCurrent ?
                <div className='flex flex-col items-center hover:scale-105 duration-300'>
                    <div> {index}</div>
                    <div style={{ height: `${value}px` }} className='min-h-1 w-[18px] bg-pink-600 mx-2 text-center text-white underline font-bold rounded-t-full rounded-b-full'>
                    </div>
                </div>
                :
                <div className='flex flex-col items-center hover:scale-105 duration-300'>
                    <div> {index}</div>
                    <div style={{ height: `${value}px` }} className='min-h-1 w-[18px] bg-purple-600 mx-2 text-center text-white underline font-bold rounded-t-full rounded-b-full'>
                    </div>
                </div>
            }
        </>

    )
}
