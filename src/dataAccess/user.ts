import User from '../models/User'

const getByUsername = (username: string) => {
  return User.findOne({ username })
}

export {
  getByUsername
}