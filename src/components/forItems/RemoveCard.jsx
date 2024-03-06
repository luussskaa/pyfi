import Image from 'next/image'
import React from 'react'
import confirm from '../../../public/confirm.png'
import cancel from '../../../public/cancel.png'

export default function RemoveCard({ allOff, handleRemove, destroy, id, paymentId, formValue, last, type }) {
    return (
        <div onClick={handleRemove} className="w-11/12 h-[96px] border border-white flex justify-evenly items-center mt-3 cursor-pointer rounded-3xl duration-300 mx-auto select-none hover:scale-105">
            <div className='font-bold'>
                Excluir?
            </div>
            {type !== 'expense' ?
                <>
                    <div onClick={() => destroy(id)}>
                        <Image className='mx-auto' src={confirm} width={40} height={40} alt='confirmar deleção' />
                    </div>
                </>
                :
                <>
                    <div onClick={() => destroy(id, paymentId, formValue, last)}>
                        <Image className='mx-auto' src={confirm} width={40} height={40} alt='confirmar deleção' />
                    </div>
                </>
            }
            <div onClick={handleRemove}>
                <Image className='mx-auto' src={cancel} width={40} height={40} alt='cancelar deleção' />
            </div>
        </div>
    )
}
