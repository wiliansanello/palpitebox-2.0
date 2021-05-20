import React from 'react'
import Link from 'next/link'
import JSON from '../package.json'

const Sobre = () => {
  return (
    <div>
      <h1>Sobre</h1>
      <div>
        <Link href='/'>
          <a>Home</a>
        </Link>
        <label className='text-center font-bold'>Versão: {JSON.version}</label>
      </div>
    </div>

  )
}
export default Sobre