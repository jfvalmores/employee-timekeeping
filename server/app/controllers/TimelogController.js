const Timelog = require('../models/TimelogModel')
const Employee = require('../models/EmployeeModel')
const fn = require('../utils/Helper')

getTimelogList = (req, res) => {
  return res
    .status(200)
    .json({
      success: true,
      list: fn.getTimelogTypeList()
    })
}

createTimelog = (req, res) => {
  const body = req.body

  Employee.findOne({ employee_no: body.employee_no, pin_code: body.pin_code },
    (err, employee) => {
      if (err) {
        return res.status(202).json({ success: false, error: err })
      }

      if (!employee) {
        return res
          .status(202)
          .json({ success: false, error: `Invalid employee credentials.` })
      }
      saveLog(employee);
    }).catch(err => console.log(err))

  const saveLog = (employee) => {
    const timelog = new Timelog(body);

    if (!timelog) {
      return res.status(202).json({
        success: false,
        error: err
      })
    }

    const entry_date = fn.getMMDDYYYYSlashed()
    const entry_time = fn.getHHMMSSColon()
    timelog.entry_date = entry_date
    timelog.entry_time = entry_time

    timelog
      .save()
      .then(log => {
        const typeList = fn.getTimelogTypeList();
        const logType = typeList.find(o => o.data === log.log_type)

        return res.status(201).json({
          success: true,
          id: log._id,
          type: logType,
          date: log.entry_date,
          time: log.entry_time,
          employee_name: employee.first_name,
          message: `Successfully created timelog!`,
        })
      })
      .catch(error => {
        return res.status(202).json({
          error,
          message: `Failed to create timelog!`
        })
      })
  }
}

updateTimelog = (req, res) => {
  const body = req.body

  Timelog.findOneAndUpdate(
    { _id: req.params.id }, { ...body },
    { new: true, runValidators: true })
    .then(log => {
      return res.status(200).json({
        success: true,
        id: log._id,
        message: 'Timelog updated!',
      })
    })
    .catch(error => {
      return res.status(202).json({
        error,
        message: 'Timelog not updated!',
      })
    })
}

deleteTimelog = async (req, res) => {
  await Timelog.findOneAndDelete({ _id: req.params.id }, (err, log) => {
    if (err) {
      return res.status(202).json({ success: false, error: err })
    }

    return res.status(200).json({ success: true, data: log })
  }).catch(err => console.log(err))
}

getTimelogById = async (req, res) => {
  await Timelog.findOne({ _id: req.params.id }, (err, log) => {
    if (err) {
      return res.status(202).json({ success: false, error: err })
    }

    if (!log) {
      return res
        .status(202)
        .json({ success: false, error: `Timelog not found` })
    }
    return res.status(200).json({ success: true, data: log })
  }).catch(err => console.log(err))
}

getAllTimelogs = async (req, res) => {
  await Timelog
    .find({ employee_no: req.params.employee_no })
    .sort({ entry_date: 'desc', entry_time: 'desc' })
    .exec((err, timelogs) => {
      if (err) {
        return res.status(202).json({ success: false, error: err })
      }
      if (!timelogs.length) {
        return res
          .status(202)
          .json({ success: false, error: `Timelogs not found` })
      }
      return res.status(200).json({ success: true, data: timelogs })
    })
}

module.exports = {
  getTimelogList,
  createTimelog,
  updateTimelog,
  deleteTimelog,
  getTimelogById,
  getAllTimelogs,
}