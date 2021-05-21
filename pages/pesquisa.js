import React, { useState } from 'react'
import Link from 'next/link'

const Pesquisa = () => {
  const [form, setForm] = useState({
    Nome: '',
    Email: '',
    Whatsapp: '',
    Critica: '',
    Nota: 0,
    Indica: ''
  })
  const notas = [0, 1, 2, 3, 4, 5]
  const indica = ['Sim', 'Não']
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
      console.log('err')
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
        <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' placeholder='Whatsapp' onChange={onChange} name='Whatsapp' value={form.Whatsapp} />
        <label className='font-bold'>Sua crítica/sugestão:</label>
        <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' placeholder='Critica' onChange={onChange} name='Critica' value={form.Critica} />
        <p>Qual a sua nota para nosso restaurante?</p>
        <div className='flex py-6'>
          {notas.map(nota => {
            return (
              <label className='block w-1/6 font-bold text-center'>
                <input type='radio' name='Nota' value={nota} onChange={onChange} />
                <br />{nota}
              </label>)
          })
          }
        </div>
        <p>Você nos indicaria para algum amigo?</p>
        <div className='flex py-6'>
          {indica.map(indica => {
            return (
              <label className='block w-1/2 font-bold text-center'>
                <input type='radio' name='Indica' value={indica} onChange={onChange} />
                <br />{indica}
              </label>)
          })
          }
        </div>
        <div className='text-center'>
          <Link href='/pesquisa'>
            <button className='bg-indigo-700 px-8 py-4 font-bold rounded-lg shadow-lg hover:shadow' onClick={save} >Enviar crítica / sugestão</button>
          </Link>
        </div>
      </div>}
      {sucess && <div className='w-1/5 mx-auto my-6'>
        <p className='mb-6 text-center pbg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3'>Obrigado por contribuir com sua sugestão ou crítica</p>
        {
          retorno.showCoupon && <div className='text-center border p-4 mb-4'>
            Seu cupom: <br />
            <span className='font-bold text-2xl'> {retorno.Cupom}</span>
          </div>
        }
        {
          retorno.showCoupon && <div className='text-center border p-4 mb-4'>
            <span className='font-bold block-mb2'> {retorno.Promo}</span>
            <br />
            Tire um print ou foto desta tela e apresente ao garçom.
          </div>
        }
      </div>}
    </div>
  )
}

export default Pesquisa
