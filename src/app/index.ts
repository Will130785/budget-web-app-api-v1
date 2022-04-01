import { Application } from 'express'
import appConfig from './appConfig'
import appStart from './appStart'
import dbConnect from './dbConnect'

export default (app: Application) => {
  dbConnect()
  appConfig(app)
  appStart(app)
}
