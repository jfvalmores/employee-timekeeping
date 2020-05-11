const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGODB_URI || DB_URI, { useNewUrlParser: true })
  .then(() => console.log('Database connection successful.'))
  .catch(e => console.error('Database connection error.', e.message))

const db = mongoose.connection

module.exports = db;