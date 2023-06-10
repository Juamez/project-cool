const mongoose = require('mongoose')
const uri = `mongodb://${process.env.LOCALHOST}:${process.env.PORT_DB}/${process.env.DB_NAME}`
const db = mongoose.connection

module.exports = {
  uri,
  db
}