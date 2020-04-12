const mongoose = require('mongoose')

mongoose
  .connect(DB_URL, { useNewUrlParser: true })
  .then(() => console.log('Database connection successful.'))
  .catch(e => console.error('Database connection error.', e.message))

const db = mongoose.connection

module.exports = db;