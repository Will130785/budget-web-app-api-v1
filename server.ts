import express, { Application } from 'express'
const app: Application = express()
import dotEnv from 'dotenv'
const { NODE_ENV } = process.env

console.log(NODE_ENV)
// Set env file to use
const envPath = NODE_ENV === 'production' ? '.env' : `.env.${NODE_ENV}`
console.log(envPath)
dotEnv.config({
  path: envPath
})

// Start app by passing express app object
import expressApp from './src/app/index'
expressApp(app)