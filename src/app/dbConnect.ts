import mongoose from 'mongoose'
import env from '../../env.config'
const DB_CONNECT = env.DB_CONNECT

export default () => {
  try {
    mongoose.connect(DB_CONNECT)
    // Check db connection
    const db = mongoose.connection
    db.once('open', () => {
      console.log('Connected to mongo')
    })
    db.on('error', () => {
      console.log('Error connection to mongo')
    })
  } catch (err) {
    console.log('Error connecting to Mongo')
  }
}