'use strict'
const shopModel = require('../models/shop.model')
const bycrypt = require('bcrypt')
const crypto = require('node:crypto')
const KeyTokenService = require('./keyToken.service')
const { craeteTokenPair } = require('../auth/authUtils')
const { getInfoData } = require('../utils')
const { RoleShop } = require('../constant')
const { errorCode } = require('../constant/errorCode')
const { ReasonPhrases, StatusCodes } = require('../constant/httpStatusCode')
const { BadRequessError, ConflictRequestError, AuthFailureError } = require('../core/error.response')
const { findByEmail } = require('./shop.service')

class AccessService {
  static login = async ({ email, password, refreshToken = null }) => {
    const foundShop = await findByEmail({ email })
    if (!foundShop) throw new BadRequessError('Shop not registed')
    const match = bycrypt.compare(password, foundShop.password)
    if (!match) throw new AuthFailureError('Authentication error')

    const privateKey = crypto.randomBytes(64).toString('hex')
    const publicKey = crypto.randomBytes(64).toString('hex')

    const { _id: userId } = foundShop._id
    const tokens = await craeteTokenPair({ userId, email }, publicKey, privateKey)

    await KeyTokenService.createKeyToken({
      userId,
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey
    })

    return {
      metadata: {
        shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: foundShop }),
        tokens
      }
    }
  }
  static signUp = async ({ name, email, password }) => {
    // try {
    //step 1: check email exists
    const holderShop = await shopModel.findOne({ email }).lean()

    if (holderShop) {
      throw new BadRequessError('Error: Shop already exists!')
    }

    //step 2: create new shop
    const passwordHash = await bycrypt.hash(password, 10)
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [RoleShop.SHOP]
    })
    if (newShop) {
      // create private key, public key
      // advanced method
      // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      //   modulusLength: 4096,
      //   publicKeyEncoding: {
      //     type: 'pkcs1',
      //     format: 'pem'
      //   },
      //   privateKeyEncoding: {
      //     type: 'pkcs1',
      //     format: 'pem'
      //   }
      // })

      // simple method
      const privateKey = crypto.randomBytes(64).toString('hex')
      const publicKey = crypto.randomBytes(64).toString('hex')

      console.log(privateKey, publicKey) // save collection keystore
      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey
      })

      if (!keyStore) {
        throw new BadRequessError('Error: KeyStore not created!')
      }
      // const publicKeyObject = crypto.createPublicKey(publicKeyString)

      const tokens = await craeteTokenPair({ userId: newShop._id, email }, publicKey, privateKey)
      console.log('Created tokens----------------', tokens)

      return {
        code: StatusCodes.CREATED,
        metadata: {
          shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: newShop }),
          tokens
        }
      }
    }
    return {
      code: StatusCodes.OK,
      metadata: null
    }
    // } catch (error) {
    //   return {
    //     code: errorCode.INTERNAL_SERVER,
    //     message: `${error}`,
    //     status: 'error'
    //   }
    // }
  }
}

module.exports = AccessService
