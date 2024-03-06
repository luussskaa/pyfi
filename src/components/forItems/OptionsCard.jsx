import Image from 'next/image'
import React from 'react'
import edit from '../../../public/edit.png'
import destroy from '../../../public/destroy.png'
import pay from '../../../public/pay.png'
import blocked from '../../../public/blocked.png'
import invoice from '../../../public/invoice.png'
import withdraw from '../../../public/withdraw.png'
import transfer from '../../../public/transfer.png'
import exit from '../../../public/exit.png'

export default function OptionsCard({ allOff, handleOptions, handleEdit2, handleRemove, handlePay2, formValue, maxResource, handleExtract, expenses, handleWithdraw, handleSave, savings, handleTransfer, resources }) {
    return (
        <div onClick={handleOptions} className="w-11/12 h-24 border border-white rounded-3xl flex justify-evenly items-center mt-3 cursor-pointer duration-300 mx-auto select-none hover:scale-105">
            <div onClick={handleEdit2} className='w-1/12'>
                <Image className='mx-auto' src={edit} width={40} height={40} alt='editar pagamento' />
                {/* <span className='hidden md:block w-[40px] text-sm text-center'>Editar</span> */}
            </div>
            {handlePay2 &&
                <>
                    {parseFloat(formValue) <= maxResource ?
                        <div onClick={handlePay2} className='w-1/12'>
                            <Image className='mx-auto' src={pay} width={40} height={40} alt='sinalizar pagamento' />
                            {/* <span className='hidden md:block w-[40px] text-sm text-center'>Pagar</span> */}
                        </div>
                        :
                        <div>
                            <Image className='mx-auto' src={blocked} width={40} height={40} alt='não é possível sinalizar pagamento' />
                            {/* <span className='hidden md:block w-[40px] text-sm text-center'>Pagar</span> */}
                        </div>
                    }
                </>
            }
            {handleWithdraw &&
                <>
                    <div onClick={handleWithdraw} className='w-1/12'>
                        <Image className='mx-auto' src={withdraw} width={40} height={40} alt='editar pagamento' />
                        {/* <span className='hidden md:block w-[40px] text-sm text-center'>Sacar</span> */}
                    </div>
                </>
            }
            {handleSave &&
                <>
                    {savings.length !== 0 &&
                        <div onClick={handleSave} className='w-1/12'>
                            <Image className='mx-auto' src={withdraw} width={40} height={40} alt='editar pagamento' />
                            {/* <span className='hidden md:block w-[40px] text-sm text-center'>Guardar</span> */}
                        </div>
                    }
                </>
            }
            {handleExtract &&
                <>
                    {expenses.length !== 0 &&
                        <div onClick={handleExtract} className='w-1/12'>
                            <Image className='mx-auto' src={invoice} width={40} height={40} alt='editar pagamento' />
                            {/* <span className='hidden md:block w-[40px] text-sm text-center'>Extrato</span> */}
                        </div>
                    }
                </>
            }
            {handleTransfer &&
                <>
                    {resources.length !== 0 &&
                        <div onClick={handleTransfer} className='w-1/12'>
                            <Image className='mx-auto' src={transfer} width={40} height={40} alt='editar pagamento' />
                            {/* <span className='hidden md:block w-[40px] text-sm text-center'>Transferir</span> */}
                        </div>
                    }
                </>
            }
            <div onClick={handleRemove} className='w-1/12'>
                <Image className='mx-auto' src={destroy} width={40} height={40} alt='deletar pagamento' />
                {/* <span className='hidden md:block w-[40px] text-sm text-center'>Excluir</span> */}
            </div>
            <div onClick={handleOptions} className='w-1/12'>
                <Image className='mx-auto' src={exit} width={40} height={40} alt='deletar pagamento' />
            </div>
        </div>
    )
}
