'use strict'

const { errorCode, ReasonStatusCode } = require('../constant/errorCode')

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(message = ReasonStatusCode.CONFLICT, statusCode = errorCode.CONFLICT) {
    super(message, statusCode)
  }
}

class BadRequessError extends ErrorResponse {
  constructor(message = ReasonStatusCode.BAD_REQUEST, statusCode = errorCode.BAD_REQUEST) {
    super(message, statusCode)
  }
}

module.exports = {
  ConflictRequestError,
  BadRequessError
}
