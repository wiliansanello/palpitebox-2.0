import { GoogleSpreadsheet } from 'google-spreadsheet'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

export default async (req, res) => {

  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: process.env.SHEET_PRIVATE_KEY
    })
    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[2]
    await sheet.loadCells('A2:B8')

    const mostrarPromocaoCell = sheet.getCell(1, 0)
    const textoCell = sheet.getCell(1, 1)
    const nomeRestaurante = sheet.getCell(2, 1)
    const endereco = sheet.getCell(3, 1)
    const bairro = sheet.getCell(4, 1)
    const cidade = sheet.getCell(5, 1)
    const uf = sheet.getCell(6, 1)
    const telefone = sheet.getCell(7, 1)

    res.end(JSON.stringify({
      showCoupon: mostrarPromocaoCell.value === 'VERDADEIRO',
      message: textoCell.value,
      nomeRestaurante: nomeRestaurante.value,
      endereco: endereco.value,
      bairro: bairro.value,
      cidade: cidade.value,
      uf: uf.value,
      telefone: telefone.value
    }))

  } catch (err) {
    res.end(JSON.stringify({
      showCoupon: mostrarPromocaoCell.value === 'FALSO',
      message: ''
    }))
  }
}
