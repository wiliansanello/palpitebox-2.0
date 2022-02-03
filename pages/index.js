import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import PageTitle from '../components/PageTitle'
import Image from 'next/image'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {
  const { data, error } = useSWR('/api/get-promo', fetcher)

  return (
    <div className='text-center'>
      <PageTitle title='Seja bem-vindo(a)!' />
      {!data && <p className='py-8'>Carregando...</p>}
      {data &&
        <p className='py-8'>
          O {data.nomeRestaurante} sempre busca por atender melhor seus clientes. <br />
          Por isso, estamos sempre abertos a ouvir sua opinião.
        </p>}
      <div>
        <Link href='/pesquisa'>
          <a className='bg-red-700 px-12 py-4 font-bold rounded-lg shadow-lg hover:shadow text-white'>Dar opinião ou sugestão</a>
        </Link>
      </div>
      {!data && <p className='my-8'>Carregando...</p>}
      {!error && data && data.showCoupon &&
        <p className='my-8 text-center'>
          {data.message}
        </p>
      }
      {/*<p className='my-8'>
        Bateu fome aí? Não perca tempo, mande uma mensagem para nosso WhatsApp!< br />
      </p>
      <div className='w-1/5 mx-auto my-8 px-4 py-4 font-bold text-white bg-blue-400 rounded-lg shadow-lg hover:shadow'>
        <Link href='https://api.whatsapp.com/send?phone=5516981544877&text=Olá!%20Quero%20fazer%20um%20pedido'>
          <a><img className='inline-block align-middle' src='/whatsapp.png' />{'  '}Peça pelo WhatsApp</a>
        </Link>
    </div>*/}
    </div >

  )
}

export default Index