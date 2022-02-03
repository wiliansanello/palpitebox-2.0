import React, { useState } from 'react'
import Link from 'next/link'
import Star from '../components/Star'
import Emoji from '../css/emoji.module.scss'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PageTitle from '../components/PageTitle'
import InputMask from 'react-input-mask'
import * as yup from 'yup'
import { useFormik } from 'formik'

const Pesquisa = () => {
  const [initialNotes, setHover] = useState({
    Atendimento: 0,
    Refeicao: 0
  })
  const notes = [1, 2, 3, 4, 5]
  const [sucess, setSuccess] = useState(false)
  const [retorno, setRetorno] = useState({})
  const [saveForm, setSaveForm] = useState(true)
  const [name, setName] = useState('')

  const save = async () => {
    try {

      const response = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(form.values)
      })
      console.log(response)
      const data = await response.json()
      setRetorno(data)

      const formIsFilled = data.saveData //usei o obj data, pois o obj retorno depende da execução de um novo setRetorno para ser alterado (em casos que antes de salvar, o cliente preencheu parcialmente o form)
      setSaveForm(formIsFilled)
      setSuccess(formIsFilled)
    } catch (err) {
      console.log('err')
    }
  }

  const onChange = evt => {
    evt.preventDefault()
    const value = evt.target.value
    const key = evt.target.name
    setHover(old => ({
      ...old,
      [key]: value
    }))
  }

  const hover = event => {
    event.preventDefault()
    const value = event.target.value
    const key = event.target.name

    setHover(old => ({
      ...old,
      [key]: value
    }))

  }

  const unHover = event => {
    event.preventDefault()
    const value = event.target.value
    const key = event.target.name

    setHover(old => ({
      ...old,
      [key]: ''
    }))
  }

  const schema = yup.object().shape({
    Nome: yup.string().required(' * Campo obrigatório'),
    Email: yup.string().required(' * Campo obrigatório')
      .email(' * Preencha um e-mail válido'),
    Whatsapp: yup.string().required(' * Campo obrigatório')
  })

  const form = useFormik({
    initialValues: {
      Nome: '',
      Email: '',
      Whatsapp: '',
      Atendimento: 0,
      Refeicao: 0,
      Indica: false,
      Critica: ''
    },
    //onChange: onChange,
    onSubmit: save,
    validationSchema: schema
  })

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
    setSaveForm(true)
  }


  //getName()

  return (
    <>
      <PageTitle title='Pesquisa' />
      <h1
        className='w-2/5 mx-auto font-bold my-6 text-2xl text-center'
      >
        Críticas e sugestões</h1>
      <p className='w-3/5 mx-auto font-bold text-center'>
        O {/*name.nomeRestaurante*/} sempre busca por atender melhor seus clientes. <br />
        Sua opinião e/ou sugestão é muito bem-vinda!
      </p>

      {!sucess && <div className='w-1/5 mx-auto my-6'>
        <label className='font-bold'>
          Seu nome:
          {form.errors.Nome && form.touched.Nome ? form.errors.Nome : ''}
          <input
            type='text'
            className='p-4 block shadow bg-blue-100 my-2 rounded'
            placeholder='Nome'
            name='Nome'
            value={form.values.Nome}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </label>
        <label className='font-bold'>
          Seu e-mail:
          {form.errors.Email && form.touched.Email ? form.errors.Email : ''}
          <input
            type='text'
            className='p-4 block shadow bg-blue-100 my-2 rounded'
            placeholder='E-mail'
            name='Email'
            value={form.values.Email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </label>
        <label className='font-bold'>
          WhatsApp:
          {form.errors.Whatsapp && form.touched.Whatsapp ? form.errors.Whatsapp : ''}
          <InputMask
            mask="(99)99999-9999"
            className='p-4 block shadow bg-blue-100 my-2 rounded'
            placeholder='Whatsapp'
            name='Whatsapp'
            value={form.values.Whatsapp}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
        </label>
        <label className='font-bold'>
          Por favor, avalie nosso restaurante: <br /><br />
          <div>
            <label className='font-bold'>
              Atendimento
              <br />
              {notes.map(note => {
                return (
                  <div className='inline-block align-middle'>
                    <label
                      key={note}
                      onMouseEnter={event => hover(event)}
                      onMouseLeave={event => unHover(event)}
                      className={`${(form.values.Atendimento >= note || initialNotes.Atendimento >= note) ? 'text-red-800' : 'text-gray-400'}`}
                      value={form.values.Atendimento}
                      onChange={form.handleChange}
                    >
                      <Star name='Atendimento' value={note} size='8' handleClick={onChange} />
                      <br />
                    </label>
                  </div>)
              })
              }
            </label>
            <br />
            <label className='font-bold'>
              Refeição
              <br />
              {notes.map(note => {
                return (
                  <div className='inline-block align-middle'>
                    <label
                      key={note}
                      onMouseEnter={event => hover(event)}
                      onMouseLeave={event => unHover(event)}
                      className={`${(form.values.Refeicao >= note || initialNotes.Refeicao >= note) ? 'text-red-800' : 'text-gray-400'}`}
                      value={form.values.Refeicao}
                      onChange={form.handleChange}
                    >
                      <Star name='Refeicao' value={note} size='8' handleClick={onChange} />
                      <br />
                    </label>
                  </div>)
              })
              }
            </label>
            <br />
            <label className='font-bold'>
              Você nos recomendaria para algum amigo?
            </label>
            <div className={Emoji.emoji + Emoji.like}>
              <input
                type="checkbox"
                name="Indica"
                className={Emoji.emoji}
                checked={form.values.Indica}
                onChange={form.handleChange}
              />
              <div className={Emoji.emoji}></div>
              <label for="Indica" className={Emoji.well}>
              </label>
            </div>
          </div>
        </label>
        <label className='font-bold'>
          Sua crítica/sugestão:
          <textarea
            className='p-4 block shadow bg-blue-100 my-2 rounded'
            placeholder='Crítica'
            name='Critica'
            value={form.values.Critica}
            onChange={form.handleChange}
          />
        </label>
        <pre>{JSON.stringify(form.values, null, 2)}</pre>
        <div className='text-center'>
          <Link href='/pesquisa'>
            <button className='bg-red-800 px-8 py-4 w-40 my-8 mb-20 font-bold rounded-lg shadow-lg hover:shadow text-white' onClick={save} >Enviar</button>
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
          retorno.showCoupon && <div className='text-center border p-4 mb-24'>
            <span className='font-bold block-mb2'> {retorno.Promo}</span>
            <br />
            Tire um print ou foto desta tela e apresente ao garçom.
          </div>
        }
      </div>}
    </>
  )
}

export default Pesquisa

