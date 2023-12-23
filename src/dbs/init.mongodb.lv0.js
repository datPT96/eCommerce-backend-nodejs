'use strict'

const mongoose = require('mongoose')

const connectString = `mongodb://127.0.0.1:27017/shopDEV`

mongoose
  .connect(connectString)
  .then(_ => {
    console.log(`DB Connected`)
  })
  .catch(err => {
    console.log(`DB Connection Error: ${err}`)
  })

//dev
// eslint-disable-next-line no-constant-condition
if (1 === 1) {
  mongoose.set('debug', true)
  mongoose.set('debug', { color: true })
}

module.exports = mongoose
