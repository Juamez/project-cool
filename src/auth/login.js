const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const bycrypt = require('bcrypt') 
const User = require('../schemas/user')

passport.use(
  new LocalStrategy(async(username, password, done) => {
    try {
        const user = await User.findOne({ name: username })
        if(!user) return done(null,false, { message: 'Incorrect username.' })

        const isPasswordValid = await bycrypt.compare(password, user.password)
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

// const jwtOptions = {
//   secretOrKey: 'secretKey',
//   jwtFromRequest: (req) => req.cookies.jwt //or extracts from headers or query params
// }

// passport.use(
//   new JwtStrategy(jwtOptions, async(payload, done) => {
//     try {
//       const user = await User.findById(payload.sub)

//       if(!user) return done(null, false)

//       return done(null, user)
//     } catch(err) {
//       return done(null, false)
//     }
//   })
// )

