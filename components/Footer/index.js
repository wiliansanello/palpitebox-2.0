import React from 'react'

const Footer = () => {
  return (
    <div className='container mx-auto bg-red-800 p-2 fixed bottom-0 text-center font-bold text-white'>
      <div>
        Desenvolvido por Wilian Ansanello
      </div>
      <div>
        <a className=' inline-block align-middle p-2' href="https://linkedin.com/in/wiliansanello">
          <img src='/linkedin.png' placeholder='LinkedIn' />
        </a>
        <a className=' inline-block align-middle' href="https://github.com/wiliansanello">
          <img src='/github.png' placeholder='Github' />
        </a>
      </div>
    </div>
  )
}

export default Footer