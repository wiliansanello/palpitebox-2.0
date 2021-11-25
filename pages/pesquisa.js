import React, { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PageTitle from '../components/PageTitle'
import InputMask from 'react-input-mask'
import validEmail from '../utils/validEmail'

const Pesquisa = () => {
  const [form, setForm] = useState({
    Nome: '',
    Email: '',
    Whatsapp: '',
    Critica: '',
    Nota: -1,
    Indica: ''
  })
  const notas = [0, 1, 2, 3, 4, 5]
  const indica = ['Sim', 'Não']
  const [sucess, setSuccess] = useState(false)
  const [retorno, setRetorno] = useState({})
  const [saveForm, setSaveForm] = useState(true)
  const [name, setName] = useState('')

  const save = async () => {
    try {

      const response = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(form)
      })

      const data = await response.json()
      setRetorno(data)

      const formIsFilled = data.saveData //usei o obj data, pois o obj retorno depende da execução de um novo setRetorno para ser alterado (em casos que antes de salvar, o cliente preencheu parcialmente o form)
      setSaveForm(formIsFilled)
      setSuccess(formIsFilled)
    } catch (err) {
      console.log('err')
    }
  }

  /*const getName = async () => {

    try {
      const response = await fetch('/api/get-promo', {
        method: 'POST',
        body: JSON.stringify(name)
      })

      const restaurantData = await response.json()
      setName(restaurantData)

    } catch (err) {
      console.log(err)
    }
  }*/

  const alertFill = () => {
    toast.configure()
    toast.info('Ops! Há algum(ns) campo(s) não preenchidos!', {
      position: toast.POSITION.TOP_CENTER
    })

    if (form.Nome === '') {
      document.getElementById('nomeReq').removeAttribute('hidden')
    } else {
      document.getElementById('nomeReq').setAttribute('hidden', 'hidden')
    }

    if (form.Email === '') {
      document.getElementById('emailReq').removeAttribute('hidden')
    } else {
      document.getElementById('emailReq').setAttribute('hidden', 'hidden')
    }


    if (form.Whatsapp === '') {
      document.getElementById('whatsappReq').removeAttribute('hidden')
    } else {
      document.getElementById('whatsappReq').setAttribute('hidden', 'hidden')
    }

    if (form.Nota === -1) {
      document.getElementById('notaReq').removeAttribute('hidden')
    } else {
      document.getElementById('notaReq').setAttribute('hidden', 'hidden')
    }

    if (form.Indica === '') {
      document.getElementById('indicaReq').removeAttribute('hidden')
    } else {
      document.getElementById('indicaReq').setAttribute('hidden', 'hidden')
    }

    setSaveForm(true)
  }

  const onBlur = evt => {
    const value = evt.target.value
    const key = evt.target.name
    const correctEmail = validEmail(value)

    if (correctEmail === false) {
      toast.configure()
      toast.info('Por favor insira um endereço de e-mail válido', {
        position: toast.POSITION.TOP_CENTER
      })
      document.getElementById('Email').focus()
    }

    /*if (whatsApp.length === 13) {
      whatsApp = form.Whatsapp.slice(0, 12) //.split('_')[0]
      form.Whatsapp = whatsApp
    } else if (whatsapp.lenght <= 12) {
      toast.configure()
      toast.info('Por favor insira um número de WhatsApp válido')
    }*/

  }

  const onChange = evt => {
    const value = evt.target.value
    const key = evt.target.name
    setForm(old => ({
      ...old,
      [key]: value
    }))
  }
  //getName()

  return (
    <div className='pt-6'>
      <PageTitle title='Pesquisa' />
      <h1 className='w-2/5 mx-auto font-bold my-6 text-2xl text-center'>Críticas e sugestões</h1>
      <p className='w-3/5 mx-auto font-bold text-center'>
        O {name.nomeRestaurante} sempre busca por atender melhor seus clientes. <br />
        Sua opinião e/ou sugestão é muito bem-vinda!
      </p>
      {!sucess && <div className='w-1/5 mx-auto my-6'>
        <label className='font-bold'>Seu nome: </label>
        <label className='text-red-400' id='nomeReq' hidden>*Campo obrigatório</label>
        <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' placeholder='Nome' onChange={onChange} name='Nome' value={form.Nome} autoFocus />
        <label className='font-bold'>E-mail: </label>
        <label className='text-red-400' id='emailReq' hidden>*Campo obrigatório</label>
        <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' id='Email' placeholder='Email' onBlur={onBlur} onChange={onChange} name='Email' value={form.Email} />
        <label className='font-bold'>WhatsApp: </label>
        <label className='text-red-400' id='whatsappReq' hidden>*Campo obrigatório</label>
        <InputMask mask="(99)99999-9999" className='p-4 block shadow bg-blue-100 my-2 rounded' id='Whatsapp' placeholder='Whatsapp' onChange={onChange} name='Whatsapp' value={form.Whatsapp} />
        <label className='font-bold'>Sua crítica/sugestão: </label>
        <input type='text' className='p-4 block shadow bg-blue-100 my-2 rounded' placeholder='Critica' onChange={onChange} name='Critica' value={form.Critica} />
        <p className='font-bold'>Qual a sua nota para nosso restaurante? </p>
        <label className='text-red-400' id='notaReq' hidden>*Campo obrigatório</label>
        <div className='flex py-6'>
          {notas.map(nota => {
            return (
              <label key='nota' className='block w-1/6 font-bold text-center'>
                <input type='radio' name='Nota' value={nota} onChange={onChange} />
                <br />{nota}
              </label>)
          })
          }
        </div>
        <p className='font-bold'>Você nos indicaria para algum amigo?</p>
        <label className='text-red-400' id='indicaReq' hidden>*Campo obrigatório</label>
        <div className='flex py-6'>
          {indica.map(indica => {
            return (
              <label key='indica' className='block w-1/2 font-bold text-center'>
                <input type='radio' name='Indica' value={indica} onChange={onChange} />
                <br />{indica}
              </label>
            )
          })
          }
        </div>
        <div className='text-center'>
          <Link href='/pesquisa'>
            <button className='bg-blue-400 px-8 py-4 font-bold rounded-lg shadow-lg hover:shadow text-white' onClick={save} >Enviar crítica / sugestão</button>
          </Link>
        </div>
      </div>}

      {!saveForm && alertFill()}

      {sucess && saveForm && <div className='w-1/5 mx-auto my-6'>
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

