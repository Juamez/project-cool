const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
// const runClient = require('../mongoConnection')
const {uri} = require('../constants/index')
const { createPersonalGoal } = require('../models/models')
require('dotenv').config()

const db = mongoose.connection

db.on('error', console.error.bind(console, 'Conection error: '))
db.once('open', () => {
	console.log('connected to mongodb in index')
})

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
	}
}

const router = express.Router()

router.get('/', async (req, res) => {
  const result = await runClient()
  res.send(result)
})

router.get('/info', async (req, res) => {
  const user_req = req.user
  const req_auth = req.isAuthenticated()
  console.log("req.user", user_req)
  console.log("req.isAuthenticated", req_auth)
  res.json({user_req, req_auth})
})

router.post('/get-started', async (req, res) => {
  const {userId, title,description, category, endDate, reminder} = req.body
  
  const createGoal = await createPersonalGoal(userId, title, description, category, endDate, reminder)
  res.json(createGoal)
  return createGoal
})

router.get('/dashboard', async (req, res) => {
  //get the goals with the same user id
  // const userSession = await db.collection("user_store_session").findOne({"session.passport.user.username": "alice"})
  // const getGoal = await db.collection("personalgoals").find({"owner_id": userSession.session.passport.user.id}).toArray()
  res.send({getGoal: "default"})
})

router.delete('/delete-user', async(req, res) => {
  const userSession = await db.collection("user_store_session").findOne({"session.passport.user.username": "alice"})
  const deleteUser = await db.collection("user_credentials").deleteOne({"username": userSession.session.passport.user.username})
  const deleteGoals = await db.collection("personalGoals").deleteMany({"owner_id": userSession.session.passport.user.id})
})

module.exports = router