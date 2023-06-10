const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const mongoose = require('mongoose')
const { createUserCredentials } = require('../models/models')
const router = express.Router()

// const runClient = require('../mongoConnection')
const {uri, db} = require('../constants/index')
require('dotenv').config()



db.on('error', console.error.bind(console, 'Conection error: '))
db.once('open', () => {
	console.log('connected to mongodb')
})

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


passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
        const user = await db.collection("user_credentials").findOne({ name: username })
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
  process.nextTick(() => {
    done(null, {id: user.id, username: user.username})
  })
})

passport.deserializeUser(async(user, done) => {
  process.nextTick(() => {
    return cb(null, user);
  });
})


// router.get('/login', (req, res, next) => {
//   res.json({name: 'login'})
// })

// router.post('/login/password', passport.authenticate('local', {successRedirect: "/", failureRedirect: '/login'}), (req, res) => {
//   res.json({message: 'loggin succesfully', user: req.user})
// })

// router.post('/logout', (req, res, next) => {
//   req.logout((err) => {
//     if (err) { return next(err); }
//     res.redirect('/');
//   });
// });

router.get('/signup', (req, res, next) => {
  res.json({message: 'signup'})
})

router.post('/signup', async (req, res, next) => {
  try {
    const {username, password} = req.body
    console.log(username, password)
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await createUserCredentials(username, hashedPassword)
    req.login(user, (err) => {
      if(err) return next(err)
      res.json({user: user})
    })
  } catch(error) {
    res.status(500).json({err: 'An error ocurred', error})
    console.error(error)
    next(error)
  }
})

router.get('/logout', (req, res, next)=> {
  req.logout((err) => {
    if(err) return next(err)
    res.redirect('/')
  })
})

module.exports = router