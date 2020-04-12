const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Timelog = new Schema({
  employee_no: { type: Number, required: true },
  log_type: String,
  entry_date: String,
  entry_time: String,
})

module.exports = mongoose.model('timelogs', Timelog)