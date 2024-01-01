'use strict'

const { extend } = require('lodash')
const { errorCode, ReasonStatusCode } = require('../constant/errorCode')

class SuccessResponse {
  constructor({ message, statusCode = errorCode.OK, reason = ReasonStatusCode.OK, metadata = {} }) {
    this.message = !message ? reason : message
    this.status = statusCode
    this.metadata = metadata
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this)
  }
}

class Ok extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata })
  }
}

class Created extends SuccessResponse {
  constructor({ message, statusCode = errorCode.CREATED, reason = ReasonStatusCode.CREATED, metadata, options = {} }) {
    super({ message, statusCode, reason, metadata, options })
  }
}

module.exports = {
  Ok,
  Created
}
