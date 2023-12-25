'use strict'

const errorCode = require('../constant/errorCode')
const { findById } = require('../services/apikey.service')
const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization'
}
const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString()
    if (!key) {
      return res.status(errorCode.FORBIDDEN).json({
        code: errorCode.FORBIDDEN,
        message: 'Forbidden error',
        status: 'error'
      })
    }

    //check objectKey

    const objectKey = await findById(key)

    if (!objectKey) {
      return res.status(errorCode.FORBIDDEN).json({
        code: errorCode.FORBIDDEN,
        message: 'Forbidden error',
        status: 'error'
      })
    }

    req.objectKey = objectKey
    return next()
  } catch (error) {
    console.log(`[E]::apiKey`, error)
  }
}

const permission = permission => {
  return (req, res, next) => {
    if (!req.objectKey.permissions) {
      return res.status(errorCode.FORBIDDEN).json({
        code: errorCode.FORBIDDEN,
        message: 'Permission denied',
        error: 'error'
      })
    }

    console.log('🚀 ~ file: checkAuth.js:40 ~ permission ~ permission:', req.objectKey.permissions)
    const validPermission = req.objectKey.permissions.includes(permission)
    if (!validPermission) {
      return res.status(errorCode.FORBIDDEN).json({
        code: errorCode.FORBIDDEN,
        message: 'Permission denied',
        error: 'error'
      })
    }
    return next()
  }
}

module.exports = { apiKey, permission }
