const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DemoCounterSchema = new Schema({
  count: {
    type: Number,
    required: true
  }
})

module.exports = User = mongoose.model('DemoCounter', DemoCounterSchema)