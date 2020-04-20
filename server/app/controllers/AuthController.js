const Employee = require('../models/EmployeeModel')

login = (req, res) => {
  const sess = req.session
  if (sess.isLoggedIn) {
    sess.isLoggedIn = false;
    sess.loggedUser = null;

    return res
      .status(202)
      .json({
        success: false,
        error: 'User is already logged in. Logging out previous session... Please retry.'
      })
  }

  const employee_no = req.body.employee_no
  const pin_code = req.body.pin_code

  Employee.findOne({ employee_no }, (err, employee) => {
    if (!employee) {
      return res
        .status(202)
        .json({ success: false, error: `Employee not found.` })
    }

    Employee.find({ _id: employee._id, employee_no, pin_code }).exec((err, doc) => {
      if (err || (!doc || doc.length <= 0)) {
        return res
          .status(202)
          .json({ success: false, error: `Invalid credentials.` })
      }

      sess.isLoggedIn = true;
      sess.loggedUser = doc[0];

      return res
        .status(200)
        .json({
          success: true,
          user: {
            employee_no: employee.employee_no,
            first_name: employee.first_name,
            admin_flag: employee.admin_flag,
          },
          message: `${doc[0].first_name} successfully logged in.`
        })
    })
  })
}

logout = (req, res) => {
  const sess = req.session
  const user = sess.loggedUser

  if (!user) {
    return res
      .status(202)
      .json({
        success: true,
        message: 'Already logged out'
      })
  }

  sess.isLoggedIn = false
  sess.loggedUser = null

  return res.status(200).json({
    success: true,
    message: `${user.first_name} has logged out.`
  })
}

module.exports = {
  login,
  logout,
}