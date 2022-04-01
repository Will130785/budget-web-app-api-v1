import { Application } from 'express'
import routes from '../routes/index'
import bodyParser  from 'body-parser'
import cors from 'cors'

export default (app: Application) => {
  // Configure app
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cors())

  // Initiate routes
  app.use('/', routes)
}
