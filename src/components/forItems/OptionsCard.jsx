import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import edit from '../../../public/edit.png'
import destroy from '../../../public/destroy.png'
import pay from '../../../public/pay.png'
import blocked from '../../../public/blocked.png'
import invoice from '../../../public/invoice.png'
import withdraw from '../../../public/withdraw.png'
import transfer from '../../../public/transfer.png'
import exit from '../../../public/exit.png'

export default function OptionsCard({ allOff, handleOptions, handleEdit2, handleRemove, handlePay2, formValue, maxResource, handleExtract, expenses, handleWithdraw, handleSave, savings, handleTransfer, resources }) {

    const [scale, setScale] = useState('hidden')

    useEffect(() => {
        setScale('flex')
    }, [])

    return (
        <div onClick={handleOptions} className='w-11/12 border border-white rounded-3xl flex-col cursor-pointer duration-300 mx-auto select-none active:scale-100 mt-3'>
            {handleExtract &&
                <>
                    {expenses.length !== 0 &&
                        <div onClick={handleExtract} className='pl-5 w-full flex py-5 hover:bg-neutral-800 active:bg-neutral-800 duration-300 first-of-type:rounded-t-3xl'>
                            <Image src={invoice} width={24} height={24} alt='editar pagamento' />
                            <p className='ml-2 flex items-center '>Extrato</p>
                        </div>
                    }
                </>
            }
            {handlePay2 &&
                <>
                    {parseFloat(formValue) <= maxResource ?
                        <div onClick={handlePay2} className='pl-5 w-full flex py-5 hover:bg-neutral-800 duration-300 first-of-type:rounded-t-3xl'>
                            <Image src={pay} width={24} height={24} alt='sinalizar pagamento' />
                            <p className='ml-2 flex items-center '>Pagar</p>
                        </div>
                        :
                        <div>
                            <Image src={blocked} width={24} height={24} alt='não é possível sinalizar pagamento' />
                            <p className='ml-2 flex items-center '>Pagar</p>
                        </div>
                    }
                </>
            }
            {handleWithdraw &&
                <>
                    <div onClick={handleWithdraw} className='pl-5 w-full flex py-5 hover:bg-neutral-800 duration-300 first-of-type:rounded-t-3xl'>
                        <Image src={withdraw} width={24} height={24} alt='editar pagamento' />
                        <p className='ml-2 flex items-center '>Sacar</p>
                    </div>
                </>
            }
            {handleSave &&
                <>
                    {savings.length !== 0 &&
                        <div onClick={handleSave} className='pl-5 w-full flex py-5 hover:bg-neutral-800 duration-300 first-of-type:rounded-t-3xl'>
                            <Image src={withdraw} width={24} height={24} alt='editar pagamento' />
                            <p className='ml-2 flex items-center '>Poupar</p>
                        </div>
                    }
                </>
            }
            {handleTransfer &&
                <>
                    {resources.length !== 0 &&
                        <div onClick={handleTransfer} className='pl-5 w-full flex py-5 hover:bg-neutral-800 duration-300 first-of-type:rounded-t-3xl'>
                            <Image src={transfer} width={24} height={24} alt='editar pagamento' />
                            <p className='ml-2 flex items-center '>Transferir</p>
                        </div>
                    }
                </>
            }
            <div onClick={handleEdit2} className='pl-5 w-full flex py-5 hover:bg-neutral-800 duration-300 first-of-type:rounded-t-3xl'>
                <Image src={edit} width={24} height={24} alt='editar pagamento' />
                <p className='ml-2 flex items-center '>Editar</p>
            </div>
            <div onClick={handleRemove} className='pl-5 w-full flex py-5 hover:bg-neutral-800 duration-300 first-of-type:rounded-t-3xl'>
                <Image src={destroy} width={24} height={24} alt='deletar pagamento' />
                <p className='ml-2 flex items-center '>Apagar</p>
            </div>
            <div onClick={handleOptions} className='pl-5 w-full flex py-5 hover:bg-pink-900 duration-300 last-of-type:rounded-b-3xl'>
                <Image src={exit} width={24} height={24} alt='deletar pagamento' />
                <p className='ml-2 flex items-center text-pink-600'>Fechar</p>
            </div>
        </div>
    )
}
