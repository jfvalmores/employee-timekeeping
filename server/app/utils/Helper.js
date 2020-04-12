const Counters = require('../models/CountersModel')

createNewSequence = (callback) => {
  Counters.findOne({ id: 'employee_no' }, (err, resultSeq) => {
    let seq = 1

    if (!resultSeq) {
      const counter = new Counters({ id: 'employee_no', seq });
      counter
        .save()
        .then(() => callback(seq));
    } else {
      seq = resultSeq.seq + 1;
      Counters.updateOne({ _id: resultSeq._id }, { seq }, () => callback(seq))
    }
  })
}

getTimelogTypeList = () => {
  return [
    { data: 'TIME_IN', label: 'Time in', alert: 'timed in' },
    { data: 'TIME_OUT', label: 'Time out', alert: 'timed out' },
    { data: 'AM_BREAK_START', label: 'Morning break start', alert: 'started morning break' },
    { data: 'AM_BREAK_END', label: 'Morning break end', alert: 'ended morning break' },
    { data: 'PM_BREAK_START', label: 'Afternoon break start', alert: 'started afternoon break' },
    { data: 'PM_BREAK_END', label: 'Afternoon break end', alert: 'ended afternoon break' },
  ]
}

getMMDDYYYYSlashed = () => {
  const now = new Date()
  return `${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`
}

getHHMMSSColon = () => {
  const now = new Date()
  return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
}

module.exports = {
  createNewSequence,
  getTimelogTypeList,
  getMMDDYYYYSlashed,
  getHHMMSSColon,
}