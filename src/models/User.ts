import mongoose from 'mongoose'
import { IUser } from '../../types/IUser'

const newUserSchema = new mongoose.Schema<IUser>({
  id: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  budgetData: {
    budgets: [
      {
        title: {
          type: String
        },
        timeline: {
          type: String
        },
        amount: {
          type: Number
        },
        current: {
          type: Boolean
        },
        categories: []
      }
    ]
  }
})

export default mongoose.model('User', newUserSchema)
