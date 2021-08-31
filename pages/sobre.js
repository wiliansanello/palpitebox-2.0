import React from 'react'
import Link from 'next/link'
import PageTitle from '../components/PageTitle'

const Sobre = () => {
  return (
    <div className='pt-6 text-center'>
      <PageTitle title='Sobre' />
      <label>
        O Palpite-box é um serviço de pesquisa de satisfação, que permite ao cliente < br />
        opinar sobre a qualidade do atendimento e do serviço prestado pelo restaurante, < br />
        premiando a quem participa.< br />
      </label>
      <div className='pt-6 pb-8 text-blue-400'>
        <Link href='/'>
          <a>Ir para o começo</a>
        </Link>
      </div>
    </div>
  )
}
export default Sobre


