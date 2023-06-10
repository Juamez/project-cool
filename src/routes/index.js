const express = require('express')
const mongoose = require('mongoose')
// const runClient = require('../mongoConnection')
const {uri, db} = require('../constants/index')
require('dotenv').config()



db.on('error', console.error.bind(console, 'Conection error: '))
db.once('open', () => {
	console.log('connected to mongodb')
})

const showUser = async (req, res) => {
  try {
    const query = await db.collection("users").findOne({}).toArray()
    console.log(query)
    return query
  } catch(err) {
    console.error(err)
  } 
}

async function getQuery() {
  const query = await db.collection("users").find().toArray()
  return query
}

async function runClient() {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
    const res = await getQuery()
    return res
		// await createUserPersona()
	} catch(err) {
		console.error(err)
	} finally {
    await db.close(console.log('disconneced from mongodb'))
  }
}

const router = express.Router()

router.get('/', async (req, res) => {
  const result = await runClient()
  res.send(result)
})

module.exports = router