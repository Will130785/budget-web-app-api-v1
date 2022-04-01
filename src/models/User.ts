import mongoose from 'mongoose'
import { IUser } from '../../types/User'

const newUserSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

export default mongoose.model('User', newUserSchema)
