let baseUrl = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://192.168.7.121:8088'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = '$' + '{data.dataviewconfig.url}'
}
export {
  baseUrl
}
