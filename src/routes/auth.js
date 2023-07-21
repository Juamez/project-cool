const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { createUserCredentials } = require('../models/models')

// const runClient = require('../mongoConnection')
const db = mongoose.connection
const {uri} = require('../constants/index')
require('dotenv').config()

async function runClient() {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		// await createUserPersona()
	} catch(err) {
		console.error(err)
	}
}

runClient()

db.on('error', console.error.bind(console, 'Conection error: '))
db.once('open', () => {
	console.log('connected to mongodb in auth')
})

passport.use('local', new LocalStrategy(async (username, password, done) => {
    console.log("user value inside strategy", username)
    console.log("password value inside startegy", password)
    try {
        const user = await db.collection("user_credentials").findOne({ username: username })
        if(!user) return done(null,false, { message: 'Incorrect username.' })

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) return done(null, false, { message: 'Incorrect password'})
        return done(null, user)
    } catch(error) {
      return done(error)
    }
  })
)

passport.serializeUser((user, done) => {
    console.log("user value inside serialize", user, user._id)
    return done(null, user._id)
})

passport.deserializeUser((id, done) => {
  console.log(id)
  (async () => {
    const user = await db.collection("user_credentials").findOne({_id: id})
    return done(null, user)
  })()
})

const router = express.Router()

router.post('/login/password', passport.authenticate('local'), (req, res, next) => {
    const user = {
      id: req.user._id
    }

    if(req.user.name) { user.name = req.user.name}
    if(req.user.username) { user.username = req.user.username}
    res.json({ "user": user, "cookies": req.cookies })
  }
)

router.get('/know', (req, res, next) => {
  res.json({"session": req.session, info: req.session.user})
})

router.post('/logout', passport.authenticate('session'), (req, res, next) => {
  req.logout(async (err) => {
    if (err) { return next(err)}
    req.session.destroy()
    const deleteSession = await db.collection("user_store_session").deleteMany({"session.passport.user.username": "alice"})
    return deleteSession
  })
  res.end()
});

router.get('/signup', (req, res, next) => {
  res.json({message: 'signup'})
})

router.post('/signup', async (req, res, next) => {
  try {
    const {username, password} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await createUserCredentials(username, hashedPassword)
    req.login(user, (err) => {
      if(err) return next(err)
      res.json({user})
    })
  } catch(error) {
    res.status(500).json({err: 'An error ocurred', error})
    console.error(error)
    next(error)
  }
})

router.get('/session', passport.authenticate('session'), async (req, res, next) => {
  try {
    const session = await db.collection("user_store_session").findOne({"session.passport.user.username": "alice"})
    if(!session) return next(null, false, {message: "not session was found"})
    res.json({ "session": session, cookies: req.cookies, "session-req" : req.session, isAuth: req.isAuthenticated()})
    return next(null, session)
  } catch (err) {
    console.error("method get from session gave an error", err)
  }
})

router.get('/login', (req, res, next) => {
  res.json({
    name: 'login', 
    session: req.session,
    cookies: req.cookies,
    a: req.isAuthenticated(),
    username: req.username
  })
  console.log("user_exist", req.username)
})

module.exports = router