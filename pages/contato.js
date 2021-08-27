import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import PageTitle from '../components/PageTitle'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Contato = () => {

  const { data, error } = useSWR('/api/get-promo', fetcher)

  return (
    <div className='pt-6 text-center font-bold'>
      <PageTitle title='Contato' />
      {!data && <p>Carregando...</p>}
      {data && <div>
        <img className='mx-auto' src='logo_restaurante.png' />
        <h1>{data.nomeRestaurante}</h1>
        <h1>{data.endereco}</h1>
        <h1>{data.bairro}</h1>
        <h1>{data.cidade} {data.uf}</h1>
        <h1>{data.telefone}</h1>
      </div>
      }

      <div className='pt-6 pb-8 text-center text-blue-400'>
        <Link href='/'>
          <a>Ir para o começo</a>
        </Link>
      </div>
    </div>
  )
}

export default Contato