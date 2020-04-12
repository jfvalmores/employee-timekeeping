const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')
require('./config')

const app = express()
const db = require('./db')
const jsonParser = bodyParser.json()
const urlEncoded = bodyParser.urlencoded({ extended: true })

app.use(cors())
app.use(jsonParser)
app.use(urlEncoded)

const employeeRouter = require('./app/routes/EmployeeRouter')
app.use('/api', employeeRouter)

const timelogRouter = require('./app/routes/TimelogRouter')
app.use('/api', timelogRouter)

app.get('/', (req, res) => {
  res.send('Hello world. It alive!')
})

db.once('error', console.error.bind(console, 'MongoDB connection failed:'))

app.listen(API_PORT, () => console.log(`Server running on port ${API_PORT}`))