const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

const cors = require('cors')
require('./config')

const app = express()
const db = require('./db')
const routes = require('./app/routes')
const jsonParser = bodyParser.json()
const urlEncoded = bodyParser.urlencoded({ extended: true })

app.use(cors())
app.use(jsonParser)
app.use(urlEncoded)
app.use(session({
  secret: APP_SECRET,
  cookie: {
    maxAge: APP_SESS_AGE
  }
}))
app.use('/api', [
  routes.employeeRouter,
  routes.timelogRouter,
  routes.authRouter
])

app.get('/', (req, res) => {
  res.send('Hello world. It alive!')
})

db.once('error', console.error.bind(console, 'MongoDB connection failed:'))

app.listen(API_PORT, () => console.log(`Server running on port ${API_PORT}`))