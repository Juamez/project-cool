const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
require('dotenv').config()

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const cookieParser = require('cookie-parser')
const app = express()
const port = process.env.PORT

app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
  secret: 'secret_key', 
  resave: false, 
  saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.authenticate('session'));

app.use('/', indexRouter)
app.use('/', authRouter)


// app.get('/sample/:name', (req, res) => {
//   const resp = Promise.resolve(getQuery(req.params))
//   resp.then(info => {
//     res.send(info)
//     console.log(info)
//   })
// })


app.listen(port, () => {
  console.log('example running on ' + port)
})