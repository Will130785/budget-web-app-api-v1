import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import { IUser } from '../../types/User'
import { getByUsername } from '../dataAccess/user'
import { hashPassword } from '../auth/auth'

const register = async (req: Request, res: Response, next: NextFunction) => {
  // Get user data
  const userData = req.body
  try {
    // Check if user exists
    const foundUser = await getByUsername(userData.username)
    if (foundUser) {
      res.status(403).json({
        msg: 'Username taken'
      })
    } else {
      // If no user then go ahead and create the new one
      // Hash password
      const passwordHashed = await hashPassword(userData.password)
      // Update password on userData
      userData.password = passwordHashed
      // Create new user
      User.create(userData, (err: string, newUser: IUser) => {
        if (!err) {
          console.log(newUser)
          res.status(201).json({
            success: true,
            user: newUser
          })
        } else {
          res.status(400).json({
          success: false
          })
        }
      })
    }
  } catch (err) {
    res.status(400).json({
      success: false
    })
  }
}

export {
  register
}