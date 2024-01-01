'use strict'

const AccessService = require('../services/access.service')
const { Ok, Created } = require('../core/success.response')

class AccessController {
  signUP = async (req, res, next) => {
    new Created({ message: 'Registed OK', metadata: await AccessService.signUp(req.body) }).send(res)
  }
}

module.exports = new AccessController()
