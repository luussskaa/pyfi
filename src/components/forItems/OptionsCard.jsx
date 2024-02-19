import Image from 'next/image'
import React from 'react'
import edit from '../../../public/edit.png'
import destroy from '../../../public/destroy.png'
import pay from '../../../public/pay.png'
import blocked from '../../../public/blocked.png'
import invoice from '../../../public/invoice.png'
import withdraw from '../../../public/withdraw.png'
import transfer from '../../../public/transfer.png'

export default function OptionsCard({ allOff, handleOptions, handleEdit2, handleRemove, handlePay2, useThisValue, maxResource, handleExtract, expenses, handleWithdraw, handleSave, savings }) {
    return (
        <div onClick={handleOptions} onMouseLeave={allOff} className="w-11/12 h-24 border border-white rounded-3xl flex justify-evenly items-center mt-3 cursor-pointer duration-300 mx-auto select-none hover:scale-105">
            <div onClick={handleEdit2}>
                <Image className='mx-auto' src={edit} width={40} height={40} alt='editar pagamento' />
                <span className='w-[40px] text-sm text-center'>Editar</span>
            </div>
            <div onClick={handleEdit2}>
                <Image className='mx-auto' src={transfer} width={40} height={40} alt='editar pagamento' />
                <span className='w-[40px] text-sm text-center'>Transferir</span>
            </div>
            {handlePay2 &&
                <>
                    {parseFloat(useThisValue) <= maxResource ?
                        <div onClick={handlePay2}>
                            <Image className='mx-auto' src={pay} width={40} height={40} alt='sinalizar pagamento' />
                            <span className='w-[40px] text-sm text-center'>Pagar</span>
                        </div>
                        :
                        <div>
                            <Image className='mx-auto' src={blocked} width={40} height={40} alt='não é possível sinalizar pagamento' />
                            <span className='w-[40px] text-sm text-center'>Pagar</span>
                        </div>
                    }
                </>
            }
            {handleExtract &&
                <>
                    {expenses.length !== 0 &&
                        <div onClick={handleExtract}>
                            <Image className='mx-auto' src={invoice} width={40} height={40} alt='editar pagamento' />
                            <span className='w-[40px] text-sm text-center'>Extrato</span>
                        </div>
                    }
                </>
            }
            {handleWithdraw &&
                <>
                    <div onClick={handleWithdraw}>
                        <Image className='mx-auto' src={withdraw} width={40} height={40} alt='editar pagamento' />
                        <span className='w-[40px] text-sm text-center'>Sacar</span>
                    </div>
                </>
            }
            {handleSave &&
                <>
                    {savings.length !== 0 &&
                        <div onClick={handleSave}>
                            <Image className='mx-auto' src={withdraw} width={40} height={40} alt='editar pagamento' />
                            <span className='w-[40px] text-sm text-center'>Guardar</span>
                        </div>
                    }
                </>
            }
            <div onClick={handleRemove}>
                <Image className='mx-auto' src={destroy} width={40} height={40} alt='deletar pagamento' />
                <span className='w-[40px] text-sm text-center'>Excluir</span>
            </div>
        </div>
    )
}
