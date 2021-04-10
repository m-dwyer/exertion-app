const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
    minlength: 4
  }
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model('ActivityType', schema)
