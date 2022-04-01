import { Request, Response, NextFunction } from 'express'

const testController = (req: Request, res: Response, next: NextFunction) => {
  console.log('You hit the test route')
  res.status(200).json({
    success: true
  })
}

export {
  testController
}