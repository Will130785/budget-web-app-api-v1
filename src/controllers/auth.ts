import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import { IUser } from '../../types/IUser'
import { getByUsername } from '../dataAccess/user'
import { hashPassword, compareHashedPassword, generateClientJWTToken } from '../auth/auth'
import env from '../../env.config'
const { JWT_SECRET } = env

const register = async (req: Request, res: Response, next: NextFunction) => {
  // Get user data
  const userData = req.body
  try {
    // Check if user exists
    const foundUser = await getByUsername(userData.username)
    if (foundUser) {
      return res.status(200).json({
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
          return res.status(201).json({
            success: true,
            user: newUser
          })
        } else {
          return res.status(400).json({
          success: false,
          msg: 'Error creating new user'
          })
        }
      })
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      msg: 'Error registering',
      err
    })
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body
  console.log(username)
  try {
    // Check username exists
    const foundUser = await getByUsername(username)
    if (!foundUser) {
      return res.status(403).json({
        msg: 'Username not found'
      })
    }
    // Otherwise user exists and we compare password
  
    const compare = await compareHashedPassword(password, foundUser.password)
    if (compare) {
      // @ts-ignore
      const token = generateClientJWTToken(foundUser._id, JWT_SECRET)
      return res.status(201).json({
        token,
        user: foundUser
      })
    } else {
      return res.status(403).json({
        message: 'Wrong password'
      })
    }

  } catch (err) {
    return res.status(400).json({
      success: false,
      msg: 'Error Login in',
      err
    })
  }
}

export {
  register,
  login
}