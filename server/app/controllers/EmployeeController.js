const Employee = require('../models/EmployeeModel')
const fn = require('../utils/Helper')

createEmployee = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Please provide employee data',
    })
  }

  const proceed = (seq) => {
    body.employee_no = `${seq}`
    const employee = new Employee(body)

    if (!employee) {
      return res.status(400).json({
        success: false,
        error: err
      })
    }

    employee
      .save()
      .then(() => {
        return res.status(201).json({
          success: true,
          id: employee._id,
          message: 'Employee successfully created!',
        })
      })
      .catch(error => {
        return res.status(400).json({
          error,
          message: 'Employee not created!'
        })
      })
  }

  fn.createNewSequence(proceed);
}

updateEmployee = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Please provide data to update',
    })
  }

  Employee.findOne({ _id: req.params.id }, (err, employee) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Employee not found!',
      })
    }

    employee.employee_no = body.employee_no
    employee.pin_code = body.pin_code
    employee.first_name = body.first_name
    employee.last_name = body.last_name
    employee.gender = body.gender
    employee.address = body.address
    employee.email = body.email
    employee.contact = body.contact
    employee.birthdate = body.birthdate
    employee.role = body.role
    employee.project = body.project
    employee.hire_date = body.hire_date

    employee
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: employee._id,
          message: 'Employee updated!',
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Employee not updated!',
        })
      })
  })
}

deleteEmployee = (req, res) => {
  Employee.findOneAndDelete({ _id: req.params.id }, (err, employee) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    return res.status(200).json({ success: true, data: employee })
  }).catch(err => console.log(err))
}

getEmployeeById = async (req, res) => {
  await Employee.findOne({ _id: req.params.id }, (err, employee) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: `Employee not found` })
    }
    return res.status(200).json({ success: true, data: employee })
  }).catch(err => console.log(err))
}

getEmployees = async (req, res) => {
  await Employee.find({}, (err, employees) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!employees.length) {
      return res
        .status(404)
        .json({ success: false, error: `Employee not found` })
    }
    return res.status(200).json({ success: true, data: employees })
  }).catch(err => console.log(err))
}

module.exports = {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees,
  getEmployeeById,
}