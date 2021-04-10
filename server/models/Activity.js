const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ActivityType'
  },
  duration: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  time: {
    type: mongoose.Schema.Types.Date,
    default: Date.now()
  },
  comment: {
    type: mongoose.Schema.Types.String
  }
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model('Activity', schema)
