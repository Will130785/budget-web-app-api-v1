import { Request, Response, NextFunction } from 'express'
import { getById } from '../dataAccess/user'
import { ICategory } from '../../types/ICategory'
import { IBudget } from '../../types/IBudget'

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
      let budget: IBudget | undefined
      let existing: ICategory | undefined
      
      user.budgetData.budgets.forEach((item: any) => {
        console.log(item)
        if ('title' in item && item.title === data.currentBudget) {
          budget = item
          // Check if category already exists
          
          item.categories.forEach((catItem: ICategory) => {
            if (catItem.title === data.title) {
              existing = catItem
            }
          })
          if (existing) {
            return   
          }
          // If not returned category is available and we save
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

const editCategory = async (req: Request, res: Response, next: NextFunction) => {
  // Get data from body
  const data = req.body
  const userData = req.user
  try {
    // Get user
    // @ts-ignore
    const user = await getById(userData._id)
    if (user) {
      // Get correct budget
      let budget: IBudget | undefined
      let existing: ICategory | undefined
      
      user.budgetData.budgets.forEach((item: any) => {
        console.log(item)
        if ('title' in item && item.title === data.currentBudget) {
          budget = item
          // Check if category already exists
          
          item.categories.forEach((catItem: ICategory) => {
            // @ts-ignore
            if (catItem.title === data.title && user.budgetData.budgets[data.bIndex].categories[data.cIndex].title !== data.title) {
              existing = catItem
            }
          })
          if (existing) {
            return   
          }
          // If not returned category is available and we save
          item.categories[data.cIndex] = {
            title: data.title,
            amount: data.amount
          }
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
  addCategory,
  editCategory
}