import React, { useState } from 'react'
import Link from 'next/link'

const Pesquisa = () => {
  const [form, setForm] = useState({
    Nome: '',
    Email: '',
    Whatsapp: '',
    Critica: ''
  })
  const [sucess, setSuccess] = useState(false)
  const [retorno, setRetorno] = useState({})
  const save = async () => {
    try {

      const response = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(form)
      })

      const data = await response.json()
      setSuccess(true)
      setRetorno(data)
    } catch (err) {

    }
  }

  const onChange = evt => {
    const value = evt.target.value
    const key = evt.target.name
    setForm(old => ({
      ...old,
      [key]: value
    }))
  }
  return (
    <div className='pt-6'>
      <h1 className='w-1/5 mx-auto font-bold my-6 text-2xl'>Críticas e sugestões</h1>
      <p className='w-2/5 mx-auto font-bold'>
        O restaurante X sempre busca por atender melhor seus clientes. <br />
        Por isso, estamos sempre abertos a ouvir sua opinião.
      </p>
      {!sucess && <div className='w-1/5 mx-auto my-6'>
        <label className='font-bold'>Seu nome:</label>
        <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' placeholder='Nome' onChange={onChange} name='Nome' value={form.Nome} />
        <label className='font-bold'>E-mail:</label>
        <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' placeholder='Email' onChange={onChange} name='Email' value={form.Email} />
        <label className='font-bold'>WhatsApp:</label>
        <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' placeholder='WhatsApp' onChange={onChange} name='Whatsapp' value={form.Whatsapp} />

        <p>Qual a sua nota para nosso restaurante?</p>
        <input type='radio' id='nota_zero' name='nota' value='0' className='mx-1' />
        <p>Você nos indicaria para algum amigo?</p>
        <input type='radio' id='resposta' name='indicacao' value='sim' className='mx-1' />
        <div className='text-center my-8'>
          <Link href='/pesquisa'>
            <button className='bg-indigo-700 px-8 py-4 font-bold rounded-lg shadow-lg hover:shadow' onClick={save} >Enviar crítica / sugestão</button>
          </Link>
        </div>
      </div>}
      {sucess && <div className='w-1/5 mx-auto my-6'>
        cupon: {JSON.stringify(retorno)}
        <p className='mb-6 text-center pbg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3'>Obrigado por contribuir com sua sugestão ou crítica</p>
        {
          retorno.showCoupon && <div className='text-center border p-4 mb-4'>
            Seu cupom: <br />
            <span className='font-bold text-2xl'> {retorno.Cupom}</span>
          </div>
        }
        {
          retorno.showCoupon && <div className='text-center border p-4 mb-4'>
            <span className='font-bold'> {retorno.Promo}</span>
          </div>
        }
      </div>}
    </div>
  )
}

export default Pesquisa