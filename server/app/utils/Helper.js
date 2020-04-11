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

module.exports = {
  createNewSequence
}