import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const generateClientJWTToken = (id: string, secret: string) => {
  return jwt.sign({
    id,
    iat: new Date().getTime(),
    exp: new Date().setHours(new Date().getHours() + 1)
  }, secret)
}

const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10)
}

const compareHashedPassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword)
}

export {
  generateClientJWTToken,
  hashPassword,
  compareHashedPassword
}