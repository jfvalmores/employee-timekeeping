const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Employee = new Schema(
  {
    employee_no: { type: Number, required: true, index: true, unique: true },
    pin_code: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: String,
    address: String,
    email: { type: String, lowercase: true },
    contact: String,
    birthdate: { type: Date, default: Date.now },
    role: [String],
    project: [String],
    hire_date: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

module.exports = mongoose.model('employees', Employee);