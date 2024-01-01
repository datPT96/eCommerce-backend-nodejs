'use strict'

const AccessService = require('../services/access.service')
const { Ok, Created, SuccessResponse } = require('../core/success.response')

class AccessController {
  signUP = async (req, res, next) => {
    new Created({ message: 'Registed OK', metadata: await AccessService.signUp(req.body) }).send(res)
  }

  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AccessService.login(req.body)
    }).send(res)
  }
}

module.exports = new AccessController()
