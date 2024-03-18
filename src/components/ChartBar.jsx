import React from 'react'

export default function ChartBar({ index, value, isCurrent }) {
    return (
        <>
            {isCurrent ?
                <div className='flex flex-col items-center hover:scale-105 duration-300'>
                    <div className='text-xs max-[281px]:w-[20px] mb-1 select-none'> {index}</div>
                    <div style={{ height: `${value}px` }} className='min-h-1 max-[281px]:w-[10px] w-[10px] bg-pink-600 max-[281px]:mx-0 mx-2 text-center text-white underline font-bold rounded-t-full rounded-b-full'>
                    </div>
                </div>
                :
                <div className='flex flex-col items-center hover:scale-105 duration-300'>
                    <div className='text-xs max-[281px]:w-[20px] mb-1 select-none'> {index}</div>
                    <div style={{ height: `${value}px` }} className='min-h-1 max-[281px]:w-[10px] w-[10px] bg-purple-600 max-[281px]:mx-0 mx-2 text-center text-white underline font-bold rounded-t-full rounded-b-full'>
                    </div>
                </div>
            }
        </>

    )
}
