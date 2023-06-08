const timeStamp = Date.now()

const date = new Date(timeStamp)

const year = date.getFullYear()
const month = ('0' + (date.getMonth() + 5)).slice(-2)
const day = ('0' + (date.getDate() + 1)).slice(-2)

const dateInFiveMonths = `${year}-${month}-${day}`

module.exports = dateInFiveMonths