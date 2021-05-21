import { GoogleSpreadsheet } from 'google-spreadsheet'
import credentials from '../../credentials.json'
import moment from 'moment'

const doc = new GoogleSpreadsheet('1PArFmJXjrX5vZoKjMe2MPp2sX-0U3koeAsvhpZhBO6Q')

const genCupom = () => {
  const code = parseInt(moment().format('YYMMDDHHmmssSSS')).toString(16).toUpperCase()
  return code.substr(0, 4) + '-' + code.substr(4, 4) + '-' + code.substr(8, 4)
}

export default async (req, res) => {

  try {
    console.log(JSON.parse(req.body))
    res.end(req.body)
    await doc.useServiceAccountAuth(credentials)
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[1]
    const data = JSON.parse(req.body)

    const sheetConfig = doc.sheetsByIndex[2]
    await sheetConfig.loadCells('A2:B2')

    const mostrarPromocaoCell = sheetConfig.getCell(1, 0)
    const textoCell = sheetConfig.getCell(1, 1)

    let Cupom = ''
    let Promo = ''
    if (mostrarPromocaoCell.value === 'VERDADEIRO') {
      Cupom = genCupom()
      Promo = textoCell.value
    }

    //Nome E-mail WhatsApp Cupom Promo Critica
    await sheet.addRow({
      Nome: data.Nome,
      Email: data.Email,
      Whatsapp: data.Whatsapp,
      Cupom,
      Promo,
      Critica: data.Critica,
      'Data Preenchimento': moment().format('DD/MM/YYYY, HH:mm:ss'),
      Nota: parseInt(data.Nota),
      Indica: data.Indica
    })
    res.end(JSON.stringify({
      showCoupon: Cupom !== '',
      Cupom,
      Promo
    }))
  } catch (err) {
    console.log(err)
    res.end('error')
  }
}
