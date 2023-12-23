'use strict'

const mongoose = require('mongoose')

const connectString = `mongodb+srv://admin:kdhNk5QfQPmWHPtd@ecommerce-dev.cvwg9wq.mongodb.net/?retryWrites=true&w=majority`
const { countConnect } = require('../helpers/check.connect')

class Database {
  constructor() {
    this._connect()
  }

  _connect(type = 'mongodb') {
    //dev
    // eslint-disable-next-line no-constant-condition
    if (1 === 1) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }

    mongoose
      .connect(connectString, { maxPoolSize: 50 })
      .then(_ => {
        console.log(`DB Connected`)
        countConnect()
      })
      .catch(err => {
        console.log(`DB Connection Error: ${err}`)
      })
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}

const instanceMongodb = Database.getInstance()

module.exports = instanceMongodb
