const validEmail = (emailAdress) => {
  let user = ''
  let domain = ''
  let isEmailValid = false

  if (emailAdress.indexOf('@') !== -1) {

    user = emailAdress.split('@')[0]
    domain = emailAdress.split('@')[1]
  }

  if ((user.length >= 1) &&
    (domain.length >= 3) &&
    (user.search('@') == -1) &&
    (domain.search('@') == -1) &&
    (domain.indexOf('.') >= 1) &&
    (domain.lastIndexOf('.') < domain.length - 1)) {
    isEmailValid = true
  } else {
    isEmailValid = false
  }

  return isEmailValid
}

export default validEmail