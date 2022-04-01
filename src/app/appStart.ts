const { PORT, NODE_ENV} = process.env
import { Application } from 'express'

export default (app: Application) => {

  // Start server if not in test mode
  if (NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      console.log(`App running on port: ${PORT}`)
    })
  }
}
