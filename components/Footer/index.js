import React from 'react'

const Footer = () => {
  return (
    <div className='container mx-auto bg-red-500 p-4 absolute'>
      <div className='text-center font-bold text-white' >
        Projeto desenvolvido por: {' '}
        Wilian Ansanello / {' '}
        <a className='hover:underline' href='https://www.linkedin.com/in/wiliansanello/'>Linkedin </a> / {' '}
        <a className='hover:underline' href='https://github.com/wiliansanello'>GitHub </a>
      </div>
    </div>
  )
}

export default Footer