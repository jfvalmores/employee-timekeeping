const Employee = require('../models/EmployeeModel')

login = (req, res) => {
  if (req.session.isLoggedIn) {
    return res
      .status(400)
      .json({
        success: false,
        error: 'A user is already logged in. Please retry later.'
      })
  }

  const employee_no = req.body.employee_no
  const pin_code = req.body.pin_code

  Employee.findOne({ employee_no }, (err, employee) => {
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: `Employee not found.` })
    }

    Employee.$where(`this.pin_code === ${pin_code}`).exec((err, doc) => {
      if (err && !doc) {
        return res
          .status(400)
          .json({ success: false, error: `Invalid credentials.` })
      }

      req.session.isLoggedIn = true;
      req.session.loggedUser = doc[0];

      return res
        .status(200)
        .json({
          success: true,
          message: `${doc[0].first_name} successfully logged in.`
        })
    })
  })
}

logout = (req, res) => {
  const user = req.session.loggedUser
  req.session.isLoggedIn = false
  req.session.loggedUser = null

  if (!user) {
    return res
      .status(400)
      .json({
        success: true,
        message: 'Already logged out'
      })
  }

  return res.status(200).json({
    success: true,
    message: `${user.first_name} has logged out.`
  })
}

module.exports = {
  login,
  logout,
}