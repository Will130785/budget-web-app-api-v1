import { Request, Response, NextFunction } from 'express'
import { getById } from '../dataAccess/user'

const addBudget = async (req: Request, res: Response, next: NextFunction) => {
  // Get data from body
  const data = req.body
  const userData = req.user
  console.log('USER', req.user)
  try {
    // Save data to mongo
    if (userData) {
      // @ts-ignore
      const user = await getById(userData._id)
      if (user) {
        // Check if budget exists
        let budgetExists = false
        user.budgetData.budgets.forEach(item => {
          if ('title' in item && item.title === data.title) {
            budgetExists = true
          }
        })
        if (!budgetExists) {
          // Check if new budget has set as current and if so ensure all other records are set to false
          if (data.current) {
            user.budgetData.budgets.forEach(item => {
              if ('current' in item) {
                item.current = false
              }
            })
          }
          user.budgetData.budgets.push(data)
          user.save()
          return res.status(201).json({
            msg: 'Budget created',
            success: true,
            user
          })
        } else {
          return res.status(200).json({
            msg: 'Budget of that name already exists',
            success: false
          })
        }
      } else {
        return res.status(400).json({
          msg: 'Error saving budget',
          success: false
        })
      }
    } else {
      return res.status(400).json({
        msg: 'No user data',
        success: false
      })
    }
  } catch (err) {
    return res.status(400).json({
      success: false, 
      msg: 'Error adding budget',
      err
    })
  }
}

const editBudget = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  // Get data from body and user from user
  const data = req.body
  const userData = req.user

  try {
    console.log(userData)
    if (userData) {
      // Find user
      // @ts-ignore
      const user = await getById(userData._id)
      if (user) {
        // Check if updated budget name already exists
        let budgetExists = false
        user.budgetData.budgets.forEach(item => {
          // @ts-ignore
          if ('title' in item && item.title === data.title && data.title !== user.budgetData.budgets[data.bIndex].title) {
            budgetExists = true
          }
        })
        if (!budgetExists) {
          // Check if updated budget has set as current and if so ensure all other records are set to false
          if (data.current) {
            user.budgetData.budgets.forEach(item => {
              if ('current' in item) {
                item.current = false
              }
            })
          }
          // Update record
          const updateData = {
            title: data.title,
            timeline: data.timeline,
            amount: data.amount,
            current: data.current,
            categories: data.categories
          }
          user.budgetData.budgets[data.bIndex] = updateData
          user.save()
          return res.status(201).json({
            msg: 'Budget updated',
            success: true,
            user
          })
        } else {
          return res.status(200).json({
            msg: 'Budget of that name already exists',
            success: false
          })
        }
      } else {
        return res.status(400).json({
          msg: 'Error saving budget',
          success: false
        })
      }
      }
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      msg: 'Error updating budget'
    })
  }
}

const getAllBudgets = async (req: Request, res: Response, next: NextFunction) => {
  const userData = req.user
  try {
    // @ts-ignore
    const user = await getById(userData._id)
    if (user) {
      const budgets = user.budgetData.budgets
      return res.status(200).json({
        msg: 'Budgets successfully found',
        success: true,
        budgets
      })
    } else {
      return res.status(400).json({
        msg: 'Unable to find budgets',
        success: false
      })
    }
  } catch (err) {
    return res.status(400).json({
      msg: 'Error getting budgets',
      success: false,
      err
    })
  }
}

export {
  addBudget,
  editBudget,
  getAllBudgets
}