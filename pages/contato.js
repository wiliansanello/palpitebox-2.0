import React, { useState } from 'react'
import Link from 'next/link'
import PageTitle from '../components/PageTitle'

const Contato = () => {

  const [regsData, setRegsData] = useState({})


  const getData = async () => {

    try {
      const response = await fetch('/api/get-promo', {
        method: 'POST',
        body: JSON.stringify(regsData)
      })

      const restaurantData = await response.json()
      setRegsData(restaurantData)

    } catch (err) {
      console.log(err)
    }
  }


  getData()

  return (
    <div className='pt-2 text-center font-bold'>
      <PageTitle title='Contato' />
      {<div>
        <img className='mx-auto' src='logo_restaurante.png' />
        {!regsData && <h1>Carregando...</h1>}
        <h1>{regsData.nomeRestaurante}</h1>
        <h1>{regsData.endereco} - {regsData.bairro}</h1>
        <h1>{regsData.cidade} - {regsData.uf}</h1>
        <h1>{regsData.telefone}</h1>
      </div>
      }

      <div className='pt-6 pb-8 text-center text-blue-400 text-xl'>
        <Link href='/'>
          <a>Ir para o começo</a>
        </Link>
      </div>
    </div>
  )
}

export default Contato