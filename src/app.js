const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
require('dotenv').config()

const MongoDBStore = require('connect-mongodb-session')(session)
const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.PORT
const {uri} = require('./constants/index')
const storeSession = new MongoDBStore({
  uri: uri,
  database: 'test',
  collection: 'user_store_session',
}, (err) => {
  return console.error(err)
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.use(session({
  secret: 'secret_key',
  resave: false, 
  saveUninitialized: false,
  store: storeSession,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', authRouter)
app.use('/', indexRouter)


app.listen(port, () => {
  console.log('example running on ' + port)
})
