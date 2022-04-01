import { Router } from 'express'
const router = Router()
import controllers from '../controllers/index'
import { validate, Joi } from 'express-validation'

// Test route
router.get('/test', controllers.testController)

// Auth routes
router.post('/register', validate({
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required()
  }).options({ presence: 'required' })
}, {}, {}), controllers.register)

export default router