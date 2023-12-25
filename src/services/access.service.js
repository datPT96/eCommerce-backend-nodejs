'use strict'
const shopModel = require('../models/shop.model')
const bycrypt = require('bcrypt')
const crypto = require('node:crypto')
const KeyTokenService = require('./keyToken.service')
const { craeteTokenPair } = require('../auth/authUtils')
const { getInfoData } = require('../utils')

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN'
}

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      //step 1: check email exists
      const holderShop = await shopModel.findOne({ email }).lean()

      if (holderShop) {
        return {
          code: 200,
          message: 'Shop already exists'
        }
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
          return {
            code: 400,
            message: 'keystore error'
          }
        }
        // const publicKeyObject = crypto.createPublicKey(publicKeyString)

        const tokens = await craeteTokenPair({ userId: newShop._id, email }, publicKey, privateKey)
        console.log('Created tokens----------------', tokens)

        return {
          code: 201,
          metadata: {
            shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: newShop }),
            tokens
          }
        }
      }
      return {
        code: 200,
        metadata: null
      }
    } catch (error) {
      return {
        code: 400,
        message: `${error}`,
        status: 'error'
      }
    }
  }
}

module.exports = AccessService
