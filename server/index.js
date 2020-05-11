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

const PORT = process.env.PORT || API_PORT;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

const corsOptions = {
  origin: [CLIENT_URL],
  credentials: true
}

app.use(cors(corsOptions));
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
  res.send("Hello world. It's alive!")
})

db.once('error', console.error.bind(console, 'MongoDB connection failed:'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))