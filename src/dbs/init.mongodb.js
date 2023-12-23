'use strict'

const mongoose = require('mongoose')
const {
  db: { host, port, name, type }
} = require('../configs/config.mongodb')

const connectionString = `mongodb://${host}:${port}/${name}`
const connectAtlasString = host
const { countConnect } = require('../helpers/check.connect')

class Database {
  constructor() {
    this._connect(type)
  }

  _connect(type) {
    //dev
    // eslint-disable-next-line no-constant-condition
    if (1 === 1) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }

    if (type === 'mongodb') {
      mongoose
        .connect(connectionString, { maxPoolSize: 40 })
        .then(_ => {
          console.log(`DB Connected`)
          countConnect()
        })
        .catch(err => {
          console.log(`DB Connection Error: ${err}`)
        })
    }

    if (type === 'mongoAtlas') {
      mongoose
        .connect(connectAtlasString, { maxPoolSize: 40 })
        .then(_ => {
          console.log(`DB Connected`)
          countConnect()
        })
        .catch(err => {
          console.log(`DB Connection Error: ${err}`)
        })
    }
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
