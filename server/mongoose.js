const mongoose = require('mongoose')

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true
    })
    .then(() => {
      console.log('connected to mongodb')
    })
    .catch((err) => {
      console.log('error connecting to mongodb:', err.message)
    })
}

module.exports = { connect }
