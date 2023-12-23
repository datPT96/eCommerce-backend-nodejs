'use strict'
const mongoose = require('mongoose')
const os = require('os')
const process = require('process')

const _TIMER = 5000 //5 seconds

const countConnect = () => {
  const numConnection = mongoose.connections.length

  console.log(`Number of connections: ${numConnection}`)
}

const checkOverLoad = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length
    const numCore = os.cpus().length
    const memoryUsage = process.memoryUsage().rss
    // Example maximum of connections based on number of cores
    const maxConnection = numCore * 5
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`)

    console.log(`Active connections: ${numConnection} | Max connections: ${maxConnection}`)

    if (numConnection > maxConnection) {
      console.log('Connection overload detected')
      //notify.send(...)
    }
  }, _TIMER)
}

module.exports = { countConnect, checkOverLoad }
