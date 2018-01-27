export const isSuccess = (code) => {
  if (code === 'S' || code === 0) {
    return true
  } else {
    return false
  }
}

export const parseReq = (obj) => {
  var result = ''
  for (var item in obj) {
    item = item.replace(/\+/g, '%2B')

    item = item.replace(/\//g, '%2F')
    item = item.replace(/\?/g, '%3F')
    item = item.replace(/%/g, '%25')
    item = item.replace(/#/g, '%23')
    item = item.replace(/&/g, '%26')
    item = item.replace(/=/g, '%3D')

    obj[item] = obj[item].replace(/\+/g, '%2B')

    obj[item] = obj[item].replace(/%/g, '%25')
    obj[item] = obj[item].replace(/&/g, '%26')

    result = result + item + '=' + obj[item] + '&'
  }
  return result
}
