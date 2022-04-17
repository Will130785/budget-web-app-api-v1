import User from '../models/User'

const getByUsername = (username: string) => {
  return User.findOne({ username })
}

const getById = (id: string) => {
  return User.findById(id)
}

export {
  getByUsername,
  getById
}
