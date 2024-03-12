import Image from 'next/image'
import React from 'react'
import logo from '../../public/logo.png'

export default function Page() {
  return (
    <>
      <nav className='w-full h-14 bg-neutral-950'>
        <div className='flex'>
          <Image src={logo} alt='dinheiro' width={20} height={20} />
          <span className='select-none text-lg'>pyfi</span>
        </div>
      </nav>
      <h1 className='w-4/6 text-9xl font-bold mt-32 text-center bg-gradient-to-r from-pink-600 to-purple-200 text-transparent bg-clip-text'>O que você sempre quis</h1>
      <div className='w-3/6 text-3xl mt-10 text-center'>Gerencie suas finanças pessoais com uma <span className='text-pink-600'> praticidade inédita</span>.</div>
      <button className='h-14 px-10 py-2 border border-white hover:bg-pink-600  hover:border-pink-600 text-lg font-semibold rounded-full mt-10 duration-300'>Entrar →</button>
      <p className='mt-5 text-pink-600'>É grátis!</p>

      <div className='w-8/12 mt-32 flex justify-between'>

        <div className='w-2/12 text-justify mb-32 border border-white p-5 mt-20 rounded-xl flex flex-col justify-between'>
          <h3 className='text-2xl font-bold mb-5 text-center'>O seu dinheiro</h3>
          <p>Acompanhe o uso do seu dinheiro e planeje os seus próximos passos usando poupanças.</p>
        </div>
        <div className='w-2/12 text-justify mb-32 border border-white p-5 mt-20 rounded-xl flex flex-col justify-between'>
          <h3 className='text-2xl font-bold mb-5 text-center'>As suas despesas</h3>
          <p>Fique por dentro de todos os seus gastos, tanto no débito quanto no crédito.</p>
        </div>
        <div className='w-2/12 text-justify mb-32 border border-white p-5 mt-20 rounded-xl flex flex-col justify-between'>
          <h3 className='text-2xl font-bold mb-5 text-center'>O seu crédito</h3>
          <p>Confira o uso dos seus cartões de crédito, o compromentimento de limites e a formação de faturas.</p>
        </div>
        <div className='w-2/12 text-justify mb-32 border border-white p-5 mt-20 rounded-xl flex flex-col justify-between'>
          <h3 className='text-2xl font-bold mb-5 text-center'>Simplesmente simples</h3>
          <p>Intuitivo e direto ao ponto o bastante pra você poder voltar logo para o que precisa/quer fazer.</p>
        </div>
      </div>
    </>
  )
}
