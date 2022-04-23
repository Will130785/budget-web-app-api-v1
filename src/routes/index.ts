import { Router } from 'express'
const router = Router({ mergeParams: true })
import controllers from '../controllers/index'
import { validate, Joi } from 'express-validation'
import passport from 'passport'
import('../app/middleware/passport')

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

router.post('/login', validate({
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  }).options({ presence: 'required' })
}, {}, {}), controllers.login)

// Add budget route
router.post('/budget', validate({
  body: Joi.object({
    title: Joi.string().required(),
    timeline: Joi.string().required(),
    amount: Joi.number().required(),
    current: Joi.boolean().required()
  }).options({ presence: 'required' })
}, {}, {}), passport.authenticate('jwt', { session: false }), controllers.addBudget)

// Get all budgets
router.get('/budget', passport.authenticate('jwt', { session: false }), controllers.getAllBudgets)

// Add category route
router.post('/category', validate({
  body: Joi.object({
    title: Joi.string().required(),
    amount: Joi.number().required(),
    currentBudget: Joi.string().required()
  }).options({ presence: 'required' })
}, {}, {}), passport.authenticate('jwt', { session: false }), controllers.addCategory)

export default router