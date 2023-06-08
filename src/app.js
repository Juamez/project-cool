const express = require('express')
const { getQuery } = require('./mongoConnect')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT

app.use(cors())

app.get('/', (req, res) => {
  res.send('yaya!')
})

app.get('/sample/:name', (req, res) => {
  const resp = Promise.resolve(getQuery(req.params))
  resp.then(info => {
    res.send(info)
    console.log(info)
  })
})


app.listen(port, () => {
  console.log('example running on ' + port)
})