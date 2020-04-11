const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Counters = new Schema(
  {
    id: String,
    seq: { type: Number, default: 1 }
  }
);

module.exports = mongoose.model('counters', Counters);