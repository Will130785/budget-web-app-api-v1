import { Request, Response, NextFunction } from 'express'
import { getById } from '../dataAccess/user'

const addCategory = async (req: Request, res: Response, next: NextFunction) => {
  // Get data from body
  const data = req.body
  const userData = req.user
  try {
    // Get user
    // @ts-ignore
    const user = await getById(userData._id)
    if (user) {
      // Get correct budget
      let budget
      // @ts-ignore
      let existing
      // @ts-ignore
      user.budgetData.budgets.forEach(item => {
        console.log(item)
        // @ts-ignore
        if (item.title === data.currentBudget) {
          budget = item
          // Check if category already exists
          // @ts-ignore
          item.categories.forEach(catItem => {
            if (catItem.title === data.title) {
              existing = catItem
            }
          })
          // @ts-ignore
          if (existing) {
            return   
          }
          // If not returned category is available and we save
          // @ts-ignore
          item.categories.push({
            title: data.title,
            amount: data.amount
          })
        }
      })
      if (existing) {
        return res.status(200).json({
          success: true,
          msg: 'Category already exists'
        })
      }
      // If no budget was found return status 400
      if (!budget) {
        return res.status(400).json({
          success: false,
          msg: 'Error adding category'
        })
      } else {
        user.save()
        return res.status(201).json({
          success: true,
          msg: 'Category added',
          user
        })
      }
    } else {
      return res.status(400).json({
        success: false,
        msg: 'Error adding category'
      })
    }

  } catch (err) {
    return res.status(400).json({
      success: false,
      msg: 'Error adding category'
    })
  }
}

export {
  addCategory
}