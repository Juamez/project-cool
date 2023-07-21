const uri = `mongodb://${process.env.LOCALHOST}:${process.env.PORT_DB}/${process.env.DB_NAME}`

module.exports = {
  uri
}