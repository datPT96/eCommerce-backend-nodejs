'use strict'

const express = require('express')
const { apiKey, permission, asyncHandler } = require('../auth/checkAuth')

const router = express.Router()

// check apikey
router.use(apiKey)

// check permission
router.use(permission('0000'))

router.use('/v1/api', require('./access'))
// router.get('/', (req, res, next) => {
//   return res.status(200).json({
//     message: 'Welcome Server!'
//   })
// })

module.exports = router
