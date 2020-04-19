const Employee = require('../models/EmployeeModel')
const fn = require('../utils/Helper')

setInitial = () => {
  Employee
    .findOne({ employee_no: 0, pin_code: 0 })
    .exec((err, emp) => {
      if (err || !emp) {
        const employee = new Employee({
          employee_no: 0,
          pin_code: 0,
          first_name: 'Admin',
          last_name: 'Nistrator',
          admin_flag: true,
        })

        employee.save()
      }
    })
}
setInitial()

createEmployee = (req, res) => {
  const body = req.body

  const proceed = (seq) => {
    body.employee_no = seq
    const employee = new Employee(body)

    if (!employee) {
      return res.status(202).json({
        success: false,
        error: err
      })
    }

    employee
      .save()
      .then(emp => {
        return res.status(201).json({
          success: true,
          id: emp._id,
          message: 'Employee successfully created!',
        })
      })
      .catch(error => {
        return res.status(202).json({
          error,
          message: 'Employee not created!'
        })
      })
  }

  fn.createNewSequence(proceed);
}

updateEmployee = (req, res) => {
  const body = req.body

  Employee.findOneAndUpdate(
    { _id: req.params.id }, { ...body },
    { new: true, runValidators: true })
    .then(emp => {
      return res.status(200).json({
        success: true,
        id: emp._id,
        message: 'Employee updated!',
      })
    })
    .catch(error => {
      return res.status(202).json({
        error,
        message: 'Employee not updated!',
      })
    })
}

deleteEmployee = (req, res) => {
  Employee.findOneAndDelete({ _id: req.params.id }, (err, employee) => {
    if (err) {
      return res.status(202).json({ success: false, error: err })
    }

    return res.status(200).json({ success: true, data: employee })
  }).catch(err => console.log(err))
}

getEmployeeById = async (req, res) => {
  await Employee.findOne({ _id: req.params.id }, (err, employee) => {
    if (err) {
      return res.status(202).json({ success: false, error: err })
    }

    if (!employee) {
      return res
        .status(202)
        .json({ success: false, error: `Employee not found` })
    }
    return res.status(200).json({ success: true, data: employee })
  }).catch(err => console.log(err))
}

getEmployees = async (req, res) => {
  await Employee
    .find({})
    .sort({ employee_no: 'asc' })
    .exec((err, employees) => {
      if (err) {
        return res.status(202).json({ success: false, error: err })
      }
      if (!employees.length) {
        return res
          .status(202)
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