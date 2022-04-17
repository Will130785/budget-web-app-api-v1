import passport from 'passport'
import passportJWT from 'passport-jwt'

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const { JWT_SECRET } = process.env



import { getById } from '../../dataAccess/user'

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET
    },
    (jwtPayload, done) => {
      if (!jwtPayload) {
        return done('No user object')
      } else if (jwtPayload.id) {
        return getById(jwtPayload.id)
        .then(user => {
          return done(null, user)
        })
        .catch(err => {
          return done(err)
        })
      } else {
        return done('Invalid user object')
      }
    }
  )
)